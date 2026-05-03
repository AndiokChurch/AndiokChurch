import GospelViewer from '@/components/GospelViewer'
import gospelData from '@/content/ko/gospel-four-laws.json'
import type { GospelContent } from '@/lib/types'

export const metadata = {
  title: '복음이란? | 강북 안디옥 교회',
  description: '하나님의 사랑과 구원의 메시지를 4단계로 살펴보세요.',
}

export default function GospelPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GospelViewer data={gospelData as GospelContent} />
    </div>
  )
}
