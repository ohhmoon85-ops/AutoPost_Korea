import { TrendingUp, Heart, Eye, Users, MessageCircle } from "lucide-react";

const metrics = [
  { label: "총 좋아요", value: "0", icon: Heart, color: "text-red-500", bg: "bg-red-50" },
  { label: "총 도달", value: "0", icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "팔로워 증가", value: "0", icon: Users, color: "text-green-500", bg: "bg-green-50" },
  { label: "댓글", value: "0", icon: MessageCircle, color: "text-violet-500", bg: "bg-violet-50" },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">성과 분석</h1>
        <p className="text-sm text-gray-500">
          채널별 게시물 성과를 자동으로 수집하고 분석합니다.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <div className={`w-9 h-9 ${metric.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${metric.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-0.5">
                {metric.value}
              </div>
              <div className="text-xs text-gray-500">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Chart placeholder */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-gray-900">주간 성과 추이</h3>
        </div>
        <div className="h-48 flex items-end justify-around gap-2 border-b border-gray-100 pb-2">
          {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
            <div key={day} className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full bg-gray-100 rounded-t-md h-8 animate-shimmer" />
              <span className="text-xs text-gray-400">{day}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 py-6 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-400">
            채널을 연결하면 성과 데이터가 자동으로 수집됩니다.
          </p>
        </div>
      </div>

      {/* Top posts placeholder */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">인기 게시물 TOP 5</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-lg animate-shimmer flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-gray-200 rounded animate-shimmer w-3/4" />
                <div className="h-2.5 bg-gray-100 rounded animate-shimmer w-1/2" />
              </div>
            </div>
          ))}
          <div className="text-center py-4 text-xs text-gray-400">
            게시물을 발행하면 성과 순위가 여기에 표시됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}
