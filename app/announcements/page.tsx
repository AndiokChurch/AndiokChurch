import { supabase } from '@/lib/supabase'
import type { Announcement } from '@/lib/types'

export const revalidate = 60

export default async function AnnouncementsPage() {
  const { data } = await supabase
    .from('announcements')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  const announcements = (data ?? []) as Announcement[]

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-primary mb-2">공지사항</h1>
      <p className="text-gray-500 mb-10">교회 소식 및 행사 안내입니다.</p>

      {announcements.length === 0 ? (
        <p className="text-gray-400 text-center py-20">등록된 공지사항이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                {a.is_pinned && (
                  <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">고정</span>
                )}
                <h2 className="font-bold text-gray-800">{a.title}</h2>
                <span className="ml-auto text-gray-400 text-xs shrink-0">{a.created_at.slice(0, 10)}</span>
              </div>
              <p className="text-gray-600 text-sm whitespace-pre-line">{a.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
