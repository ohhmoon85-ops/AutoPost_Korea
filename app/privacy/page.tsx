import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "개인정보처리방침 | AutoPost Korea",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-10">
            <p className="text-sm text-blue-600 font-medium mb-2">법적 고지</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">개인정보처리방침</h1>
            <p className="text-sm text-gray-400">시행일: 2026년 4월 1일 · 최종 업데이트: 2026년 4월 1일</p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
              AutoPost Korea는 이용자의 개인정보를 매우 중요하게 생각합니다.
              본 방침은 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」에 따라 작성되었습니다.
            </div>
          </div>

          <div className="prose prose-gray max-w-none space-y-8">

            <Section title="제1조 (수집하는 개인정보)">
              <p>회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
              <table>
                <thead>
                  <tr>
                    <th>수집 항목</th>
                    <th>수집 목적</th>
                    <th>보유 기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>이메일, 이름</td>
                    <td>회원가입 및 본인 확인</td>
                    <td>회원 탈퇴 후 30일</td>
                  </tr>
                  <tr>
                    <td>결제 정보 (카드사 제공 데이터)</td>
                    <td>구독 결제 처리</td>
                    <td>5년 (전자상거래법)</td>
                  </tr>
                  <tr>
                    <td>SNS 채널 연동 토큰</td>
                    <td>자동 발행 기능 제공</td>
                    <td>연동 해제 즉시 삭제</td>
                  </tr>
                  <tr>
                    <td>서비스 이용 기록, IP 주소</td>
                    <td>서비스 개선 및 부정 이용 방지</td>
                    <td>1년</td>
                  </tr>
                  <tr>
                    <td>업종, 키워드 입력 데이터</td>
                    <td>AI 콘텐츠 생성</td>
                    <td>회원 탈퇴 후 즉시 삭제</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-400 mt-2">
                * Google 소셜 로그인 이용 시 Google이 제공하는 이메일, 프로필 사진을 수집합니다.
              </p>
            </Section>

            <Section title="제2조 (개인정보의 수집 방법)">
              <ul>
                <li>회원가입 및 로그인 과정에서 이용자가 직접 입력</li>
                <li>Google 소셜 로그인을 통한 자동 수집</li>
                <li>서비스 이용 과정에서 자동 수집 (쿠키, 접속 로그 등)</li>
                <li>결제 서비스 이용 시 결제 대행사로부터 수집</li>
              </ul>
            </Section>

            <Section title="제3조 (개인정보의 이용 목적)">
              <ol>
                <li><strong>서비스 제공:</strong> 회원 관리, AI 콘텐츠 생성, SNS 자동 발행</li>
                <li><strong>결제 및 정산:</strong> 구독료 결제, 환불 처리</li>
                <li><strong>고객 지원:</strong> 문의 응대, 장애 처리, 공지 발송</li>
                <li><strong>서비스 개선:</strong> 이용 통계 분석, 신규 기능 개발</li>
                <li><strong>법적 의무 이행:</strong> 관련 법령에 따른 기록 보관</li>
              </ol>
            </Section>

            <Section title="제4조 (개인정보의 제3자 제공)">
              <p>
                회사는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.
                다만, 다음의 경우에는 예외로 합니다.
              </p>
              <ul>
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나 수사기관의 적법한 요청이 있는 경우</li>
              </ul>
              <p className="mt-3 font-semibold">위탁 처리 현황</p>
              <table>
                <thead>
                  <tr>
                    <th>수탁업체</th>
                    <th>위탁 업무</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Clerk Inc.</td>
                    <td>회원 인증 및 계정 관리</td>
                  </tr>
                  <tr>
                    <td>Anthropic (Claude API)</td>
                    <td>AI 콘텐츠 생성</td>
                  </tr>
                  <tr>
                    <td>Stripe / 카카오페이</td>
                    <td>결제 처리</td>
                  </tr>
                  <tr>
                    <td>Amazon Web Services</td>
                    <td>서버 및 데이터 저장</td>
                  </tr>
                  <tr>
                    <td>Vercel Inc.</td>
                    <td>웹 서비스 배포 및 운영</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <Section title="제5조 (개인정보의 보유 및 파기)">
              <ol>
                <li>회사는 개인정보 수집·이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</li>
                <li>
                  법령에 의해 보관해야 하는 경우 해당 기간 동안 보관 후 파기합니다.
                  <ul>
                    <li>계약·청약철회 기록: 5년 (전자상거래법)</li>
                    <li>대금 결제 및 재화 공급 기록: 5년</li>
                    <li>소비자 불만·분쟁 처리 기록: 3년</li>
                    <li>접속 로그: 3개월 (통신비밀보호법)</li>
                  </ul>
                </li>
                <li>전자적 파일은 복구 불가능한 방법으로 삭제하며, 서면 자료는 분쇄 또는 소각합니다.</li>
              </ol>
            </Section>

            <Section title="제6조 (이용자의 권리)">
              <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
              <ul>
                <li><strong>열람권:</strong> 보유 중인 개인정보 열람 요청</li>
                <li><strong>정정권:</strong> 부정확한 개인정보 정정 요청</li>
                <li><strong>삭제권:</strong> 개인정보 삭제 요청 (단, 법령 보관 의무가 있는 경우 제외)</li>
                <li><strong>처리정지권:</strong> 개인정보 처리 정지 요청</li>
              </ul>
              <p>
                위 권리 행사는 <strong>hello@autopost.kr</strong>로 이메일 문의하시거나,
                서비스 내 설정 → 계정 탈퇴 메뉴를 이용하실 수 있습니다.
                요청 수령 후 10일 이내에 처리합니다.
              </p>
            </Section>

            <Section title="제7조 (쿠키 사용)">
              <ol>
                <li>회사는 서비스 제공 및 이용자 편의를 위해 쿠키를 사용합니다.</li>
                <li>
                  사용 쿠키의 목적:
                  <ul>
                    <li>로그인 상태 유지</li>
                    <li>이용자 설정 저장 (언어, 테마 등)</li>
                    <li>서비스 이용 분석 (Mixpanel, Vercel Analytics)</li>
                  </ul>
                </li>
                <li>이용자는 브라우저 설정에서 쿠키 수집을 거부할 수 있으나, 이 경우 일부 서비스 이용이 제한될 수 있습니다.</li>
              </ol>
            </Section>

            <Section title="제8조 (개인정보 보호책임자)">
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1">
                <p><strong>개인정보 보호책임자</strong></p>
                <p>서비스명: AutoPost Korea</p>
                <p>이메일: hello@autopost.kr</p>
                <p>처리 시간: 평일 10:00 ~ 18:00 (주말·공휴일 제외)</p>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                개인정보 침해에 대한 신고·상담은 아래 기관에도 문의하실 수 있습니다.<br />
                • 개인정보보호위원회: privacy.go.kr / 국번없이 182<br />
                • 개인정보 침해신고센터: privacy.kisa.or.kr / 국번없이 118
              </p>
            </Section>

            <Section title="제9조 (방침의 변경)">
              <p>
                본 개인정보처리방침은 법령·정책 변경 또는 서비스 변경에 따라 수정될 수 있습니다.
                변경 시 시행 7일 전부터 서비스 내 공지사항 또는 이메일로 안내합니다.
              </p>
            </Section>

          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-between items-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← 홈으로 돌아가기
            </Link>
            <Link href="/terms" className="text-sm text-blue-600 font-medium hover:underline">
              이용약관 보기 →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
        {title}
      </h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed [&_table]:w-full [&_table]:border-collapse [&_th]:bg-gray-50 [&_th]:text-left [&_th]:px-3 [&_th]:py-2 [&_th]:text-xs [&_th]:font-semibold [&_th]:border [&_th]:border-gray-200 [&_td]:px-3 [&_td]:py-2 [&_td]:text-xs [&_td]:border [&_td]:border-gray-200">
        {children}
      </div>
    </div>
  );
}
