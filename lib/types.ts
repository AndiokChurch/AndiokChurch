export type WorshipType = '주일예배' | '수요예배' | '새벽기도' | '금요기도'

export interface WorshipSchedule {
  id: string
  type: WorshipType
  day_of_week: number
  time: string
  location: string
  description: string | null
  created_at: string
}

export interface Sermon {
  id: string
  title: string
  scripture: string
  preacher: string
  sermon_date: string
  description: string | null
  audio_url: string | null
  video_url: string | null
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  is_pinned: boolean
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  created_at: string
}

export interface GospelStep {
  id: number
  title: string
  subtitle: string
  body: string
  verse?: {
    text: string
    reference: string
  }
}

export interface GospelContent {
  type: 'four-laws' | 'bridge'
  title: string
  steps: GospelStep[]
  prayer: {
    title: string
    content: string
  }
}
