"use client"

import { useEffect, useState } from "react"

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  label?: string
  sublabel?: string
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
}: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedValue / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100)
    return () => clearTimeout(timer)
  }, [value])

  // Calculate needle angle (start from bottom-left, sweep to bottom-right)
  const needleAngle = -90 + (animatedValue / 100) * 360
  const needleLength = radius - 8
  const cx = size / 2
  const cy = size / 2
  const needleX = cx + needleLength * Math.cos((needleAngle * Math.PI) / 180)
  const needleY = cy + needleLength * Math.sin((needleAngle * Math.PI) / 180)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-secondary"
          />
          {/* Progress arc */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c6f135" />
              <stop offset="100%" stopColor="#84cc16" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center needle dot */}
        <div
          className="absolute rounded-full bg-primary"
          style={{
            width: 10,
            height: 10,
            left: needleX - 5 + (size - size) / 2,
            top: needleY - 5 + (size - size) / 2,
            transform: "rotate(90deg)",
            transformOrigin: `${cx - needleX + 5}px ${cy - needleY + 5}px`,
            transition: "all 1s ease-out",
          }}
        />
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">
            {animatedValue.toFixed(0)}
            <span className="text-lg text-muted-foreground">,</span>
            <span className="text-xl">
              {((value % 1) * 100).toFixed(0).padStart(2, "0")}
            </span>
            <span className="text-sm text-primary">%</span>
          </span>
        </div>
      </div>
      {label && (
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      )}
      {sublabel && (
        <span className="text-[10px] text-muted-foreground/60">{sublabel}</span>
      )}
    </div>
  )
}
