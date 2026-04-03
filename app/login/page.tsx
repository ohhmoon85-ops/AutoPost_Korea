import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Back button */}
      <div className="p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          홈으로
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="font-bold text-xl text-gray-900">
            AutoPost <span className="text-blue-600">Korea</span>
          </span>
        </Link>

        {/* Clerk SignIn — handles Google OAuth + 이메일/비밀번호 */}
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              card: "shadow-xl border border-gray-100 rounded-2xl",
              headerTitle: "text-xl font-bold text-gray-900",
              headerSubtitle: "text-sm text-gray-500",
              socialButtonsBlockButton:
                "border-2 border-gray-200 hover:border-gray-300 rounded-xl font-medium",
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold",
              footerActionLink: "text-blue-600 font-semibold",
            },
          }}
        />
      </div>
    </div>
  );
}
