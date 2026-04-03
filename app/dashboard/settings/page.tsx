"use client";

import { useState } from "react";
import { INDUSTRIES, CHANNELS } from "@/lib/constants";
import { Settings, Link2, User, Bell, ChevronDown } from "lucide-react";

export default function SettingsPage() {
  const [industry, setIndustry] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">설정</h1>
        <p className="text-sm text-gray-500">계정 및 서비스 설정을 관리합니다.</p>
      </div>

      <div className="space-y-5">
        {/* Business profile */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900">비즈니스 프로필</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                상호명
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="예: 카페 봄날"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                업종
              </label>
              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="input-field appearance-none pr-10"
                >
                  <option value="">업종을 선택해주세요</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind.value} value={ind.value}>
                      {ind.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <button
              onClick={handleSave}
              className={`btn-primary text-sm py-2.5 px-5 rounded-xl ${saved ? "bg-green-600 hover:bg-green-700" : ""}`}
            >
              {saved ? "저장 완료!" : "저장하기"}
            </button>
          </div>
        </div>

        {/* Channel connections */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
              <Link2 className="w-4 h-4 text-violet-600" />
            </div>
            <h3 className="font-bold text-gray-900">채널 연결</h3>
          </div>

          <div className="space-y-3">
            {CHANNELS.map((channel) => (
              <div
                key={channel.value}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{channel.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      {channel.label}
                    </div>
                    <div className="text-xs text-gray-400">{channel.description}</div>
                  </div>
                </div>
                <button className="px-4 py-1.5 text-xs font-semibold border-2 border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  연결하기
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-900">알림 설정</h3>
          </div>

          <div className="space-y-3">
            {[
              { label: "발행 완료 알림", sub: "게시물 발행 성공 시 이메일 알림" },
              { label: "발행 실패 알림", sub: "게시물 발행 실패 시 이메일 알림" },
              { label: "월간 성과 리포트", sub: "매월 1일 성과 요약 이메일" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-400">{item.sub}</div>
                </div>
                <button
                  className="relative w-11 h-6 bg-blue-600 rounded-full transition-colors"
                  role="switch"
                  aria-checked="true"
                >
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Plan */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900">현재 요금제</h3>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
            <div>
              <div className="text-sm font-bold text-blue-900">무료 체험 중</div>
              <div className="text-xs text-blue-600">14일 무료 체험 · 스타터 플랜</div>
            </div>
            <button className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              업그레이드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
