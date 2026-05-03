import { supabase } from '@/lib/supabase'
import type { Sermon } from '@/lib/types'

export const revalidate = 60

export default async function SermonsPage() {
  const { data } = await supabase
    .from('sermons')
    .select('*')
    .order('sermon_date', { ascending: false })

  const sermons = (data ?? []) as Sermon[]

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-primary mb-2">설교</h1>
      <p className="text-gray-500 mb-10">말씀을 통해 은혜를 나눕니다.</p>

      {sermons.length === 0 ? (
        <p className="text-gray-400 text-center py-20">등록된 설교가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {sermons.map((s) => (
            <div key={s.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-secondary text-xs font-semibold mb-1">{s.sermon_date}</div>
                  <h2 className="font-bold text-gray-800 text-lg mb-1">{s.title}</h2>
                  <p className="text-gray-500 text-sm">{s.scripture} · {s.preacher} 목사</p>
                  {s.description && <p className="text-gray-400 text-sm mt-2 line-clamp-2">{s.description}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  {s.audio_url && (
                    <a href={s.audio_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs bg-primary text-white px-3 py-1.5 rounded-full hover:bg-primary-dark transition-colors">
                      음성
                    </a>
                  )}
                  {s.video_url && (
                    <a href={s.video_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs bg-secondary text-white px-3 py-1.5 rounded-full hover:bg-secondary-dark transition-colors">
                      영상
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
