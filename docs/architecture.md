# Architecture — 강북 안디옥 교회 홈페이지

> Agent 간 공유 컨텍스트 문서입니다. 컴포넌트/함수 추가·변경 시 즉시 업데이트하세요.

---

## 시스템 개요

```
[사용자 브라우저]
      │
      ▼
[Vercel Edge Network]
      │
      ▼
[Next.js 16 App Router]
  ├── /                  ← 홈 (예배 요약, 최근 설교, 공지사항, Hero CTA)
  ├── /gospel/           ← 복음 인터랙티브 (사영리 4단계 + 영접 기도)
  ├── /worship/          ← 예배 안내
  ├── /sermons/          ← 설교 목록
  ├── /announcements/    ← 공지사항
  ├── /location/         ← 오시는 길 (Kakao Maps 준비 중)
  ├── /about/            ← 교회 소개 (담임목사, 비전, 역사)
  └── /welcome/          ← 방문자 환영 페이지

app/
├── components/          ← Header, Footer, GospelViewer
├── lib/                 ← supabase.ts, types.ts
└── content/ko/          ← gospel-four-laws.json (정적 콘텐츠)
      │
      ▼
[Supabase DB]
  ├── worship_schedules
  ├── sermons
  ├── announcements
  └── admin_users        (미구현)
```

---

## 컴포넌트 / 함수 목록

| 이름 | 위치 | 역할 | 입력 | 출력 |
|------|------|------|------|------|
| `Header` | `components/Header.tsx` | 반응형 네비게이션 (`NAV_LINKS` 배열 기반) | 없음 | JSX |
| `Footer` | `components/Footer.tsx` | 교회 기본정보 푸터 | 없음 | JSX |
| `GospelViewer` | `components/GospelViewer.tsx` | 복음 슬라이드 인터랙티브 뷰어 | `{ data: GospelContent }` | JSX |
| `RootLayout` | `app/layout.tsx` | 루트 레이아웃, 메타데이터 | `{ children }` | JSX |
| `HomePage` | `app/page.tsx` | 홈 — 예배 요약, 최근 설교, 공지사항 | 없음 (Server) | JSX |
| `GospelPage` | `app/gospel/page.tsx` | JSON 로드 후 GospelViewer에 전달 | 없음 (Server) | JSX |
| `WorshipPage` | `app/worship/page.tsx` | 예배 일정 전체 목록 | 없음 (Server) | JSX |
| `SermonsPage` | `app/sermons/page.tsx` | 설교 목록 + 음성/영상 링크 | 없음 (Server) | JSX |
| `AnnouncementsPage` | `app/announcements/page.tsx` | 공지사항 목록 (고정 글 우선) | 없음 (Server) | JSX |
| `LocationPage` | `app/location/page.tsx` | 주소, 지도(준비중), 교통편 | 없음 (Server) | JSX |
| `AboutPage` | `app/about/page.tsx` | 담임목사, 비전, 역사, 오시는 길 | 없음 (Server) | JSX |
| `WelcomePage` | `app/welcome/page.tsx` | 방문자 환영, gospel/worship/location 링크 | 없음 (Server) | JSX |
| `getData` | `app/page.tsx` 내부 | Supabase 3개 테이블 병렬 조회 | 없음 | `{ worships, sermons, announcements }` |
| `supabase` | `lib/supabase.ts` | Supabase 클라이언트 싱글턴 | 없음 | `SupabaseClient` |

---

## UI/UX 컴포넌트

| 컴포넌트명 | 위치 | Props | 내부 상태 | 역할 |
|-----------|------|-------|----------|------|
| `Header` | `components/Header.tsx` | 없음 | `menuOpen: boolean` | 네비게이션, 모바일 햄버거 토글 |
| `Footer` | `components/Footer.tsx` | 없음 | 없음 | 교회명, 예배시간, 위치 요약 |
| `GospelViewer` | `components/GospelViewer.tsx` | `data: GospelContent` | `currentStep: number`, `showPrayer: boolean` | 단계별 슬라이드 네비게이션 |

---

## API 스펙

### 사용 외부 서비스

