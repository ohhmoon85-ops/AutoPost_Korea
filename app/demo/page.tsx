"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INDUSTRIES, CHANNELS, TONES, CONTENT_PURPOSES } from "@/lib/constants";
import {
  Wand2,
  Copy,
  RefreshCw,
  Check,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Lock,
} from "lucide-react";

type GeneratedContent = {
  channel: string;
  content: string;
  hashtags?: string[];
};

export default function DemoPage() {
  const [industry, setIndustry] = useState("cafe");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("friendly");
  const [purpose, setPurpose] = useState("introduce");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["instagram"]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GeneratedContent[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [triedOnce, setTriedOnce] = useState(false);

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const handleGenerate = async () => {
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
        body: JSON.stringify({ industry, keywords, tone, purpose, channels: selectedChannels }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "생성 실패");
      }

      const data = await res.json();
      setResults(data.results);
      setTriedOnce(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "콘텐츠 생성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getChannelInfo = (value: string) => CHANNELS.find((c) => c.value === value);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            무료 데모 체험 — 로그인 불필요
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            AI가 게시물을 만드는 걸<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              직접 체험해보세요
            </span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            업종과 키워드를 입력하면 3초 안에 채널별 맞춤 게시물이 완성됩니다.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="flex-1 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left: Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5 sticky top-24">
                {/* Industry */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    업종
                  </label>
                  <div className="relative">
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="input-field appearance-none pr-10"
                    >
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
                    placeholder="예: 봄 신메뉴 딸기라떼, 한정 출시, 홍대 카페"
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>

                {/* Purpose */}
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
                        className={`text-xs px-3 py-2 rounded-lg border-2 font-medium transition-all text-left ${
                          tone === t.value
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
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
                    채널 선택 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CHANNELS.map((channel) => {
                      const isSelected = selectedChannels.includes(channel.value);
                      return (
                        <button
                          key={channel.value}
                          onClick={() => toggleChannel(channel.value)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all ${
                            isSelected
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className="text-lg">{channel.icon}</span>
                          <span className={`text-xs font-medium ${isSelected ? "text-blue-700" : "text-gray-600"}`}>
                            {channel.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg px-3 py-2.5">
                    {error}
                  </div>
                )}

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
                      무료로 생성하기
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Results */}
            <div className="lg:col-span-3 space-y-4">
              {/* Loading skeleton */}
              {isLoading && (
                <div className="space-y-4">
                  {selectedChannels.map((ch) => {
                    const channelInfo = getChannelInfo(ch);
                    return (
                      <div key={ch} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl">{channelInfo?.icon}</span>
                          <div className="h-4 animate-shimmer rounded w-24" />
                        </div>
                        <div className="space-y-2">
                          {[100, 80, 90, 70].map((w, i) => (
                            <div key={i} className={`h-3 animate-shimmer rounded`} style={{ width: `${w}%` }} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Empty state */}
              {!isLoading && results.length === 0 && (
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
                  <div className="text-5xl mb-4">✨</div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">
                    생성된 콘텐츠가 여기에 표시됩니다
                  </h3>
                  <p className="text-sm text-gray-400">
                    왼쪽에서 업종·키워드를 입력하고<br />
                    <strong>무료로 생성하기</strong>를 클릭하세요
                  </p>
                </div>
              )}

              {/* Results */}
              {!isLoading && results.map((result, i) => {
                const channelInfo = getChannelInfo(result.channel);
                const fullText = result.hashtags
                  ? `${result.content}\n\n${result.hashtags.join(" ")}`
                  : result.content;

                return (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{channelInfo?.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{channelInfo?.label}</div>
                          <div className="text-xs text-gray-400">{result.content.length}자</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">
                        생성 완료
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {result.content}
                      </p>
                    </div>

                    {result.hashtags && result.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {result.hashtags.map((tag, j) => (
                          <span key={j} className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(fullText, i)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                          copiedIndex === i
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {copiedIndex === i ? (
                          <><Check className="w-3.5 h-3.5" />복사 완료!</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" />전체 복사</>
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

              {/* Sign-up CTA — 한 번 생성 후 표시 */}
              {triedOnce && results.length > 0 && (
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center">
                  <div className="text-2xl mb-2">🚀</div>
                  <h3 className="font-bold text-lg mb-2">마음에 드셨나요?</h3>
                  <p className="text-blue-200 text-sm mb-5">
                    회원가입하면 <strong className="text-white">월간 캘린더 자동 생성</strong>,
                    <strong className="text-white"> 예약 발행</strong>,
                    <strong className="text-white"> 성과 분석</strong>까지 사용할 수 있습니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm"
                    >
                      14일 무료 체험 시작
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <p className="text-blue-300 text-xs mt-3">
                    <Lock className="w-3 h-3 inline mr-1" />
                    신용카드 불필요 · 언제든 취소 가능
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
