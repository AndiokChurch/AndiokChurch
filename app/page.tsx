import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Sermon, Announcement, WorshipSchedule } from '@/lib/types'

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

async function getData() {
  const [{ data: worships }, { data: sermons }, { data: announcements }] = await Promise.all([
    supabase.from('worship_schedules').select('*').order('day_of_week'),
    supabase.from('sermons').select('*').order('sermon_date', { ascending: false }).limit(3),
    supabase.from('announcements').select('*').order('is_pinned', { ascending: false }).order('created_at', { ascending: false }).limit(3),
  ])
  return {
    worships: (worships ?? []) as WorshipSchedule[],
    sermons: (sermons ?? []) as Sermon[],
    announcements: (announcements ?? []) as Announcement[],
  }
}

export const revalidate = 60

export default async function HomePage() {
  const { worships, sermons, announcements } = await getData()

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">강북 안디옥 교회</h1>
        <p className="text-blue-200 text-lg md:text-xl mb-8">말씀과 기도로 세워지는 교회</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/worship" className="bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary-dark transition-colors">
            예배 안내
          </Link>
          <Link href="/welcome" className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors">
            처음 오시나요?
          </Link>
          <Link href="/gospel" className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            복음이란?
          </Link>
        </div>
      </section>

      {/* 예배 일정 요약 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">예배 안내</h2>
        {worships.length === 0 ? (
          <p className="text-center text-gray-400">등록된 예배 일정이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {worships.map((w) => (
              <div key={w.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm text-center">
                <div className="text-secondary font-bold text-sm mb-1">{w.type}</div>
                <div className="text-primary font-semibold">{DAY_NAMES[w.day_of_week]}요일</div>
                <div className="text-gray-600 text-sm mt-1">{w.time}</div>
                <div className="text-gray-400 text-xs mt-1">{w.location}</div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-6">
          <Link href="/worship" className="text-primary font-medium hover:underline text-sm">
            전체 예배 일정 보기 →
          </Link>
        </div>
      </section>

      {/* 최근 설교 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">최근 설교</h2>
          {sermons.length === 0 ? (
            <p className="text-center text-gray-400">등록된 설교가 없습니다.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {sermons.map((s) => (
                <div key={s.id} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-secondary text-xs font-semibold mb-2">{s.sermon_date}</div>
                  <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm mb-1">{s.scripture}</p>
                  <p className="text-gray-400 text-xs">{s.preacher} 목사</p>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-6">
            <Link href="/sermons" className="text-primary font-medium hover:underline text-sm">
              설교 전체 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* 공지사항 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">공지사항</h2>
        {announcements.length === 0 ? (
          <p className="text-center text-gray-400">등록된 공지사항이 없습니다.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {announcements.map((a) => (
              <li key={a.id} className="py-4 flex items-center gap-3">
                {a.is_pinned && (
                  <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full shrink-0">고정</span>
                )}
                <span className="font-medium text-gray-800 flex-1">{a.title}</span>
                <span className="text-gray-400 text-xs shrink-0">{a.created_at.slice(0, 10)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="text-center mt-6">
          <Link href="/announcements" className="text-primary font-medium hover:underline text-sm">
            공지사항 전체 보기 →
          </Link>
        </div>
      </section>
    </div>
  )
}
