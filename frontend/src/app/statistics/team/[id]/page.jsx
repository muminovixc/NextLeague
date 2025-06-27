"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Container,
  Stack,
  Chip,
  Paper,
  Fade,
  Grow,
} from "@mui/material"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { SportsSoccer, Groups, TrendingUp, EmojiEvents, Person, Assessment } from "@mui/icons-material"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const API = "http://localhost:8000"

const PRIMARY_BG = "#031716"
const SECONDARY_BG = "#032f30"
const ACCENT = "#0a7075"
const LIGHT = "#6ba3be"
const TEXT = "#ffffff"
const ACCENT_HOVER = "#0c969c"

export default function TeamStatsPage() {
  const { id } = useParams()
  const [team, setTeam] = useState(null)
  const [statistic, setStatistic] = useState(null)
  const [leagueData, setLeagueData] = useState(null)
  const [playerInfo, setPlayerInfo] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamRes = await fetch(`${API}/team/view/${id}`, { credentials: "include" })
        if (!teamRes.ok) throw new Error("Failed to fetch team data")
        const [teamInfo, , leagueInfo] = await teamRes.json()
        setTeam(teamInfo)
        setLeagueData(leagueInfo)

        // Fetch statistics
        const statsRes = await fetch(`${API}/statistics/team/${id}`, { credentials: "include" })
        if (statsRes.ok) {
          const statData = await statsRes.json()
          setStatistic(statData)
          console.log("Statistics:", statData)
        } else {
          console.warn("No statistics found")
          setStatistic(null)
        }

        // Fetch players
        const playerRes = await fetch(`${API}/statistics/players-info/${id}`, { credentials: "include" })
        const playersData = await playerRes.json()
        setPlayerInfo(Array.isArray(playersData.players) ? playersData.players : [])
        console.log("Player Info:", playersData)
      } catch (err) {
        console.error(err)
        setError("Error loading team data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: PRIMARY_BG, height: "100vh" }}
      >
        <Stack alignItems="center" spacing={3}>
          <CircularProgress size={60} sx={{ color: ACCENT }} />
          <Typography variant="h6" sx={{ color: LIGHT }}>
            Loading team statistics...
          </Typography>
        </Stack>
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={4} sx={{ backgroundColor: PRIMARY_BG, minHeight: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  const stat = statistic || {
    number_of_matches_played: 0,
    number_of_wins: 0,
    number_of_draws: 0,
    number_of_losses: 0,
    win_points: 0,
  }

  const matches = stat.number_of_matches_played || 1
  const winRate = ((stat.number_of_wins / matches) * 100).toFixed(1)
  const drawRate = ((stat.number_of_draws / matches) * 100).toFixed(1)
  const lossRate = ((stat.number_of_losses / matches) * 100).toFixed(1)
  const avgPoints = (stat.win_points / matches).toFixed(2)
  const efficiency = (((stat.number_of_wins * 3 + stat.number_of_draws) / (matches * 3)) * 100).toFixed(1)
  const unbeaten = (((stat.number_of_wins + stat.number_of_draws) / matches) * 100).toFixed(1)

  const barData = {
    labels: ["Matches", "Wins", "Draws", "Losses", "Points"],
    datasets: [
      {
        label: "Performance",
        data: [
          stat.number_of_matches_played,
          stat.number_of_wins,
          stat.number_of_draws,
          stat.number_of_losses,
          stat.win_points,
        ],
        backgroundColor: [ACCENT, "#3c8d8f", "#59b0b4", "#82c6ca", "#b6dce0"],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: SECONDARY_BG,
        titleColor: TEXT,
        bodyColor: TEXT,
        borderColor: ACCENT,
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: LIGHT, font: { size: 12 } },
        grid: { color: "#1f3e3f", drawBorder: false },
      },
      x: {
        ticks: { color: LIGHT, font: { size: 12 } },
        grid: { display: false },
      },
    },
  }

  const StatCard = ({ icon, label, value, color = ACCENT }) => (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        backgroundColor: SECONDARY_BG,
        border: `1px solid ${color}`,
        borderRadius: 3,
        textAlign: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 25px rgba(10, 112, 117, 0.3)`,
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
        {icon}
        <Typography variant="h4" sx={{ color: TEXT, fontWeight: "bold", ml: 1 }}>
          {value}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: LIGHT }}>
        {label}
      </Typography>
    </Paper>
  )

  return (
    <Box sx={{ backgroundColor: PRIMARY_BG, minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section */}
        <Fade in timeout={600}>
          <Box
            sx={{
              background: `linear-gradient(135deg, ${SECONDARY_BG} 0%, rgba(39, 77, 96, 0.8) 100%)`,
              borderRadius: 4,
              p: 4,
              mb: 4,
              border: `2px solid ${ACCENT}`,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${ACCENT}, ${LIGHT})`,
              },
            }}
          >
            <Grid container alignItems="center" spacing={3}>
              <Grid item>
                <Avatar
                  src={team.team_logo}
                  alt={team.name}
                  sx={{
                    width: 80,
                    height: 80,
                    border: `3px solid ${ACCENT}`,
                    boxShadow: `0 4px 12px rgba(10, 112, 117, 0.4)`,
                  }}
                />
              </Grid>
              <Grid item xs>
                <Typography
                  variant="h3"
                  sx={{
                    color: TEXT,
                    fontWeight: "bold",
                    mb: 1,
                    background: `linear-gradient(135deg, ${TEXT}, ${LIGHT})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {team.name}
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Chip icon={<SportsSoccer />} label={team.team_sport} sx={{ backgroundColor: ACCENT, color: TEXT }} />
                  <Chip label={team.country} sx={{ backgroundColor: LIGHT, color: PRIMARY_BG }} />
                  <Chip
                    label={leagueData?.access}
                    sx={{ backgroundColor: SECONDARY_BG, color: TEXT, border: `1px solid ${ACCENT}` }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {/* Performance Stats Cards */}
          <Grid item xs={12}>
            <Grow in timeout={800}>
              <Box>
                <Typography variant="h5" sx={{ color: LIGHT, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                  <Assessment sx={{ color: ACCENT }} />
                  Performance Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={2}>
                    <StatCard icon="✅" label="Win Rate" value={`${winRate}%`} />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <StatCard icon="🤝" label="Draw Rate" value={`${drawRate}%`} />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <StatCard icon="❌" label="Loss Rate" value={`${lossRate}%`} />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <StatCard icon="⭐" label="Avg Points" value={avgPoints} />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <StatCard icon="📈" label="Efficiency" value={`${efficiency}%`} />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <StatCard icon="🛡️" label="Unbeaten" value={`${unbeaten}%`} />
                  </Grid>
                </Grid>
              </Box>
            </Grow>
          </Grid>

          {/* Team Members */}
          <Grid item xs={12} lg={6}>
            <Fade in timeout={1000}>
              <Card
                elevation={8}
                sx={{
                  backgroundColor: SECONDARY_BG,
                  color: TEXT,
                  borderRadius: 4,
                  border: `2px solid ${ACCENT}`,
                  height: "100%",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ color: LIGHT, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                    <Groups sx={{ color: ACCENT }} />
                    Team Members ({playerInfo.length})
                  </Typography>
                  <Divider sx={{ mb: 3, borderColor: ACCENT, opacity: 0.5 }} />
                  {playerInfo.length === 0 ? (
                    <Box textAlign="center" py={4}>
                      <Person sx={{ fontSize: 60, color: LIGHT, opacity: 0.5, mb: 2 }} />
                      <Typography sx={{ color: LIGHT }}>No team members found.</Typography>
                    </Box>
                  ) : (
                    <List dense sx={{ maxHeight: 400, overflow: "auto" }}>
                      {playerInfo.map((player, index) => (
                        <Fade in timeout={1200 + index * 100} key={player.id}>
                          <ListItem
                            component="a"
                            href={`/profile/view/${player.id}`}
                            sx={{
                              cursor: "pointer",
                              borderRadius: 3,
                              mb: 1,
                              p: 2,
                              transition: "all 0.3s ease",
                              border: `1px solid transparent`,
                              "&:hover": {
                                backgroundColor: ACCENT_HOVER,
                                transform: "translateX(8px)",
                                border: `1px solid ${ACCENT}`,
                              },
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: `linear-gradient(135deg, ${ACCENT}, ${LIGHT})`,
                                mr: 2,
                                width: 48,
                                height: 48,
                                fontWeight: "bold",
                              }}
                            >
                              {player.name.charAt(0)}
                              {player.surname.charAt(0)}
                            </Avatar>
                            <ListItemText
                              primary={`${player.name} ${player.surname}`}
                              secondary={player.email}
                              primaryTypographyProps={{
                                fontWeight: "bold",
                                color: TEXT,
                                fontSize: "1.1rem",
                              }}
                              secondaryTypographyProps={{ color: LIGHT, fontSize: "0.9rem" }}
                            />
                          </ListItem>
                        </Fade>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Performance Chart */}
          <Grid item xs={12} lg={6}>
            <Fade in timeout={1200}>
              <Card
                elevation={8}
                sx={{
                  backgroundColor: SECONDARY_BG,
                  color: TEXT,
                  borderRadius: 4,
                  border: `2px solid ${ACCENT}`,
                  height: "100%",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ color: LIGHT, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                    <TrendingUp sx={{ color: ACCENT }} />
                    Performance Chart
                  </Typography>
                  <Divider sx={{ mb: 3, borderColor: ACCENT, opacity: 0.5 }} />
                  <Box sx={{ height: 300 }}>
                    <Bar data={barData} options={barOptions} />
                  </Box>
                  <Box mt={3}>
                    <Typography variant="body2" sx={{ color: LIGHT, textAlign: "center" }}>
                      Total Matches: {stat.number_of_matches_played} • Total Points: {stat.win_points}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* League Information */}
          <Grid item xs={12}>
            <Fade in timeout={1400}>
              <Card
                elevation={8}
                sx={{
                  backgroundColor: SECONDARY_BG,
                  color: TEXT,
                  borderRadius: 4,
                  border: `2px solid ${ACCENT}`,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ color: LIGHT, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                    <EmojiEvents sx={{ color: ACCENT }} />
                    League Information
                  </Typography>
                  <Divider sx={{ mb: 3, borderColor: ACCENT, opacity: 0.5 }} />
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                      <Box textAlign="center">
                        <Typography variant="h6" sx={{ color: ACCENT, mb: 1 }}>
                          Access Level
                        </Typography>
                        <Typography variant="h4" sx={{ color: TEXT, fontWeight: "bold" }}>
                          {leagueData?.access}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box textAlign="center">
                        <Typography variant="h6" sx={{ color: ACCENT, mb: 1 }}>
                          Required Players
                        </Typography>
                        <Typography variant="h4" sx={{ color: TEXT, fontWeight: "bold" }}>
                          {leagueData?.number_of_players_in_team}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box textAlign="center">
                        <Typography variant="h6" sx={{ color: ACCENT, mb: 1 }}>
                          League ID
                        </Typography>
                        <Typography variant="h4" sx={{ color: TEXT, fontWeight: "bold" }}>
                          {leagueData?.league_id}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
