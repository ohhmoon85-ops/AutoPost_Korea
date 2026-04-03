import {
  Cpu,
  Clock,
  TrendingUp,
  Hash,
  Calendar,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "업종별 AI 프롬프트",
    description:
      "미용실·카페·병원 등 50개 업종별 맞춤 글쓰기 스타일을 적용합니다. 전문 용어와 감성 톤이 자동으로 최적화됩니다.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Clock,
    title: "예약 자동 발행",
    description:
      "인스타그램·네이버 블로그·스레드·카카오채널에 원하는 시간에 자동으로 발행됩니다. 한 번 설정하면 끝.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Hash,
    title: "해시태그 자동 추천",
    description:
      "업종·지역·트렌드 기반으로 최적 해시태그를 자동 생성합니다. 상위 노출 가능성이 높은 태그를 우선 추천합니다.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Calendar,
    title: "월간 콘텐츠 캘린더",
    description:
      "월 1회 키워드 입력으로 한 달치 30개 게시물 초안과 발행 일정을 자동으로 생성합니다.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: TrendingUp,
    title: "성과 분석 대시보드",
    description:
      "좋아요·댓글·도달·팔로워 증가를 자동으로 수집합니다. AI가 효과적인 게시물 패턴을 분석해 드립니다.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Bell,
    title: "발행 결과 알림",
    description:
      "발행 성공/실패 여부를 이메일로 즉시 알려드립니다. 문제가 생겨도 빠르게 파악하고 대응할 수 있습니다.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            필요한 기능을{" "}
            <span className="gradient-text">모두 담았습니다</span>
          </h2>
          <p className="section-subheading">
            소상공인이 SNS 마케팅에서 겪는 모든 문제를 해결하는 기능을 제공합니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover"
              >
                <div
                  className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
