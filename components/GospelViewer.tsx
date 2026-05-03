'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { GospelContent } from '@/lib/types'

export default function GospelViewer({ data }: { data: GospelContent }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showPrayer, setShowPrayer] = useState(false)

  const steps = data.steps
  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (isLastStep) setShowPrayer(true)
    else setCurrentStep(prev => prev + 1)
  }

  const handlePrev = () => {
    if (showPrayer) setShowPrayer(false)
    else setCurrentStep(prev => prev - 1)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">{data.title}</h1>
      </div>

      {/* 진행 표시 */}
      {!showPrayer && (
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
            <div
              className="bg-secondary h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                  i < currentStep
                    ? 'bg-secondary text-white'
                    : i === currentStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {s.id}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 슬라이드 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-72">
        {showPrayer ? (
          <div className="text-center">
            <div className="text-secondary text-sm font-semibold mb-2">영접 기도</div>
            <h2 className="text-2xl font-bold text-primary mb-6">{data.prayer.title}</h2>
            <div className="bg-primary/5 rounded-xl p-6 text-left">
              <p className="text-gray-700 leading-relaxed text-lg italic">{data.prayer.content}</p>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              이 기도를 진심으로 드리셨다면, 예수님께서 당신의 마음에 들어오셨습니다.
            </p>
          </div>
        ) : (
          <div>
            <div className="text-secondary text-sm font-semibold mb-2">{step.subtitle}</div>
            <h2 className="text-2xl font-bold text-primary mb-4">{step.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{step.body}</p>
            {step.verse && (
              <blockquote className="border-l-4 border-secondary pl-5">
                <p className="text-gray-700 italic mb-1">"{step.verse.text}"</p>
                <cite className="text-secondary text-sm font-semibold not-italic">
                  — {step.verse.reference}
                </cite>
              </blockquote>
            )}
          </div>
        )}
      </div>

      {/* 네비게이션 버튼 */}
      <div className="flex justify-between items-center mt-6">
        {currentStep > 0 || showPrayer ? (
          <button
            onClick={handlePrev}
            className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors"
          >
            ← 이전
          </button>
        ) : (
          <div />
        )}

        {showPrayer ? (
          <div className="flex gap-3">
            <button
              onClick={() => { setCurrentStep(0); setShowPrayer(false) }}
              className="border border-primary text-primary px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              처음부터
            </button>
            <Link
              href="/welcome"
              className="bg-secondary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary-dark transition-colors"
            >
              교회 방문 안내 →
            </Link>
          </div>
        ) : (
          <button
            onClick={handleNext}
            className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            {isLastStep ? '영접 기도 →' : '다음 →'}
          </button>
        )}
      </div>
    </div>
  )
}
