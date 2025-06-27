// Refactored FootballCalendar.jsx – UI poboljšanje + smanjen layout

"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "../../button/button"
import { getMyTeam, getCalendarForTeam } from "../../../lib/team"

export default function FootballCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getMyTeam()
        const teams = data.teams || []
        let allMatches = []
        for (const team of teams) {
          const teamMatches = await getCalendarForTeam(team.team_id)
          teamMatches.forEach(match => {
            match._userTeamId = team.team_id
            match._userTeamName = team.name
          })
          allMatches = allMatches.concat(teamMatches)
        }
        setMatches(allMatches)
      } catch (err) {
        setError("Failed to load matches.")
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const getMatchesForDate = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return matches.filter(match => {
      const matchDate = new Date(match.date)
      const matchDateString = `${matchDate.getFullYear()}-${String(matchDate.getMonth() + 1).padStart(2, "0")}-${String(matchDate.getDate()).padStart(2, "0")}`
      return matchDateString === dateString
    })
  }

  const isToday = (day) => (
    today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
  )

  return (
    <div className="bg-[#031716] p-4 rounded-lg border border-[#0c969c]/20 shadow-lg max-w-4xl w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={goToPreviousMonth}>
          <ChevronLeft className="h-5 w-5 text-white" />
        </Button>
        <h2 className="text-xl font-semibold text-[#6ba3be]">
          {monthNames[month]} {year}
        </h2>
        <Button onClick={goToNextMonth}>
          <ChevronRight className="h-5 w-5 text-white" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4 text-[13px]">
        {dayNames.map(dayName => (
          <div key={dayName} className="text-center font-bold text-[#6ba3be] py-1">
            {dayName}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-[12px]">
        {Array.from({ length: 42 }, (_, index) => {
          const dayIndex = index - startingDayOfWeek + 1
          const day = dayIndex > 0 && dayIndex <= daysInMonth ? dayIndex : null
          if (!day) return <div key={index} className="h-24" />

          const matchesForDay = getMatchesForDate(day)
          const todayClass = isToday(day)

          return (
            <div
              key={index}
              className={`h-24 rounded-md p-1 flex flex-col justify-start items-center border text-center
              ${matchesForDay.length > 0
                ? "bg-red-100 border-red-400 hover:bg-red-200"
                : "bg-[#032f30] border-[#0c969c]/10 hover:bg-[#033f3f]"}
              ${todayClass ? "ring-2 ring-[#0c969c]" : ""}`}
            >
              <div className={`font-bold ${todayClass ? "text-[#0c969c]" : "text-white"}`}>{day}</div>
              <div className="mt-1 space-y-[1px] text-[#6ba3be] leading-tight">
                {matchesForDay.map((match, idx) => {
                  const isUserTeamOne = match.team_one.id === match._userTeamId
                  const opponent = isUserTeamOne ? match.team_two : match.team_one
                  const time = new Date(match.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                  return (
                    <div key={idx}>
                      vs {opponent?.name || "?"} <div className="text-[10px]">{time}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {loading && <div className="text-center text-[#0c969c] mt-4">Loading matches...</div>}
      {error && <div className="text-center text-red-500 mt-4">{error}</div>}
    </div>
  )
}
