import Link from "next/link";
import { Calendar, Wand2 } from "lucide-react";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthLabel = `${year}년 ${month + 1}월`;

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">콘텐츠 캘린더</h1>
          <p className="text-sm text-gray-500">발행 일정을 한눈에 관리하세요.</p>
        </div>
        <Link
          href="/dashboard/generate"
          className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2 self-start sm:self-auto"
        >
          <Wand2 className="w-4 h-4" />
          콘텐츠 추가
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {/* Month header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">{monthLabel}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            이번 달 예약 게시물: 0건
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((day, i) => (
            <div
              key={day}
              className={`text-center text-xs font-semibold py-2 ${
                i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => (
            <div
              key={i}
              className={`min-h-[80px] sm:min-h-[100px] rounded-xl p-2 border transition-colors ${
                day === null
                  ? "border-transparent"
                  : day === today
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-100 hover:border-gray-200 hover:bg-gray-50 cursor-pointer"
              }`}
            >
              {day !== null && (
                <span
                  className={`text-xs font-medium ${
                    day === today
                      ? "w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center"
                      : i % 7 === 0
                      ? "text-red-400"
                      : i % 7 === 6
                      ? "text-blue-400"
                      : "text-gray-600"
                  }`}
                >
                  {day}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div className="mt-8 text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
          <div className="text-4xl mb-3">📅</div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">
            예약된 게시물이 없습니다
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            AI 콘텐츠 생성 후 발행 일정을 설정하면 여기에 표시됩니다.
          </p>
          <Link
            href="/dashboard/generate"
            className="btn-primary text-xs py-2 px-4 rounded-lg"
          >
            첫 콘텐츠 만들기
          </Link>
        </div>
      </div>
    </div>
  );
}
