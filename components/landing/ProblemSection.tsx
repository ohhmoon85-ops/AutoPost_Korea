import { Clock, BookOpen, Layers, BarChart2 } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "시간이 없어요",
    description:
      "SNS 게시물 1개 작성에 평균 45분. 주 3회 × 3채널이면 월 54시간을 SNS에만 써야 합니다.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: BookOpen,
    title: "전문성이 부족해요",
    description:
      "해시태그 전략, 최적 발행 시간, 채널별 포맷 차이를 모두 알기는 너무 어렵습니다.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Layers,
    title: "채널이 너무 많아요",
    description:
      "인스타·블로그·카카오 각각 별도로 작성해야 해서 같은 내용을 3번 씩 쓰게 됩니다.",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: BarChart2,
    title: "성과를 모르겠어요",
    description:
      "어떤 게시물이 효과적인지 파악이 안 되어 개선 없이 반복하게 됩니다.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            소상공인 SNS 운영,
            <br />
            <span className="text-red-500">이런 어려움</span> 겪고 계신가요?
          </h2>
          <p className="section-subheading">
            한국 소상공인 330만 명의 95%가 마케터 없이 SNS를 직접 운영합니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover"
              >
                <div
                  className={`w-12 h-12 ${problem.bg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${problem.color}`} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
