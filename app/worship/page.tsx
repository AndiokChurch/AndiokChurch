import { supabase } from '@/lib/supabase'
import type { WorshipSchedule } from '@/lib/types'

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

export const revalidate = 60

export default async function WorshipPage() {
  const { data } = await supabase
    .from('worship_schedules')
    .select('*')
    .order('day_of_week')

  const worships = (data ?? []) as WorshipSchedule[]

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-primary mb-2">예배 안내</h1>
      <p className="text-gray-500 mb-10">강북 안디옥 교회 예배 일정을 안내합니다.</p>

      {worships.length === 0 ? (
        <p className="text-gray-400 text-center py-20">등록된 예배 일정이 없습니다.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {worships.map((w) => (
            <div key={w.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {w.type}
                </span>
              </div>
              <div className="text-gray-700 space-y-1">
                <p><span className="font-medium">시간</span> — {DAY_NAMES[w.day_of_week]}요일 {w.time}</p>
                <p><span className="font-medium">장소</span> — {w.location}</p>
                {w.description && <p className="text-gray-500 text-sm mt-2">{w.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
