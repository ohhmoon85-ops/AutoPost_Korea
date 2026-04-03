import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const badges = ["인스타그램", "네이버 블로그", "스레드", "카카오채널"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI 기반 SNS 콘텐츠 자동화
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              SNS 운영,
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                이제 AI가
              </span>
              <br />
              대신합니다
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              업종과 키워드만 입력하면 AI가{" "}
              <strong className="text-gray-900">채널별 맞춤 게시물</strong>을
              자동으로 생성하고 예약 발행합니다. 마케터 없이도 지속적인 SNS
              운영이 가능합니다.
            </p>

            {/* Channel badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 font-medium shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/demo"
                className="btn-primary text-base px-8 py-4 rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 group"
              >
                무료 데모 체험하기
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="btn-secondary text-base px-8 py-4 rounded-xl"
              >
                작동 방식 보기
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-4 mt-8 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                로그인 없이 데모 체험
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                신용카드 불필요
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                언제든 취소 가능
              </div>
            </div>
          </div>

          {/* Right: Demo Card */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 animate-float">
                {/* Card header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    카
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      카페 봄날 ☕
                    </div>
                    <div className="text-xs text-gray-400">인스타그램 게시물 생성 중...</div>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      AI 생성 중
                    </span>
                  </div>
                </div>

                {/* Generated content preview */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    ☕ 오늘도 따뜻한 하루 시작해요!
                    <br />
                    <br />
                    봄날의 햇살처럼 포근한 우리 카페의 시그니처 라떼 ✨<br />
                    진한 에스프레소와 부드러운 우유 폼이 만나 완성되는 하루의
                    여유...
                  </p>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["#카페", "#라떼", "#봄날카페", "#커피맛집", "#홍대카페"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    복사하기
                  </button>
                  <button className="flex-1 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    다시 생성
                  </button>
                </div>
              </div>

              {/* Floating notification cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-2.5 flex items-center gap-2">
                <span className="text-lg">📸</span>
                <div>
                  <div className="text-xs font-semibold text-gray-800">인스타 발행 완료</div>
                  <div className="text-xs text-gray-400">방금 전</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-2.5 flex items-center gap-2">
                <span className="text-lg">📝</span>
                <div>
                  <div className="text-xs font-semibold text-gray-800">블로그 예약 발행</div>
                  <div className="text-xs text-gray-400">내일 오전 9시</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
