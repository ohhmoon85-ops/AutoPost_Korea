import { CHANNELS } from "@/lib/constants";
import { CheckCircle } from "lucide-react";

const channelDetails: Record<string, string[]> = {
  instagram: [
    "최대 2,200자 최적화",
    "해시태그 30개 자동 생성",
    "릴스 썸네일 설명",
    "이모지 자동 삽입",
  ],
  naver_blog: [
    "SEO 최적화 2,000~4,000자",
    "검색 상위 노출 키워드",
    "목차·소제목 자동 구성",
    "검색 태그 자동 설정",
  ],
  threads: [
    "500자 이내 임팩트 있는 글",
    "대화체·감성 톤",
    "최적 이미지 방향 제안",
    "팔로우 유도 문구",
  ],
  kakao: [
    "친근하고 짧은 소식",
    "이모지 활용 강화",
    "프로모션 문구 강조",
    "채널 친구 타겟 최적화",
  ],
};

export default function ChannelsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            4개 채널을{" "}
            <span className="gradient-text">동시에 운영</span>하세요
          </h2>
          <p className="section-subheading">
            각 채널의 특성에 맞게 콘텐츠를 자동으로 변환합니다.
            한 번 입력으로 4개 채널이 완성됩니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CHANNELS.map((channel) => {
            const details = channelDetails[channel.value] || [];
            return (
              <div
                key={channel.value}
                className={`rounded-2xl border-2 ${channel.borderColor} ${channel.bgColor} p-6 card-hover`}
              >
                {/* Icon */}
                <div className="text-4xl mb-4">{channel.icon}</div>

                {/* Channel name */}
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {channel.label}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  {channel.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Comparison with competitors */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2">경쟁 우위</h3>
            <p className="text-blue-200 text-sm">
              해외 서비스 대비 1/10 가격으로 국내 채널을 완전 지원합니다
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold mb-1">완전 지원</div>
              <div className="text-sm text-blue-200">국내 채널</div>
              <div className="text-xs text-blue-300 mt-1">
                네이버·카카오·스레드 포함
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold mb-1">50개 업종</div>
              <div className="text-sm text-blue-200">전문 프롬프트</div>
              <div className="text-xs text-blue-300 mt-1">
                업종별 맞춤 글쓰기 적용
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold mb-1">1/10 가격</div>
              <div className="text-sm text-blue-200">해외 대비</div>
              <div className="text-xs text-blue-300 mt-1">
                월 9,900원부터 시작
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
