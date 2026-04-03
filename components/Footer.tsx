import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-bold text-lg text-white">
                AutoPost <span className="text-blue-400">Korea</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              소상공인을 위한 AI 기반 SNS 콘텐츠 자동화 플랫폼. 업종과 키워드만
              입력하면 AI가 채널별 맞춤 게시물을 자동으로 생성합니다.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="hover:text-white transition-colors">
                  주요 기능
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition-colors">
                  요금제
                </Link>
              </li>
              <li>
                <Link href="/dashboard/generate" className="hover:text-white transition-colors">
                  콘텐츠 생성
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">지원</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <a href="mailto:hello@autopost.kr" className="hover:text-white transition-colors">
                  문의하기
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © 2026 AutoPost Korea. All rights reserved.
          </p>
          <p className="text-xs">
            Powered by{" "}
            <span className="text-blue-400 font-medium">Claude AI</span> by
            Anthropic
          </p>
        </div>
      </div>
    </footer>
  );
}
