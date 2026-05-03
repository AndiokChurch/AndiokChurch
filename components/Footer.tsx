export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">강북 안디옥 교회</h3>
          <p className="text-sm text-blue-200">Gangbuk Antioch Church</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-secondary">주일 예배</h4>
          <p className="text-sm text-blue-200">오전 11:00</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-secondary">위치</h4>
          <p className="text-sm text-blue-200">서울특별시 강북구</p>
        </div>
      </div>
      <div className="border-t border-blue-800 text-center text-xs text-blue-300 py-4">
        © {new Date().getFullYear()} 강북 안디옥 교회. All rights reserved.
      </div>
    </footer>
  )
}
