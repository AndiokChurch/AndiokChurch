# CLAUDE.md — 강북 안디옥 교회 홈페이지

> 프로젝트 헌법입니다. 모든 작업 전 반드시 읽으세요.
> 상세 아키텍처 → `docs/architecture.md` / 작업 현황 → `docs/task.md`

---

## 1. 프로젝트 개요

강북 안디옥 교회 공식 웹 홈페이지.
방문자에게 복음을 전하고, 교회 정보(예배·설교·공지·소개)를 제공한다.

**기술 스택**

```
Frontend:  Next.js 16 (App Router) + TypeScript
Styling:   Tailwind CSS v4 + CSS Variables
Backend:   Supabase (기존 Expo 앱과 DB 공유)
배포:      Vercel
```

---

## 2. 문서 구조

| 파일 | 역할 |
|------|------|
| `CLAUDE.md` | 프로젝트 헌법 — 규칙·컨벤션·설정 |
| `docs/architecture.md` | 컴포넌트 목록, API 스펙, 데이터 흐름 |
| `docs/task.md` | 작업 보드 — 스프린트·백로그·블로킹 이슈 |

> 컴포넌트 추가·변경 시 `docs/architecture.md`를 즉시 업데이트하세요.
> 새 작업 시작·완료 시 `docs/task.md`를 즉시 업데이트하세요.

---

## 3. 디렉토리 구조

```
app/
  layout.tsx              # 루트 레이아웃 — Header, Footer
  page.tsx                # 홈
  globals.css             # Tailwind 진입점 + CSS 변수
  gospel/page.tsx         # 복음 인터랙티브
  worship/page.tsx        # 예배 안내
  sermons/page.tsx        # 설교 목록
  announcements/page.tsx  # 공지사항
  location/page.tsx       # 오시는 길
  about/page.tsx          # 교회 소개
  welcome/page.tsx        # 방문자 환영

components/
  Header.tsx              # 반응형 네비게이션 (NAV_LINKS 배열 기반)
  Footer.tsx              # 푸터
  GospelViewer.tsx        # 복음 슬라이드 클라이언트 컴포넌트

lib/
  supabase.ts             # Supabase 클라이언트 싱글턴
  types.ts                # 공통 TypeScript 타입

content/
  ko/
    gospel-four-laws.json # 사영리 콘텐츠 (GospelContent 타입)

docs/
  architecture.md         # 아키텍처 문서
  task.md                 # 작업 보드

public/                   # 정적 파일 (이미지 등)
```

---

## 4. 페이지 구성

| 경로 | 설명 | 데이터 소스 |
|------|------|-----------|
| `/` | 예배 요약, 최근 설교 3편, 공지사항 3건 | Supabase |
| `/gospel` | 복음 인터랙티브 (사영리 4단계 + 영접 기도) | JSON (정적) |
| `/worship` | 예배 일정 전체 목록 | Supabase |
| `/sermons` | 설교 전체 목록 (음성/영상 링크 포함) | Supabase |
| `/announcements` | 공지사항 전체 (고정 글 우선) | Supabase |
| `/location` | 주소, 지도, 대중교통 | 정적 (Kakao Maps 준비 중) |
| `/about` | 담임목사, 비전, 역사 | 정적 (실제 정보 입력 대기) |
| `/welcome` | 방문자 환영, gospel/worship/location 링크 | 정적 |

---

## 5. 개발 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 검사 (next lint)
```

---

## 6. 환경 변수 (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# 아래는 미사용 (구현 후 추가)
# NEXT_PUBLIC_KAKAO_MAP_KEY=...
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

`.env.local`은 절대 git에 커밋하지 않는다.

---

## 7. 디자인 시스템

### 색상 (`globals.css` → Tailwind 유틸리티)

| CSS 변수 | 값 | 클래스 예시 | 용도 |
|----------|----|------------|------|
| `--color-primary` | `#1B3A6B` | `bg-primary` `text-primary` | 헤더, 제목, 주요 버튼 |
| `--color-primary-dark` | `#162f58` | `hover:bg-primary-dark` | 호버 |
| `--color-secondary` | `#C9A84C` | `bg-secondary` `text-secondary` | 강조, 태그, CTA |
| `--color-secondary-dark` | `#b8943f` | `hover:bg-secondary-dark` | 호버 |

**하드코딩된 hex 값 (`bg-[#1B3A6B]`) 사용 금지.**

### 반응형

| 범위 | 설명 |
|------|------|
| 기본 (< 768px) | 모바일, 1열 |
| `md:` (768px+) | 데스크탑, 다열 |

---

## 8. 코딩 컨벤션

- **Server Component 기본.** 클라이언트 상태 필요 시에만 `'use client'` 추가
- 컴포넌트: `PascalCase` / 훅: `use` 접두사 / 유틸: `camelCase`
- 주석: 이유가 불명확한 코드에만 작성
- 새 타입 추가 시 → `lib/types.ts` + `docs/architecture.md` 동시 업데이트
- 새 컴포넌트 추가 시 → `docs/architecture.md` 컴포넌트 테이블 업데이트

---

## 9. 배포

- GitHub → Vercel 자동 배포 (`main` 브랜치)
- 배포 전 `npm run build` 성공 확인
- Vercel 대시보드에서 환경변수 등록 필요

---

## 10. 사용자 승인 필요 항목

아래 항목은 담당자 확인 후 반영한다. (`docs/task.md` B1, B2, B3 참조)

- 담임목사 이름 및 소개 문구
- 교회 비전·역사 문구
- 예배 시간, 주소, 전화 등 공식 정보
- Kakao Maps API 키 발급

---

## 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2026-05-03 | 초안 작성 |
| 2026-05-03 | CSS 변수 시스템 적용, about 페이지 구조 개선 |
| 2026-05-03 | 실제 구현 기준으로 전면 재작성 |
| 2026-05-03 | /gospel, /location, /welcome 구현; docs/ 구조 추가 |
