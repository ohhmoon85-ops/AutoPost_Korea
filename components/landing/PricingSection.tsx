"use client";

import { PRICING_PLANS } from "@/lib/constants";
import { CheckCircle, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">합리적인 요금제</h2>
          <p className="section-subheading">
            규모에 맞는 플랜을 선택하세요. 데모 체험 후 결정하셔도 됩니다.
          </p>

          {/* Annual toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-medium ${!isAnnual ? "text-gray-900" : "text-gray-400"}`}>
              월간 결제
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                isAnnual ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  isAnnual ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? "text-gray-900" : "text-gray-400"}`}>
              연간 결제
              <span className="ml-1.5 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                20% 할인
              </span>
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, i) => {
            const price = isAnnual
              ? Math.round(plan.price * 0.8)
              : plan.price;

            return (
              <div
                key={i}
                className={`relative bg-white rounded-2xl border-2 p-7 flex flex-col transition-all duration-300 ${
                  plan.highlighted
                    ? "border-blue-600 shadow-xl shadow-blue-100"
                    : "border-gray-100 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Most popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                      <Zap className="w-3 h-3" fill="white" />
                      가장 인기
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      ₩{price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 mb-1.5">/월</span>
                  </div>
                  {isAnnual && (
                    <div className="text-xs text-green-600 font-medium mt-1">
                      연간 ₩{(price * 12).toLocaleString()} (20% 절약)
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <CheckCircle
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? "text-blue-600" : "text-green-500"
                        }`}
                      />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/login"
                  className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                      : "border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Enterprise note */}
        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">
            더 많은 기능이 필요하신가요?{" "}
            <a
              href="mailto:hello@autopost.kr"
              className="text-blue-600 font-medium hover:underline"
            >
              엔터프라이즈 문의하기
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
