"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INDUSTRIES, CHANNELS, TONES, CONTENT_PURPOSES } from "@/lib/constants";
import {
  Wand2, RefreshCw, ChevronDown, Sparkles,
  ArrowRight, Lock, BarChart2, Calendar, Heart, Eye, Users,
  MessageCircle, TrendingUp, Instagram, FileText, Hash,
} from "lucide-react";

type GeneratedContent = { channel: string; content: string; hashtags?: string[] };
type Tab = "generate" | "analytics" | "calendar";

// ── 샘플 분석 데이터 ──────────────────────────────────────────
const SAMPLE_METRICS = [
  { label: "총 좋아요", value: "2,847", change: "+23%", icon: Heart, color: "text-red-500", bg: "bg-red-50" },
  { label: "총 도달", value: "18,420", change: "+41%", icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "팔로워 증가", value: "+312", change: "+18%", icon: Users, color: "text-green-500", bg: "bg-green-50" },
  { label: "댓글", value: "183", change: "+9%", icon: MessageCircle, color: "text-violet-500", bg: "bg-violet-50" },
];

const WEEKLY_DATA = [
  { day: "월", likes: 38, reach: 520 },
  { day: "화", likes: 52, reach: 780 },
  { day: "수", likes: 45, reach: 640 },
  { day: "목", likes: 71, reach: 1020 },
  { day: "금", likes: 88, reach: 1340 },
  { day: "토", likes: 120, reach: 1890 },
  { day: "일", likes: 94, reach: 1420 },
];

const TOP_POSTS = [
  { channel: "📸", title: "봄 신메뉴 딸기라떼 출시 🍓", likes: 241, reach: 3820, hashtags: 18 },
  { channel: "📝", title: "홍대 카페 추천 TOP 5 완벽 정리", likes: 189, reach: 2940, hashtags: 12 },
  { channel: "💬", title: "오늘 하루도 커피 한 잔의 여유 ☕", likes: 156, reach: 2110, hashtags: 8 },
  { channel: "📸", title: "봄 시즌 한정 메뉴 얼리버드 20% 할인", likes: 143, reach: 1980, hashtags: 20 },
  { channel: "📸", title: "직접 만든 수제 케이크 당일 픽업 가능", likes: 118, reach: 1650, hashtags: 15 },
];

const CHANNEL_STATS = [
  { icon: Instagram, name: "인스타그램", followers: "1,284", posts: 24, reach: "12,400", color: "text-pink-600", bg: "bg-pink-50" },
  { icon: FileText, name: "네이버 블로그", followers: "428", posts: 12, reach: "4,820", color: "text-green-600", bg: "bg-green-50" },
  { icon: Hash, name: "스레드", followers: "203", posts: 8, reach: "1,200", color: "text-gray-700", bg: "bg-gray-100" },
];

// ── 샘플 캘린더 데이터 ────────────────────────────────────────
const CALENDAR_POSTS: Record<number, { channel: string; title: string; time: string }[]> = {
  2: [{ channel: "📸", title: "봄 메뉴 소개", time: "09:00" }],
  5: [{ channel: "📝", title: "카페 인테리어 블로그", time: "11:00" }],
  7: [{ channel: "📸", title: "주말 특별 이벤트", time: "10:00" }, { channel: "💬", title: "카카오 소식", time: "18:00" }],
  10: [{ channel: "📸", title: "신메뉴 출시 예고", time: "09:00" }],
  12: [{ channel: "📝", title: "커피 원두 소개 포스팅", time: "14:00" }],
  14: [{ channel: "📸", title: "발렌타인 프로모션", time: "09:00" }, { channel: "💬", title: "이벤트 안내", time: "12:00" }],
  16: [{ channel: "🧵", title: "오늘의 한마디", time: "20:00" }],
  19: [{ channel: "📸", title: "직원 소개 시리즈", time: "11:00" }],
  21: [{ channel: "📝", title: "봄 카페 추천 리스트", time: "10:00" }],
  23: [{ channel: "📸", title: "고객 리뷰 감사 게시물", time: "09:00" }],
  26: [{ channel: "📸", title: "월말 할인 이벤트", time: "09:00" }, { channel: "💬", title: "이벤트 안내", time: "09:30" }],
  28: [{ channel: "🧵", title: "이번 달 결산", time: "19:00" }],
};

