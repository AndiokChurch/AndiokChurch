export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-primary mb-2">교회 소개</h1>
      <p className="text-gray-500 mb-10">강북 안디옥 교회에 오신 것을 환영합니다.</p>

      <div className="space-y-8">
        {/* 담임목사 소개 */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4">담임목사 소개</h2>
          <div className="flex gap-6 items-start">
            <div className="w-20 h-20 rounded-full bg-gray-100 shrink-0 flex items-center justify-center text-gray-400 text-sm">
              사진
            </div>
            <div className="text-gray-600 leading-relaxed space-y-1">
              <p className="font-semibold text-gray-800 text-lg">담임목사명 목사</p>
              <p className="text-sm text-gray-500">학력 및 이력 — (준비 중)</p>
              <p className="mt-2">
                말씀과 기도를 통해 성도들과 함께 하나님의 나라를 세워가기 위해 사역하고 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 비전 */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4">비전</h2>
          <p className="text-gray-600 leading-relaxed">
            강북 안디옥 교회는 <strong>말씀, 기도, 성령 충만한 예배</strong>를 통해 하나님의 나라를 세워가며,
            복음을 이 세대에 전하는 교회입니다.
          </p>
          <ul className="mt-4 space-y-2 text-gray-600 text-sm list-disc list-inside">
            <li>복음으로 세워지는 교회</li>
            <li>말씀과 기도로 성장하는 공동체</li>
            <li>세상을 향해 나아가는 선교 교회</li>
          </ul>
        </section>

        {/* 역사 */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4">역사</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-4">
              <span className="font-semibold text-primary shrink-0 w-16">년도</span>
              <span>교회 창립 — (준비 중)</span>
            </div>
            <div className="flex gap-4">
              <span className="font-semibold text-primary shrink-0 w-16">년도</span>
              <span>주요 사역 및 이정표 — (준비 중)</span>
            </div>
          </div>
        </section>

        {/* 오시는 길 */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4">오시는 길</h2>
          <div className="text-gray-600 space-y-2">
            <p><span className="font-medium">주소</span> — 서울특별시 강북구 (상세 주소 준비 중)</p>
            <p><span className="font-medium">전화</span> — (준비 중)</p>
            <p><span className="font-medium">대중교통</span> — (준비 중)</p>
          </div>
        </section>
      </div>
    </div>
  )
}
