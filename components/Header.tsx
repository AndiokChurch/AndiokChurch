'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/gospel', label: '복음이란?' },
  { href: '/worship', label: '예배 안내' },
  { href: '/sermons', label: '설교' },
  { href: '/announcements', label: '공지사항' },
  { href: '/location', label: '오시는 길' },
  { href: '/about', label: '교회 소개' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight shrink-0">
          강북 안디옥 교회
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-secondary transition-colors">
              {label}
            </Link>
          ))}
          <Link
            href="/welcome"
            className="bg-secondary text-white px-4 py-1.5 rounded-full hover:bg-secondary-dark transition-colors"
          >
            처음 오시나요?
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-primary-dark px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="pt-2 hover:text-secondary transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/welcome"
            onClick={() => setMenuOpen(false)}
            className="mt-1 bg-secondary text-white px-4 py-2 rounded-full text-center hover:bg-secondary-dark transition-colors"
          >
            처음 오시나요?
          </Link>
        </div>
      )}
    </header>
  )
}
