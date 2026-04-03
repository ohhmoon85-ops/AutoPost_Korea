import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "이용약관 | AutoPost Korea",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-10">
            <p className="text-sm text-blue-600 font-medium mb-2">법적 고지</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">이용약관</h1>
            <p className="text-sm text-gray-400">시행일: 2026년 4월 1일 · 최종 업데이트: 2026년 4월 1일</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-8">

            <Section title="제1조 (목적)">
              <p>
                본 약관은 AutoPost Korea(이하 "회사")가 제공하는 소상공인 SNS 콘텐츠 자동화
                서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리·의무 및 책임사항,
                기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </Section>

            <Section title="제2조 (정의)">
              <ul>
                <li><strong>"서비스"</strong>란 회사가 제공하는 AI 기반 SNS 콘텐츠 생성, 예약 발행, 성과 분석 플랫폼을 의미합니다.</li>
                <li><strong>"이용자"</strong>란 본 약관에 동의하고 서비스를 이용하는 개인 또는 사업자를 의미합니다.</li>
                <li><strong>"계정"</strong>이란 서비스 이용을 위해 이용자가 생성한 고유한 식별 정보를 의미합니다.</li>
                <li><strong>"콘텐츠"</strong>란 서비스를 통해 생성되는 텍스트, 해시태그 등 모든 결과물을 의미합니다.</li>
              </ul>
            </Section>

            <Section title="제3조 (약관의 효력 및 변경)">
              <ol>
                <li>본 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.</li>
                <li>회사는 관련 법령을 위반하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.</li>
                <li>약관 변경 시 회사는 변경 내용을 서비스 내 공지사항 또는 이메일로 최소 7일 전에 공지합니다.</li>
                <li>이용자가 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 계정을 삭제할 수 있습니다.</li>
              </ol>
            </Section>

            <Section title="제4조 (서비스 이용)">
              <ol>
                <li>서비스는 만 14세 이상의 개인 또는 사업자가 이용할 수 있습니다.</li>
                <li>이용자는 회원가입 시 정확한 정보를 제공해야 하며, 정보 변경 시 즉시 업데이트해야 합니다.</li>
                <li>하나의 계정은 한 명의 이용자만 사용할 수 있으며, 계정 공유는 금지됩니다.</li>
                <li>이용자는 자신의 계정 및 비밀번호를 안전하게 관리해야 하며, 이를 소홀히 하여 발생하는 피해는 이용자가 책임집니다.</li>
              </ol>
            </Section>

            <Section title="제5조 (요금제 및 결제)">
              <ol>
                <li>서비스는 무료 체험 기간(14일) 이후 유료 구독 방식으로 운영됩니다.</li>
                <li>요금제별 기능 및 가격은 서비스 내 요금제 안내 페이지를 기준으로 합니다.</li>
                <li>구독료는 매월 또는 매년 자동으로 결제되며, 결제 수단은 신용카드 및 카카오페이 등을 지원합니다.</li>
                <li>구독은 언제든지 해지할 수 있으며, 해지 시 현재 결제 주기 만료일까지 서비스를 이용할 수 있습니다.</li>
                <li>환불은 서비스 이용 후 7일 이내에 요청할 수 있으며, 콘텐츠 생성 기능을 5회 이상 사용한 경우 환불이 제한될 수 있습니다.</li>
              </ol>
            </Section>

            <Section title="제6조 (서비스의 제한 및 중단)">
              <ol>
                <li>회사는 다음의 경우 서비스 이용을 제한하거나 계정을 해지할 수 있습니다.
                  <ul>
                    <li>허위 정보로 가입한 경우</li>
                    <li>스팸, 허위 광고, 불법 콘텐츠 생성에 서비스를 이용하는 경우</li>
                    <li>타인의 계정을 도용하거나 서비스 시스템을 해킹하는 경우</li>
                    <li>요금을 정당한 이유 없이 납부하지 않는 경우</li>
                  </ul>
                </li>
                <li>회사는 시스템 점검, 업그레이드 등의 사유로 서비스를 일시 중단할 수 있으며, 이 경우 사전에 공지합니다.</li>
              </ol>
            </Section>

            <Section title="제7조 (콘텐츠의 소유권 및 책임)">
              <ol>
                <li>서비스를 통해 생성된 콘텐츠의 저작권은 이용자에게 귀속됩니다.</li>
                <li>이용자는 생성된 콘텐츠를 SNS에 게시하기 전 내용의 정확성, 적절성을 직접 확인해야 합니다.</li>
                <li>AI가 생성한 콘텐츠로 인해 발생하는 법적 분쟁(저작권 침해, 허위 광고 등)에 대한 책임은 이용자에게 있습니다.</li>
                <li>회사는 이용자가 서비스에 입력하는 키워드, 업종 정보 등을 서비스 품질 개선에 활용할 수 있습니다.</li>
              </ol>
            </Section>

            <Section title="제8조 (면책 조항)">
              <ol>
                <li>회사는 AI 생성 콘텐츠의 완전성, 정확성을 보증하지 않으며, 콘텐츠 활용 결과에 대한 책임을 지지 않습니다.</li>
                <li>회사는 SNS 플랫폼(인스타그램, 네이버 등)의 정책 변경으로 인한 서비스 장애에 대해 책임을 지지 않습니다.</li>
                <li>천재지변, 불가항력적 사유로 인한 서비스 중단에 대해 회사는 책임을 지지 않습니다.</li>
              </ol>
            </Section>

            <Section title="제9조 (분쟁 해결)">
              <ol>
                <li>본 약관과 관련한 분쟁은 대한민국 법령을 준거법으로 합니다.</li>
                <li>서비스 이용과 관련한 분쟁이 발생한 경우 회사와 이용자는 원만한 해결을 위해 협의합니다.</li>
                <li>협의가 이루어지지 않을 경우 관할 법원은 서울중앙지방법원으로 합니다.</li>
              </ol>
            </Section>

            <Section title="제10조 (연락처)">
              <p>
                이용약관에 관한 문의사항은 아래로 연락해 주시기 바랍니다.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm">
                <p><strong>서비스명:</strong> AutoPost Korea</p>
                <p><strong>이메일:</strong> hello@autopost.kr</p>
              </div>
            </Section>

          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-between items-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← 홈으로 돌아가기
            </Link>
            <Link href="/privacy" className="text-sm text-blue-600 font-medium hover:underline">
              개인정보처리방침 보기 →
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
      <div className="text-sm text-gray-600 leading-relaxed space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed">
        {children}
      </div>
    </div>
  );
}
