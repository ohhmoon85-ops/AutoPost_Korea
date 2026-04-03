import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { INDUSTRIES, TONES, CONTENT_PURPOSES, CHANNELS } from "@/lib/constants";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function getIndustryLabel(value: string) {
  return INDUSTRIES.find((i) => i.value === value)?.label || value;
}
function getToneLabel(value: string) {
  return TONES.find((t) => t.value === value)?.label || value;
}
function getPurposeLabel(value: string) {
  return CONTENT_PURPOSES.find((p) => p.value === value)?.label || value;
}
function getChannelLabel(value: string) {
  return CHANNELS.find((c) => c.value === value)?.label || value;
}

function buildChannelInstruction(channel: string): string {
  switch (channel) {
    case "instagram":
      return `인스타그램 게시물 (최대 2,200자, 이모지 적극 활용, 해시태그 15~20개)`;
    case "naver_blog":
      return `네이버 블로그 포스팅 (SEO 최적화, 2,000~3,000자, 소제목 포함, 자연스러운 키워드 반복)`;
    case "threads":
      return `스레드 게시물 (500자 이내, 임팩트 있고 공유하고 싶은 한 문장 또는 짧은 단락)`;
    case "kakao":
      return `카카오채널 소식 (친근하고 간결한 문체, 800자 이내, 명확한 행동 유도 문구 포함)`;
    default:
      return `SNS 게시물`;
  }
}

function buildSystemPrompt(
  industry: string,
  tone: string,
  purpose: string
): string {
  return `당신은 한국 소상공인 전문 SNS 마케팅 카피라이터입니다.

업종: ${getIndustryLabel(industry)}
브랜드 톤: ${getToneLabel(tone)}
게시물 목적: ${getPurposeLabel(purpose)}

작성 원칙:
1. 해당 업종의 전문 용어와 감성을 자연스럽게 활용하세요
2. 한국 소비자가 공감할 수 있는 감성적인 표현을 사용하세요
3. 지정된 브랜드 톤을 일관되게 유지하세요
4. 게시물 목적에 맞는 행동 유도 문구(CTA)를 포함하세요
5. 실제 소상공인이 사용할 법한 자연스러운 문체를 유지하세요`;
}

function buildUserPrompt(
  channel: string,
  keywords: string
): string {
  const channelInstruction = buildChannelInstruction(channel);

  if (channel === "instagram") {
    return `다음 키워드를 바탕으로 ${channelInstruction}을 작성해주세요.

키워드: ${keywords}

응답 형식 (정확히 따라주세요):
CONTENT:
[게시물 본문 내용]

HASHTAGS:
[해시태그1] [해시태그2] [해시태그3] ...

주의사항:
- CONTENT: 와 HASHTAGS: 구분자를 반드시 포함하세요
- 해시태그는 # 기호를 포함하여 공백으로 구분하세요
- 이모지를 적절히 사용하세요`;
  }

  return `다음 키워드를 바탕으로 ${channelInstruction}을 작성해주세요.

키워드: ${keywords}

응답 형식:
CONTENT:
[게시물 본문 내용]

주의사항:
- CONTENT: 구분자를 반드시 포함하세요
- ${channel === "naver_blog" ? "소제목은 ## 으로 표시하세요" : "자연스럽고 읽기 좋은 문체를 사용하세요"}`;
}

function parseGeneratedContent(
  raw: string,
  channel: string
): { content: string; hashtags?: string[] } {
  const contentMatch = raw.match(/CONTENT:\s*([\s\S]*?)(?:HASHTAGS:|$)/);
  const hashtagsMatch = raw.match(/HASHTAGS:\s*([\s\S]*?)$/);

  const content = contentMatch
    ? contentMatch[1].trim()
    : raw.trim();

  if (channel === "instagram" && hashtagsMatch) {
    const hashtagsRaw = hashtagsMatch[1].trim();
    const hashtags = hashtagsRaw
      .split(/\s+/)
      .filter((tag) => tag.startsWith("#") || tag.length > 0)
      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
      .filter((tag) => tag.length > 1);
    return { content, hashtags };
  }

  return { content };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { industry, keywords, tone, purpose, channels } = body;

    if (!industry || !keywords || !channels || channels.length === 0) {
      return NextResponse.json(
        { error: "필수 입력값이 누락되었습니다." },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const systemPrompt = buildSystemPrompt(industry, tone, purpose);

    // Generate content for each channel in parallel
    const generationPromises = channels.map(async (channel: string) => {
      const userPrompt = buildUserPrompt(channel, keywords);

      const message = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
      });

      const rawText =
        message.content[0].type === "text" ? message.content[0].text : "";
      const parsed = parseGeneratedContent(rawText, channel);

      return {
        channel,
        channelLabel: getChannelLabel(channel),
        ...parsed,
      };
    });

    const results = await Promise.all(generationPromises);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Content generation error:", error);

    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `API 오류: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "콘텐츠 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
