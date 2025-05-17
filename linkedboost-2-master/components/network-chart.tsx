"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", connections: 320 },
  { month: "Fév", connections: 332 },
  { month: "Mar", connections: 350 },
  { month: "Avr", connections: 365 },
  { month: "Mai", connections: 380 },
  { month: "Juin", connections: 400 },
  { month: "Juil", connections: 420 },
  { month: "Août", connections: 435 },
  { month: "Sep", connections: 450 },
  { month: "Oct", connections: 465 },
  { month: "Nov", connections: 480 },
  { month: "Déc", connections: 487 },
]

export function NetworkChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} domain={[300, 500]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <defs>
            <linearGradient id="colorConnections" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0077B5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0077B5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="connections" stroke="#0077B5" strokeWidth={2} fill="url(#colorConnections)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
