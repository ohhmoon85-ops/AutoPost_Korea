import Link from "next/link";
import {
  Wand2,
  TrendingUp,
  Calendar,
  ArrowRight,
  Instagram,
  FileText,
  MessageCircle,
} from "lucide-react";

const quickStats = [
  { label: "이번 달 생성", value: "0", unit: "건", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "발행 완료", value: "0", unit: "건", color: "text-green-600", bg: "bg-green-50" },
  { label: "총 도달", value: "0", unit: "명", color: "text-violet-600", bg: "bg-violet-50" },
  { label: "팔로워 증가", value: "0", unit: "명", color: "text-orange-600", bg: "bg-orange-50" },
];

const recentChannels = [
  { icon: Instagram, name: "인스타그램", count: "0건 발행", color: "text-pink-600", bg: "bg-pink-50" },
  { icon: FileText, name: "네이버 블로그", count: "0건 발행", color: "text-green-600", bg: "bg-green-50" },
  { icon: MessageCircle, name: "카카오채널", count: "0건 발행", color: "text-yellow-600", bg: "bg-yellow-50" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              환영합니다! 👋
            </h2>
            <p className="text-blue-200 text-sm">
              AI를 활용해 오늘 첫 게시물을 만들어보세요. 단 3분이면 충분합니다.
            </p>
          </div>
          <Link
            href="/dashboard/generate"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm whitespace-nowrap"
          >
            <Wand2 className="w-4 h-4" />
            콘텐츠 생성하기
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
          >
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
              <span className="text-base font-normal ml-0.5">{stat.unit}</span>
            </div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main actions grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/generate"
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
            <Wand2 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">AI 콘텐츠 생성</h3>
          <p className="text-sm text-gray-500">업종·키워드 입력으로 채널별 게시물 자동 생성</p>
          <div className="flex items-center gap-1 text-blue-600 text-sm font-medium mt-4">
            시작하기 <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          href="/dashboard/calendar"
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-100 transition-colors">
            <Calendar className="w-6 h-6 text-violet-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">콘텐츠 캘린더</h3>
          <p className="text-sm text-gray-500">월간 발행 일정을 한눈에 관리</p>
          <div className="flex items-center gap-1 text-violet-600 text-sm font-medium mt-4">
            보기 <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          href="/dashboard/analytics"
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">성과 분석</h3>
          <p className="text-sm text-gray-500">채널별 좋아요·도달·팔로워 데이터 확인</p>
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium mt-4">
            확인하기 <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>

      {/* Channel status */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-900">채널 연결 상태</h3>
          <Link
            href="/dashboard/settings"
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            채널 연결하기
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {recentChannels.map((channel, i) => {
            const Icon = channel.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
              >
                <div className={`w-9 h-9 ${channel.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${channel.color}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    {channel.name}
                  </div>
                  <div className="text-xs text-gray-400">{channel.count}</div>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-1 bg-gray-200 text-gray-500 text-xs rounded-full font-medium">
                    미연결
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Getting started guide */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-blue-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">시작 가이드</h3>
        <div className="space-y-3">
          {[
            { step: "1", text: "채널 연결하기 (인스타그램, 네이버 블로그 등)", done: false },
            { step: "2", text: "업종과 브랜드 톤 설정하기", done: false },
            { step: "3", text: "첫 번째 AI 콘텐츠 생성하기", done: false },
            { step: "4", text: "예약 발행 설정하기", done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                item.done ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {item.done ? "✓" : item.step}
              </div>
              <span className={`text-sm ${item.done ? "text-gray-400 line-through" : "text-gray-700"}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
