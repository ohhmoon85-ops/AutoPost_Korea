"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) setError(error.message);
      else setMessage("이메일을 확인해주세요. 확인 링크를 클릭하면 가입이 완료됩니다.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      else router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
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
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="font-bold text-xl text-gray-900">
                AutoPost <span className="text-blue-600">Korea</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isSignUp ? "무료 체험 시작하기" : "다시 만나서 반가워요!"}
            </h1>
            <p className="text-sm text-gray-500">
              {isSignUp
                ? "14일 무료, 신용카드 불필요"
                : "계정에 로그인하여 계속하세요"}
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-gray-700 text-sm mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Google로 {isSignUp ? "가입" : "로그인"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">또는 이메일로</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Email form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    required
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignUp ? "8자 이상 입력하세요" : "비밀번호를 입력하세요"}
                    required
                    minLength={isSignUp ? 8 : undefined}
                    className="input-field pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error / Success message */}
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg px-3 py-2.5">
                  {error}
                </div>
              )}
              {message && (
                <div className="bg-green-50 border border-green-100 text-green-600 text-xs rounded-lg px-3 py-2.5">
                  {message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "처리 중..."
                  : isSignUp
                  ? "무료 체험 시작하기"
                  : "로그인"}
              </button>
            </form>

            {/* Toggle */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                {isSignUp ? "이미 계정이 있으신가요?" : "아직 계정이 없으신가요?"}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                    setMessage("");
                  }}
                  className="ml-1.5 text-blue-600 font-semibold hover:underline"
                >
                  {isSignUp ? "로그인" : "무료 가입"}
                </button>
              </p>
            </div>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-400 text-center mt-4">
            계속 진행하면{" "}
            <a href="#" className="underline hover:text-gray-600">
              이용약관
            </a>{" "}
            및{" "}
            <a href="#" className="underline hover:text-gray-600">
              개인정보처리방침
            </a>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
