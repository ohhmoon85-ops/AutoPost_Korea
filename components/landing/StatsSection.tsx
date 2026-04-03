const stats = [
  { value: "330만+", label: "국내 소상공인", sub: "SNS 운영 비율 68%" },
  { value: "45분", label: "게시물 1개 평균 작성 시간", sub: "월 최대 54시간 소요" },
  { value: "5%", label: "마케터 고용 비율", sub: "나머지 95%는 직접 운영" },
  { value: "3분", label: "AutoPost로 줄어든 시간", sub: "업종 입력 → AI 초안 완성" },
];

export default function StatsSection() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-400">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