const DAYS_KR = ["일", "월", "화", "수", "목", "금", "토"];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>("generate");

  // generate 탭 state
  const [industry, setIndustry] = useState("cafe");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("friendly");
  const [purpose, setPurpose] = useState("introduce");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["instagram"]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GeneratedContent[]>([]);
  const [error, setError] = useState("");
  const [triedOnce, setTriedOnce] = useState(false);

  // analytics 탭 state
  const [chartMode, setChartMode] = useState<"likes" | "reach">("likes");

  // calendar state
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const maxVal = Math.max(...WEEKLY_DATA.map((d) => chartMode === "likes" ? d.likes : d.reach));

  const toggleChannel = (ch: string) =>
    setSelectedChannels((p) => p.includes(ch) ? p.filter((c) => c !== ch) : [...p, ch]);

  const handleGenerate = async () => {
    if (!keywords.trim()) { setError("키워드를 입력해주세요."); return; }
    if (!selectedChannels.length) { setError("채널을 하나 이상 선택해주세요."); return; }
    setError(""); setIsLoading(true); setResults([]);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, keywords, tone, purpose, channels: selectedChannels }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "생성 실패");
      const data = await res.json();
      setResults(data.results);
      setTriedOnce(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "콘텐츠 생성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (_text: string, _i: number) => {
    // 복사 기능은 유료 회원 전용입니다
  };

  const getChannelInfo = (v: string) => CHANNELS.find((c) => c.value === v);

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "generate", label: "AI 콘텐츠 생성", icon: <Wand2 className="w-4 h-4" /> },
    { key: "analytics", label: "성과 분석 대시보드", icon: <BarChart2 className="w-4 h-4" /> },
    { key: "calendar", label: "콘텐츠 캘린더", icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            무료 데모 체험 — 로그인 불필요
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            AutoPost Korea를{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              직접 체험
            </span>
            해보세요
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-8">
            AI 콘텐츠 생성부터 성과 분석, 캘린더 관리까지 — 실제 서비스 그대로입니다.
          </p>

          {/* Tabs */}
          <div className="inline-flex bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* ── TAB 1: AI 콘텐츠 생성 ── */}
          {activeTab === "generate" && (
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5 sticky top-24">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">업종</label>
                    <div className="relative">
                      <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="input-field appearance-none pr-10">
                        {INDUSTRIES.map((ind) => <option key={ind.value} value={ind.value}>{ind.label}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">홍보 키워드 <span className="text-red-500">*</span></label>
                    <textarea value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="예: 봄 신메뉴 딸기라떼, 한정 출시, 홍대 카페" rows={3} className="input-field resize-none" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">게시물 목적</label>
                    <div className="relative">
                      <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="input-field appearance-none pr-10">
                        {CONTENT_PURPOSES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">브랜드 톤</label>
                    <div className="grid grid-cols-2 gap-2">
                      {TONES.map((t) => (
                        <button key={t.value} onClick={() => setTone(t.value)}
                          className={`text-xs px-3 py-2 rounded-lg border-2 font-medium transition-all text-left ${tone === t.value ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">채널 선택 <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-2 gap-2">
                      {CHANNELS.map((ch) => {
                        const sel = selectedChannels.includes(ch.value);
                        return (
                          <button key={ch.value} onClick={() => toggleChannel(ch.value)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all ${sel ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                            <span className="text-lg">{ch.icon}</span>
                            <span className={`text-xs font-medium ${sel ? "text-blue-700" : "text-gray-600"}`}>{ch.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {error && <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg px-3 py-2.5">{error}</div>}

                  <button onClick={handleGenerate} disabled={isLoading}
                    className="w-full btn-primary py-3.5 text-sm rounded-xl disabled:opacity-60 shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                    {isLoading ? <><RefreshCw className="w-4 h-4 animate-spin" />AI가 생성 중...</> : <><Wand2 className="w-4 h-4" />무료로 생성하기</>}
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-3 space-y-4">
                {isLoading && selectedChannels.map((ch) => {
                  const ci = getChannelInfo(ch);
                  return (
                    <div key={ch} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                      <div className="flex items-center gap-2 mb-4"><span className="text-xl">{ci?.icon}</span><div className="h-4 animate-shimmer rounded w-24" /></div>
                      <div className="space-y-2">{[100,80,90,70].map((w,i) => <div key={i} className="h-3 animate-shimmer rounded" style={{width:`${w}%`}} />)}</div>
                    </div>
                  );
                })}

                {!isLoading && results.length === 0 && (
                  <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
                    <div className="text-5xl mb-4">✨</div>
                    <h3 className="text-base font-semibold text-gray-800 mb-2">생성된 콘텐츠가 여기에 표시됩니다</h3>
                    <p className="text-sm text-gray-400">왼쪽에서 업종·키워드를 입력하고<br /><strong>무료로 생성하기</strong>를 클릭하세요</p>
                  </div>
                )}

                {!isLoading && results.map((result, i) => {
                  const ci = getChannelInfo(result.channel);
                  return (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{ci?.icon}</span>
                          <div><div className="text-sm font-bold text-gray-900">{ci?.label}</div><div className="text-xs text-gray-400">{result.content.length}자</div></div>
                        </div>
                        <span className="px-2.5 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">생성 완료</span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 mb-4 select-none" onCopy={(e) => e.preventDefault()}>
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{result.content}</p>
                      </div>
                      {result.hashtags?.length ? (
                        <div className="flex flex-wrap gap-1.5 mb-4 select-none" onCopy={(e) => e.preventDefault()}>
                          {result.hashtags.map((tag, j) => <span key={j} className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{tag}</span>)}
                        </div>
                      ) : null}
                      <div className="flex gap-2">
                        <Link href="/login"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all">
                          <Lock className="w-3.5 h-3.5" />가입하면 전체 복사 가능
                        </Link>
                        <button onClick={handleGenerate} disabled={isLoading}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50">
                          <RefreshCw className="w-3.5 h-3.5" />다시 생성
                        </button>
                      </div>
                    </div>
                  );
                })}

                {triedOnce && results.length > 0 && <SignupCta />}
              </div>
            </div>
          )}

          {/* ── TAB 2: 성과 분석 ── */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <DemoBadge text="샘플 데이터 기반 미리보기 — 실제 서비스에서는 내 채널 데이터가 자동 수집됩니다" />

              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {SAMPLE_METRICS.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                      <div className={`w-9 h-9 ${m.bg} rounded-xl flex items-center justify-center mb-3`}>
                        <Icon className={`w-4 h-4 ${m.color}`} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-0.5">{m.value}</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-500">{m.label}</span>
                        <span className="text-xs font-semibold text-green-600">{m.change}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-gray-900">주간 성과 추이</h3>
                  </div>
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                    {(["likes","reach"] as const).map((m) => (
                      <button key={m} onClick={() => setChartMode(m)}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartMode === m ? "bg-white shadow-sm text-blue-600" : "text-gray-500"}`}>
                        {m === "likes" ? "좋아요" : "도달"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-end gap-3 h-40 border-b border-gray-100 pb-2">
                  {WEEKLY_DATA.map((d) => {
                    const val = chartMode === "likes" ? d.likes : d.reach;
                    const pct = Math.round((val / maxVal) * 100);
                    return (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-xs text-gray-500 font-medium">{val}</div>
                        <div className="w-full flex items-end" style={{ height: "100px" }}>
                          <div
                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500"
                            style={{ height: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{d.day}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-blue-500" />이번 주</div>
                </div>
              </div>

              {/* Channel stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                {CHANNEL_STATS.map((ch, i) => {
                  const Icon = ch.icon;
                  return (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-9 h-9 ${ch.bg} rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${ch.color}`} />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{ch.name}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div><div className="text-base font-bold text-gray-900">{ch.followers}</div><div className="text-xs text-gray-400">팔로워</div></div>
                        <div><div className="text-base font-bold text-gray-900">{ch.posts}</div><div className="text-xs text-gray-400">게시물</div></div>
                        <div><div className="text-base font-bold text-gray-900">{ch.reach}</div><div className="text-xs text-gray-400">도달</div></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Top posts */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">인기 게시물 TOP 5</h3>
                <div className="space-y-3">
                  {TOP_POSTS.map((post, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-7 h-7 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-lg flex-shrink-0">{post.channel}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800 truncate">{post.title}</div>
                        <div className="text-xs text-gray-400">해시태그 {post.hashtags}개</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-bold text-gray-900">❤️ {post.likes}</div>
                        <div className="text-xs text-gray-400">도달 {post.reach.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <SignupCta />
            </div>
          )}

          {/* ── TAB 3: 콘텐츠 캘린더 ── */}
          {activeTab === "calendar" && (
            <div className="space-y-6">
              <DemoBadge text="샘플 데이터 기반 미리보기 — 실제 서비스에서는 AI가 월간 발행 일정을 자동으로 채워줍니다" />

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    {year}년 {month + 1}월
                  </h2>
                  <div className="flex items-center gap-3 text-xs">
                    {[["📸","인스타"],["📝","블로그"],["💬","카카오"],["🧵","스레드"]].map(([icon, label]) => (
                      <div key={label} className="flex items-center gap-1 text-gray-500">
                        <span>{icon}</span><span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-1">
                  {DAYS_KR.map((d, i) => (
                    <div key={d} className={`text-center text-xs font-semibold py-2 ${i===0?"text-red-500":i===6?"text-blue-500":"text-gray-400"}`}>{d}</div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((day, i) => {
                    const posts = day ? CALENDAR_POSTS[day] || [] : [];
                    const isToday = day === today;
                    return (
                      <div key={i} className={`min-h-[80px] sm:min-h-[100px] rounded-xl p-1.5 border transition-colors ${
                        day === null ? "border-transparent" :
                        isToday ? "border-blue-300 bg-blue-50" :
                        posts.length ? "border-indigo-100 bg-indigo-50/30 hover:border-indigo-200" :
                        "border-gray-100 hover:border-gray-200"
                      }`}>
                        {day !== null && (
                          <>
                            <span className={`text-xs font-medium block mb-1 ${
                              isToday ? "w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px]" :
                              (i % 7 === 0) ? "text-red-400" : (i % 7 === 6) ? "text-blue-400" : "text-gray-600"
                            }`}>{day}</span>
                            <div className="space-y-0.5">
                              {posts.slice(0, 2).map((p, pi) => (
                                <div key={pi} className="flex items-center gap-0.5 bg-white rounded px-1 py-0.5 shadow-sm">
                                  <span className="text-[10px]">{p.channel}</span>
                                  <span className="text-[9px] text-gray-600 truncate hidden sm:block">{p.title}</span>
                                  <span className="text-[9px] text-gray-400 ml-auto flex-shrink-0">{p.time}</span>
                                </div>
                              ))}
                              {posts.length > 2 && <div className="text-[9px] text-gray-400 pl-1">+{posts.length-2}개</div>}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-blue-600" />오늘</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-indigo-100 border border-indigo-200" />예약 게시물 있음</div>
                  <div className="font-medium text-gray-700 ml-auto">이번 달 총 {Object.values(CALENDAR_POSTS).flat().length}건 예약</div>
                </div>
              </div>

              <SignupCta />
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}

function DemoBadge({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
      <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
      {text}
    </div>
  );
}

function SignupCta() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white text-center">
      <div className="text-2xl mb-2">🚀</div>
      <h3 className="font-bold text-lg sm:text-xl mb-2">마음에 드셨나요?</h3>
      <p className="text-blue-200 text-sm mb-6 max-w-md mx-auto">
        회원가입하면 <strong className="text-white">내 채널 데이터</strong>로 실제 분석하고,
        <strong className="text-white"> AI가 월간 발행 일정</strong>을 자동으로 채워드립니다.
      </p>
      <Link href="/login"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
        14일 무료 체험 시작 <ArrowRight className="w-4 h-4" />
      </Link>
      <p className="text-blue-300 text-xs mt-3">
        <Lock className="w-3 h-3 inline mr-1" />신용카드 불필요 · 언제든 취소 가능
      </p>
    </div>
  );
}
