import Link from 'next/link'

export default function WelcomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-secondary font-semibold mb-2">처음 오시는 분들께</p>
        <h1 className="text-4xl font-bold text-primary mb-4">환영합니다</h1>
        <p className="text-gray-500 text-lg">강북 안디옥 교회에 오신 것을 진심으로 환영합니다.</p>
      </div>

      <div className="space-y-6">
        {/* 환영 메시지 */}
        <section className="bg-primary text-white rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-3">어떤 분이든 오세요</h2>
          <p className="text-blue-100 leading-relaxed">
            교회가 처음이신 분, 오랫동안 교회를 떠나 계셨던 분,
            하나님을 찾고 계신 분 — 누구든지 환영합니다.
            이곳은 판단 없이 있는 그대로의 당신을 환영하는 곳입니다.
          </p>
        </section>

        {/* 첫 방문 안내 */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4">첫 방문 시 참고하세요</h2>
          <ul className="space-y-3">
            {[
              '예배는 약 1시간 정도 진행됩니다.',
              '특별한 복장 규정은 없습니다. 편하게 오세요.',
              '예배 후 성도들과의 친교 시간이 있습니다.',
              '궁금한 점은 언제든지 교회로 문의해 주세요.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-gray-600">
                <span className="text-secondary font-bold shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 예배 안내 */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-3">예배 안내</h2>
          <p className="text-gray-600 mb-5">예배 시간과 장소를 확인하세요.</p>
          <Link
            href="/worship"
            className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors inline-block"
          >
            예배 일정 보기
          </Link>
        </section>

        {/* 복음 */}
        <section className="bg-secondary/10 border border-secondary/30 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-primary mb-3">복음에 대해 알고 싶으신가요?</h2>
          <p className="text-gray-600 mb-5">
            하나님의 사랑과 구원의 메시지를 4단계로 살펴보실 수 있습니다.
          </p>
          <Link
            href="/gospel"
            className="bg-secondary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary-dark transition-colors inline-block"
          >
            복음이란? →
          </Link>
        </section>

        {/* 오시는 길 */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm text-center">
          <h2 className="text-xl font-bold text-primary mb-3">오시는 길</h2>
          <p className="text-gray-600 mb-4">교회 위치와 교통편을 안내합니다.</p>
          <Link href="/location" className="text-primary font-medium hover:underline text-sm">
            오시는 길 보기 →
          </Link>
        </section>
      </div>
    </div>
  )
}