| 서비스 | 용도 | 환경변수 | 상태 |
|--------|------|---------|------|
| Supabase | DB 조회 (예배, 설교, 공지사항) | `NEXT_PUBLIC_SUPABASE_URL` `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 연동 완료 |
| Kakao Maps | 위치 페이지 지도 | `NEXT_PUBLIC_KAKAO_MAP_KEY` | 미연동 (B3) |
| Google Analytics | 방문자 분석 (선택) | `NEXT_PUBLIC_GA_ID` | 미연동 |

### Supabase 테이블 스키마

**worship_schedules**

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | string | PK |
| `type` | WorshipType | `'주일예배' \| '수요예배' \| '새벽기도' \| '금요기도'` |
| `day_of_week` | number | 0=일 … 6=토 |
| `time` | string | 예: `"오전 11:00"` |
| `location` | string | 예배 장소 |
| `description` | string? | 부가 설명 |
| `created_at` | string | ISO 8601 |

**sermons**

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | string | PK |
| `title` | string | 설교 제목 |
| `scripture` | string | 본문 말씀 |
| `preacher` | string | 설교자 이름 |
| `sermon_date` | string | 설교 날짜 |
| `description` | string? | 설교 요약 |
| `audio_url` | string? | 음성 파일 URL |
| `video_url` | string? | 영상 URL |
| `created_at` | string | ISO 8601 |

**announcements**

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | string | PK |
| `title` | string | 제목 |
| `content` | string | 본문 |
| `is_pinned` | boolean | 고정 글 여부 |
| `created_at` | string | ISO 8601 |

**admin_users** (미구현)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | string | PK |
| `email` | string | 관리자 이메일 |
| `created_at` | string | ISO 8601 |

### 내부 API 라우트

| 경로 | 메서드 | 역할 | 상태 |
|------|--------|------|------|
| — | — | 필요 시 추가 | — |

---

## 데이터 흐름

### Supabase 페이지 조회 흐름

```
사용자 요청
      │
      ▼
Next.js Server Component  (export const revalidate = 60)
      │
      ▼
lib/supabase.ts → Supabase Client
      │
      ├── worship_schedules ──→ WorshipPage, HomePage
      ├── sermons           ──→ SermonsPage, HomePage (최근 3편)
      └── announcements     ──→ AnnouncementsPage, HomePage (최근 3건)
      │
      ▼
JSX 렌더링 → Vercel Edge 캐시 → 브라우저
```

### ISR (Incremental Static Regeneration)

```
최초 요청  → Supabase 조회 → 응답 + 캐시 저장
60초 이내  → 캐시 반환 (Supabase 조회 없음)
60초 이후  → 캐시된 응답 반환 + 백그라운드 재생성
```

### 복음 페이지 데이터 흐름

```
URL: /gospel
      │
      ▼
app/gospel/page.tsx  (Server Component)
      │
      ├── content/ko/gospel-four-laws.json  ← 사영리 데이터
      │
      ▼
GospelViewer (Client Component)
  ├── 진행 표시바 (currentStep / totalSteps)
  ├── GospelSlide (제목, 본문, 성경 구절)
  └── GospelNavigation (이전/다음 버튼)
        └── [마지막 단계] → 영접 기도 화면 → /welcome CTA
```

---

## TypeScript 타입 현황 (`lib/types.ts`)

```typescript
type WorshipType = '주일예배' | '수요예배' | '새벽기도' | '금요기도'

interface WorshipSchedule { id, type, day_of_week, time, location, description?, created_at }
interface Sermon          { id, title, scripture, preacher, sermon_date, description?, audio_url?, video_url?, created_at }
interface Announcement    { id, title, content, is_pinned, created_at }
interface AdminUser       { id, email, created_at }           // 미구현
interface GospelStep      { id, title, subtitle, body, verse?: { text, reference } }
interface GospelContent   { type, title, steps: GospelStep[], prayer: { title, content } }
```

---

## 정적 콘텐츠 스키마 (`content/ko/`)

```
content/
└── ko/
    └── gospel-four-laws.json   ← GospelContent 타입
```

향후 추가 예정:
- `content/en/gospel-four-laws.json` (i18n 적용 시)
- `content/ko/gospel-bridge.json` (생명의 다리)

---

## LLM 활용 지점

> 현재 버전에서는 LLM을 직접 사용하지 않습니다.
> 향후 추가 가능한 기능:
> - 방문자 Q&A 챗봇
> - 설교 요약 자동 생성

---

## 테스트 현황

| 영역 | 방식 | 커버리지 | 상태 |
|------|------|---------|------|
| Supabase 데이터 조회 | — | — | 미시작 |
| 복음 슬라이드 네비게이션 | Playwright E2E | — | 미시작 |
| 반응형 레이아웃 | 수동 + Playwright | — | 미시작 |
| 접근성 (Lighthouse) | 자동화 | 목표 90+ | 미시작 |

---

## 최근 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2026-05-03 | 초안 작성 (아키텍처 뼈대) |
| 2026-05-03 | /gospel, /location, /welcome 페이지 구현 |
| 2026-05-03 | GospelViewer 클라이언트 컴포넌트, GospelContent 타입 추가 |
| 2026-05-03 | Header 전체 메뉴 업데이트 (7개 항목 + CTA 버튼) |
