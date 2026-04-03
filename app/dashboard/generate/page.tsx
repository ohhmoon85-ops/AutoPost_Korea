"use client";

import { useState } from "react";
import { INDUSTRIES, CHANNELS, TONES, CONTENT_PURPOSES } from "@/lib/constants";
import { Wand2, Copy, RefreshCw, Check, ChevronDown } from "lucide-react";

type GeneratedContent = {
  channel: string;
  content: string;
  hashtags?: string[];
};

export default function GeneratePage() {
  const [industry, setIndustry] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("friendly");
  const [purpose, setPurpose] = useState("introduce");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["instagram"]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GeneratedContent[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const handleGenerate = async () => {
    if (!industry) {
      setError("업종을 선택해주세요.");
      return;
    }
    if (!keywords.trim()) {
      setError("키워드를 입력해주세요.");
      return;
    }
    if (selectedChannels.length === 0) {
      setError("채널을 하나 이상 선택해주세요.");
      return;
    }

    setError("");
    setIsLoading(true);
    setResults([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          keywords,
          tone,
          purpose,
          channels: selectedChannels,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "콘텐츠 생성에 실패했습니다.");
      }

      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "콘텐츠 생성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // fallback
    }
  };

  const getChannelInfo = (value: string) =>
    CHANNELS.find((c) => c.value === value);

  const getIndustryLabel = (value: string) =>
    INDUSTRIES.find((i) => i.value === value)?.label || value;

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">AI 콘텐츠 생성</h1>
        <p className="text-sm text-gray-500">
          업종과 키워드를 입력하면 AI가 채널별 맞춤 게시물을 자동으로 생성합니다.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            {/* Industry */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                업종 선택 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="input-field appearance-none pr-10"
                >
                  <option value="">업종을 선택해주세요</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind.value} value={ind.value}>
                      {ind.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                홍보 키워드 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="예: 신메뉴 딸기라떼 출시, 봄 시즌 한정, 홍대 카페"
                rows={3}
                className="input-field resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                홍보하고 싶은 내용, 특징, 지역 등을 자유롭게 입력하세요
              </p>
            </div>

            {/* Content purpose */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                게시물 목적
              </label>
              <div className="relative">
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="input-field appearance-none pr-10"
                >
                  {CONTENT_PURPOSES.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                브랜드 톤
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    className={`text-xs px-3 py-2 rounded-lg border-2 font-medium transition-all duration-200 text-left ${
                      tone === t.value
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                발행 채널 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CHANNELS.map((channel) => {
                  const isSelected = selectedChannels.includes(channel.value);
                  return (
                    <button
                      key={channel.value}
                      onClick={() => toggleChannel(channel.value)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{channel.icon}</span>
                      <span
                        className={`text-xs font-medium ${
                          isSelected ? "text-blue-700" : "text-gray-600"
                        }`}
                      >
                        {channel.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg px-3 py-2.5">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full btn-primary py-3.5 text-sm rounded-xl disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  AI가 생성 중...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  콘텐츠 생성하기
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-3 space-y-4">
          {isLoading && (
            <div className="space-y-4">
              {selectedChannels.map((ch) => {
                const channelInfo = getChannelInfo(ch);
                return (
                  <div
                    key={ch}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">{channelInfo?.icon}</span>
                      <div className="h-4 animate-shimmer rounded w-24" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 animate-shimmer rounded w-full" />
                      <div className="h-3 animate-shimmer rounded w-4/5" />
                      <div className="h-3 animate-shimmer rounded w-5/6" />
                      <div className="h-3 animate-shimmer rounded w-3/4" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!isLoading && results.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                AI 콘텐츠가 여기에 표시됩니다
              </h3>
              <p className="text-sm text-gray-400">
                왼쪽에서 업종과 키워드를 입력하고
                <br />
                콘텐츠 생성하기 버튼을 클릭하세요.
              </p>
            </div>
          )}

          {!isLoading &&
            results.map((result, i) => {
              const channelInfo = getChannelInfo(result.channel);
              const fullText = result.hashtags
                ? `${result.content}\n\n${result.hashtags.join(" ")}`
                : result.content;

              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >
                  {/* Channel header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{channelInfo?.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-gray-900">
                          {channelInfo?.label}
                        </div>
                        <div className="text-xs text-gray-400">
                          {result.content.length}자 ·{" "}
                          {getIndustryLabel(industry)} · {
                            TONES.find((t) => t.value === tone)?.label
                          }
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">
                      생성 완료
                    </span>
                  </div>

                  {/* Content */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {result.content}
                    </p>
                  </div>

                  {/* Hashtags */}
                  {result.hashtags && result.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {result.hashtags.map((tag, j) => (
                        <span
                          key={j}
                          className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(fullText, i)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                        copiedIndex === i
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {copiedIndex === i ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          복사 완료!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          전체 복사
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      다시 생성
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
