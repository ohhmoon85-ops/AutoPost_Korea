import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: "🏪",
    title: "업종·키워드 입력",
    description:
      "업종을 선택하고 홍보하고 싶은 키워드와 브랜드 톤을 입력합니다. 최초 1회만 설정하면 됩니다.",
    color: "from-blue-500 to-blue-600",
  },
  {
    step: "02",
    icon: "🤖",
    title: "AI가 초안 자동 생성",
    description:
      "Claude AI가 업종별 최적화된 글쓰기 스타일로 인스타·블로그·스레드·카카오 채널별 맞춤 게시물을 자동 생성합니다.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    step: "03",
    icon: "📅",
    title: "예약 발행 설정",
    description:
      "원하는 시간에 자동 발행되도록 예약하거나, 즉시 발행할 수 있습니다. 여러 채널을 동시에 설정 가능합니다.",
    color: "from-violet-500 to-violet-600",
  },
  {
    step: "04",
    icon: "📊",
    title: "성과 분석 & 개선",
    description:
      "좋아요·도달·팔로워 데이터를 자동으로 수집하고, AI가 효과적인 콘텐츠 패턴을 분석하여 점점 더 좋은 콘텐츠를 제안합니다.",
    color: "from-pink-500 to-pink-600",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            이렇게 간단합니다
          </h2>
          <p className="section-subheading">
            4단계만으로 전문 마케터 수준의 SNS 운영이 가능합니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector arrow (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-12 -right-2 z-10 items-center">
                  <ArrowRight className="w-5 h-5 text-gray-300" />
                </div>
              )}

              <div className="bg-gray-50 rounded-2xl p-6 h-full hover:shadow-md transition-all duration-300">
                {/* Step number */}
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4 shadow-sm`}
                >
                  {step.step}
                </div>

                {/* Icon */}
                <div className="text-3xl mb-3">{step.icon}</div>

                {/* Content */}
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/login"
            className="btn-primary text-base px-8 py-4 rounded-xl shadow-lg shadow-blue-200 inline-flex items-center gap-2"
          >
            지금 바로 시작하기
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
