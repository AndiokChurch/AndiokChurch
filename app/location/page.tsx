export default function LocationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-primary mb-2">오시는 길</h1>
      <p className="text-gray-500 mb-10">강북 안디옥 교회 위치 안내입니다.</p>

      <div className="space-y-8">
        {/* 주소 */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4">주소</h2>
          <p className="text-gray-800 text-lg font-medium mb-1">
            서울특별시 강북구 (상세 주소 준비 중)
          </p>
          <p className="text-gray-400 text-sm">담당자 확인 후 업데이트 예정</p>
        </section>

        {/* 지도 */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4">지도</h2>
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="font-semibold mb-1">Kakao Maps</p>
              <p className="text-sm">
                <code className="bg-gray-100 px-1 rounded text-xs">NEXT_PUBLIC_KAKAO_MAP_KEY</code>{' '}
                환경변수 설정 후 활성화됩니다
              </p>
            </div>
          </div>
        </section>

        {/* 대중교통 */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-5">대중교통</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">지하철</span>
              </div>
              <p className="text-gray-500 text-sm">(준비 중)</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded">버스</span>
              </div>
              <p className="text-gray-500 text-sm">(준비 중)</p>
            </div>
          </div>
        </section>

        {/* 주차 */}
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4">주차 안내</h2>
          <p className="text-gray-500 text-sm">(준비 중)</p>
        </section>
      </div>
    </div>
  )
}
