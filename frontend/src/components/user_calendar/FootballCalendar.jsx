"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, Trophy } from "lucide-react"
import Button from "../button/button"

// Primer datuma utakmica
const matchDates = [
  { date: "2024-12-15", opponent: "Partizan", time: "20:00" },
  { date: "2024-12-22", opponent: "Crvena Zvezda", time: "18:30" },
  { date: "2024-12-28", opponent: "Vojvodina", time: "16:00" },
  { date: "2025-01-05", opponent: "Radnički", time: "19:00" },
  { date: "2025-01-12", opponent: "Čukarički", time: "17:30" },
  { date: "2025-01-19", opponent: "TSC", time: "20:15" },
]

export default function FootballCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Dobijanje prvog dana meseca i broja dana u mesecu
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // Nazivi meseci
  const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


  // Nazivi dana
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Funkcija za prelazak na prethodni mesec
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  // Funkcija za prelazak na sledeći mesec
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  // Funkcija za proveru da li je datum utakmica
  const getMatchForDate = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return matchDates.find((match) => match.date === dateString)
  }

  // Funkcija za proveru da li je danas
  const isToday = (day) => {
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-4">
        <div className="bg-[#031716] p-6 rounded-lg border border-[#0c969c]/20 shadow-lg mt-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold min-w-[200px] text-center">
              {monthNames[month]} {year}
            </h2>
            <Button onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

          <div className="p-6">
            {/* Header sa nazivima dana */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {dayNames.map((dayName) => (
                <div key={dayName} className="text-center font-semibold text-gray-600 py-2">
                  {dayName}
                </div>
              ))}
            </div>

            {/* Grid sa danima - fiksna visina */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 42 }, (_, index) => {
                const dayIndex = index - startingDayOfWeek + 1
                const day = dayIndex > 0 && dayIndex <= daysInMonth ? dayIndex : null

                if (day === null) {
                  return <div key={index} className="h-20" />
                }

                const match = getMatchForDate(day)
                const todayClass = isToday(day)

                return (
                  <div
                    key={index}
                    className={`
          h-20 border rounded-lg p-2 transition-all duration-200 hover:shadow-md
          ${
            match
              ? "bg-gradient-to-br from-red-100 to-red-200 border-red-300 hover:from-red-200 hover:to-red-300"
              : "bg-white border-gray-200 hover:bg-gray-50"
          }
          ${todayClass ? "ring-2 ring-blue-500 ring-offset-2" : ""}
        `}
                  >
                    <div className="flex flex-col h-full">
                      <div
                        className={`
            text-sm font-medium
            ${match ? "text-red-800" : "text-gray-700"}
            ${todayClass ? "text-blue-600 font-bold" : ""}
                      `}
                      >
                        {day}
                      </div>

                    {match && (
                      <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="text-xs font-semibold text-red-800 text-center leading-tight">
                          {match.opponent}
                        </div>
                        <div className="text-xs text-red-600 mt-1">{match.time}</div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 