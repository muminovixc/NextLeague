"use client"

import { useState, useEffect } from "react"
import { Users, Trophy, Target, Zap } from "lucide-react"

export default function FootballFieldVisualization({ members = [] }) {
  // Enhanced positions with better styling
  const positions = {
    goalkeeper: {
      name: "Goalkeeper",
      abbreviation: "GK",
      defaultCount: 1,
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-gradient-to-br from-amber-400 to-yellow-500",
      shadowColor: "shadow-amber-500/30",
    },
    defender: {
      name: "Defender",
      abbreviation: "DEF",
      defaultCount: 4,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/30",
    },
    midfielder: {
      name: "Midfielder",
      abbreviation: "MID",
      defaultCount: 4,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-gradient-to-br from-emerald-500 to-green-600",
      shadowColor: "shadow-emerald-500/30",
    },
    forward: {
      name: "Forward",
      abbreviation: "FWD",
      defaultCount: 2,
      color: "from-red-500 to-red-600",
      bgColor: "bg-gradient-to-br from-red-500 to-red-600",
      shadowColor: "shadow-red-500/30",
    },
  }

  const [assignedPlayers, setAssignedPlayers] = useState({
    goalkeeper: [],
    defender: [],
    midfielder: [],
    forward: [],
    unassigned: [],
  })

  const [hoveredPlayer, setHoveredPlayer] = useState(null)

  // Enhanced player assignment logic
  useEffect(() => {
    if (!members || members.length === 0) return

    const newAssignedPlayers = {
      goalkeeper: [],
      defender: [],
      midfielder: [],
      forward: [],
      unassigned: [],
    }

    // First, use any existing position data
    const assignedMemberIds = new Set()
    members.forEach((member) => {
      const position = member.position?.toLowerCase()
      if (position && positions[position]) {
        newAssignedPlayers[position].push(member)
        assignedMemberIds.add(member.id)
      }
    })

    // Then randomly assign remaining members
    const unassignedMembers = members.filter((member) => !assignedMemberIds.has(member.id))

    // Assign goalkeeper first (only one)
    if (newAssignedPlayers.goalkeeper.length === 0 && unassignedMembers.length > 0) {
      newAssignedPlayers.goalkeeper.push(unassignedMembers.shift())
    }

    // Distribute remaining players to positions
    const remainingPositions = ["defender", "midfielder", "forward"]

    unassignedMembers.forEach((member) => {
      // Find position with fewest players relative to default count
      const targetPosition = remainingPositions.reduce((bestPos, pos) => {
        const currentRatio = newAssignedPlayers[pos].length / positions[pos].defaultCount
        const bestRatio = newAssignedPlayers[bestPos].length / positions[bestPos].defaultCount
        return currentRatio < bestRatio ? pos : bestPos
      }, remainingPositions[0])

      newAssignedPlayers[targetPosition].push(member)
    })

    setAssignedPlayers(newAssignedPlayers)
  }, [members])

  // Enhanced player card component
  const PlayerCard = ({ player, position, index }) => {
    const positionData = positions[position]

    return (
      <div
        className="group flex flex-col items-center animate-in fade-in-0 duration-500"
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHoveredPlayer(player.id)}
        onMouseLeave={() => setHoveredPlayer(null)}
      >
        <div
          className={`
          relative w-12 h-12 rounded-full ${positionData.bgColor} 
          flex items-center justify-center text-sm font-bold 
          shadow-xl ${positionData.shadowColor} border-3 border-white
          transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl
          ${hoveredPlayer === player.id ? "scale-110 shadow-2xl" : ""}
        `}
        >
          <span className="text-white drop-shadow-lg">{player.name?.charAt(0)?.toUpperCase() || "?"}</span>

          {/* Animated ring on hover */}
          <div
            className={`
            absolute inset-0 rounded-full border-2 border-white/50 
            transition-all duration-300 
            ${hoveredPlayer === player.id ? "scale-125 opacity-100" : "scale-100 opacity-0"}
          `}
          />
        </div>

        <div
          className={`
          mt-2 px-3 py-1 rounded-full text-xs font-bold text-white
          bg-gradient-to-r from-[#031716] to-[#032f30] border border-[#0c969c]/30
          shadow-lg backdrop-blur-sm transition-all duration-300
          ${hoveredPlayer === player.id ? "scale-105 border-[#0c969c] shadow-xl" : ""}
        `}
        >
          <span className="text-[#6ba3be]">{player.name?.split(" ")[0] || positionData.abbreviation}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Target className="w-6 h-6 text-[#0c969c]" />
          <h3 className="text-2xl font-bold text-[#0c969c]">Team Formation</h3>
          <Trophy className="w-6 h-6 text-[#6ba3be]" />
        </div>
        <p className="text-[#6ba3be] text-sm">{members.length} players positioned on the field</p>
      </div>

      {/* Enhanced Football Field */}
      <div className="relative">
        <div
          className="relative w-full rounded-2xl overflow-hidden aspect-[1.6/1] shadow-2xl border-4 border-[#0c969c]/20"
          style={{
            background: `
              linear-gradient(135deg, #1a5d1a 0%, #2d8f2d 50%, #1a5d1a 100%),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 24px,
                rgba(255,255,255,0.03) 25px,
                rgba(255,255,255,0.03) 26px
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 24px,
                rgba(255,255,255,0.03) 25px,
                rgba(255,255,255,0.03) 26px
              )
            `,
          }}
        >
          {/* Enhanced field markings with glow effects */}
          <div className="absolute inset-0 border-4 border-white/40 m-6 rounded-xl shadow-inner" />

          {/* Center line with glow */}
          <div className="absolute left-1/2 top-6 bottom-6 w-1 bg-white/40 shadow-lg shadow-white/20" />

          {/* Center circle with enhanced styling */}
          <div className="absolute left-1/2 top-1/2 w-32 h-32 rounded-full border-4 border-white/40 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-white/10" />
          <div className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-white/60 transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />

          {/* Enhanced penalty areas */}
          <div className="absolute left-6 top-1/2 w-1/4 h-2/5 border-r-4 border-t-4 border-b-4 border-white/40 transform -translate-y-1/2 rounded-r-lg shadow-inner" />
          <div className="absolute right-6 top-1/2 w-1/4 h-2/5 border-l-4 border-t-4 border-b-4 border-white/40 transform -translate-y-1/2 rounded-l-lg shadow-inner" />

          {/* Enhanced goal areas */}
          <div className="absolute left-6 top-1/2 w-16 h-1/4 border-r-4 border-t-4 border-b-4 border-white/40 transform -translate-y-1/2 rounded-r-md bg-white/5" />
          <div className="absolute right-6 top-1/2 w-16 h-1/4 border-l-4 border-t-4 border-b-4 border-white/40 transform -translate-y-1/2 rounded-l-md bg-white/5" />

          {/* Goals */}
          <div className="absolute left-2 top-1/2 w-4 h-16 bg-white/20 transform -translate-y-1/2 rounded-r-lg border-2 border-white/30" />
          <div className="absolute right-2 top-1/2 w-4 h-16 bg-white/20 transform -translate-y-1/2 rounded-l-lg border-2 border-white/30" />

          {/* Players positioned with enhanced styling */}

          {/* Goalkeeper */}
          <div className="absolute left-[8%] top-1/2 transform -translate-y-1/2 flex flex-col items-center">
            {assignedPlayers.goalkeeper.slice(0, 1).map((player, index) => (
              <PlayerCard key={player.id} player={player} position="goalkeeper" index={index} />
            ))}
          </div>

          {/* Defenders */}
          <div className="absolute left-[28%] top-0 bottom-0 w-[8%] flex flex-col justify-evenly items-center py-8">
            {assignedPlayers.defender.slice(0, 4).map((player, index) => (
              <PlayerCard key={player.id} player={player} position="defender" index={index} />
            ))}
          </div>

          {/* Midfielders */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[8%] flex flex-col justify-evenly items-center transform -translate-x-1/2 py-8">
            {assignedPlayers.midfielder.slice(0, 4).map((player, index) => (
              <PlayerCard key={player.id} player={player} position="midfielder" index={index} />
            ))}
          </div>

          {/* Forwards */}
          <div className="absolute left-[72%] top-0 bottom-0 w-[8%] flex flex-col justify-center items-center space-y-8">
            {assignedPlayers.forward.slice(0, 2).map((player, index) => (
              <PlayerCard key={player.id} player={player} position="forward" index={index} />
            ))}
          </div>

          {/* Animated field effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 pointer-events-none" />
        </div>
      </div>

      {/* Enhanced Legend */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#032f30] to-[#0a7075]/30 border border-[#0a7075]">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#0c969c]" />
          <h4 className="text-lg font-bold text-[#0c969c]">Position Legend</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(positions).map(([key, position]) => (
            <div
              key={key}
              className="flex items-center justify-center p-3 rounded-xl bg-[#031716] border border-[#0a7075] hover:border-[#0c969c]/50 transition-all duration-300 group"
            >
              <div
                className={`w-6 h-6 rounded-full ${position.bgColor} mr-3 shadow-lg ${position.shadowColor} group-hover:scale-110 transition-transform duration-300`}
              />
              <div className="text-center">
                <div className="text-sm font-bold text-[#0c969c]">{position.abbreviation}</div>
                <div className="text-xs text-[#6ba3be]">{position.name}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-[#0a7075] flex justify-center">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#0c969c]" />
              <span className="text-[#6ba3be]">Formation: 4-4-2</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#6ba3be]" />
              <span className="text-[#6ba3be]">Players: {members.length}/11</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
