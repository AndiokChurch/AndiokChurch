/**
 * 강북 안디옥 교회 홈페이지 데모 영상 녹화 스크립트
 * 실행: node scripts/record-demo.mjs
 * 출력: demo-video/demo.webm → demo-video/demo.mp4 (ffmpeg 필요)
 */

import { chromium } from 'playwright'
import { execSync } from 'child_process'
import { readdirSync, renameSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'http://localhost:3000'
const VIDEO_DIR = path.join(__dirname, '..', 'demo-video')

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

async function scrollDown(page, steps = 3) {
  for (let i = 0; i < steps; i++) {
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }))
    await wait(600)
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  await wait(400)
}

async function recordDemo() {
  console.log('🎬 녹화 시작...')

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1280, height: 720 },
    },
    deviceScaleFactor: 1,
  })

  const page = await context.newPage()

  // ─── 홈 페이지 ───────────────────────────────────────────
  console.log('  📄 홈 페이지')
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await wait(2000)
  await scrollDown(page, 4)
  await wait(1000)

  // ─── 복음 인터랙티브 ─────────────────────────────────────
  console.log('  ✝️  복음 페이지')
  await page.goto(`${BASE_URL}/gospel`, { waitUntil: 'networkidle' })
  await wait(1500)

  for (let step = 1; step <= 3; step++) {
    await page.click('button:has-text("다음")')
    await wait(1800)
  }
  // 마지막 단계 → 영접 기도
  await page.click('button:has-text("영접 기도")')
  await wait(2500)

  // ─── 방문자 환영 ─────────────────────────────────────────
  console.log('  👋 방문자 환영 페이지')
  await page.goto(`${BASE_URL}/welcome`, { waitUntil: 'networkidle' })
  await wait(1500)
  await scrollDown(page, 3)
  await wait(800)

  // ─── 예배 안내 ───────────────────────────────────────────
  console.log('  ⛪ 예배 안내 페이지')
  await page.goto(`${BASE_URL}/worship`, { waitUntil: 'networkidle' })
  await wait(1500)
  await scrollDown(page, 2)
  await wait(800)

  // ─── 설교 ────────────────────────────────────────────────
  console.log('  📖 설교 페이지')
  await page.goto(`${BASE_URL}/sermons`, { waitUntil: 'networkidle' })
  await wait(1500)
  await scrollDown(page, 2)
  await wait(800)

  // ─── 공지사항 ────────────────────────────────────────────
  console.log('  📌 공지사항 페이지')
  await page.goto(`${BASE_URL}/announcements`, { waitUntil: 'networkidle' })
  await wait(1500)
  await scrollDown(page, 2)
  await wait(800)

  // ─── 오시는 길 ───────────────────────────────────────────
  console.log('  📍 오시는 길 페이지')
  await page.goto(`${BASE_URL}/location`, { waitUntil: 'networkidle' })
  await wait(1500)
  await scrollDown(page, 2)
  await wait(800)

  // ─── 교회 소개 ───────────────────────────────────────────
  console.log('  🏛  교회 소개 페이지')
  await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' })
  await wait(1500)
  await scrollDown(page, 3)
  await wait(800)

  // ─── 모바일 뷰 (Home) ────────────────────────────────────
  console.log('  📱 모바일 뷰')
  await context.close() // 데스크탑 컨텍스트 종료 (webm 저장)

  // webm 파일 이름 확인
  const files = readdirSync(VIDEO_DIR).filter((f) => f.endsWith('.webm'))
  if (files.length === 0) {
    console.error('❌ 녹화 파일을 찾을 수 없습니다.')
    await browser.close()
    return
  }

  const webmPath = path.join(VIDEO_DIR, files[0])
  const renamedWebm = path.join(VIDEO_DIR, 'demo.webm')
  if (webmPath !== renamedWebm) renameSync(webmPath, renamedWebm)

  console.log(`\n✅ webm 저장 완료: demo-video/demo.webm`)

  // ─── MP4 변환 ────────────────────────────────────────────
  try {
    execSync('which ffmpeg', { stdio: 'ignore' })
    const mp4Path = path.join(VIDEO_DIR, 'demo.mp4')
    console.log('🔄 MP4 변환 중...')
    execSync(
      `ffmpeg -y -i "${renamedWebm}" -vcodec libx264 -crf 23 -preset fast -acodec aac "${mp4Path}"`,
      { stdio: 'pipe' }
    )
    console.log('✅ MP4 변환 완료: demo-video/demo.mp4')
  } catch {
    console.log('ℹ️  ffmpeg 미설치 — webm 파일로 공유하세요 (Chrome/Edge에서 재생 가능)')
  }

  await browser.close()
  console.log('\n🎉 녹화 완료!')
}

recordDemo().catch((e) => {
  console.error('녹화 중 오류:', e)
  process.exit(1)
})
