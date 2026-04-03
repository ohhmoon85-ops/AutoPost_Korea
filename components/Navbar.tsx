"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-lg text-gray-900">
              AutoPost <span className="text-blue-600">Korea</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              주요 기능
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              사용 방법
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              요금제
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              로그인
            </Link>
            <Link
              href="/login"
              className="btn-primary text-sm"
            >
              무료로 시작하기
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="메뉴 열기"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 space-y-1">
            <Link
              href="#features"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              주요 기능
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              사용 방법
            </Link>
            <Link
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              요금제
            </Link>
            <div className="pt-3 px-4 space-y-2">
              <Link
                href="/login"
                className="block w-full text-center py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                로그인
              </Link>
              <Link
                href="/login"
                className="block w-full text-center py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700"
              >
                무료로 시작하기
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
