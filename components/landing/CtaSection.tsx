import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              지금 시작하면 14일 무료
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              오늘부터 SNS 운영
              <br />
              AI에게 맡기세요
            </h2>

            <p className="text-blue-200 text-lg mb-8 max-w-lg mx-auto">
              신용카드 없이 14일 무료 체험. 언제든 취소 가능합니다.
              <br />
              지금 시작해서 첫 게시물을 3분 안에 완성해보세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg group"
              >
                무료로 시작하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <p className="text-blue-300 text-sm mt-6">
              이미 1,500명이 AutoPost Korea를 사용하고 있습니다
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
