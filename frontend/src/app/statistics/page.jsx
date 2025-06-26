"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  Avatar,
  Chip,
  Tooltip,
  Fade,
  Container,
  Stack,
} from "@mui/material"
import { SportsSoccer, Groups, EmojiEvents, TrendingUp, Assessment } from "@mui/icons-material"

const PRIMARY_BG = "#031716"
const SECONDARY_BG = "#032f30"
const ACCENT = "#0a7075"
const ACCENT_HOVER = "#0c969c"
const LIGHT = "#6ba3be"
const DARK_TEXT = "#274d60"
const TEXT = "#ffffff"

export default function StatisticsPage() {
  const [teams, setTeams] = useState([])
  const [leagues, setLeagues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaguesRes, teamsRes] = await Promise.all([
          fetch("http://localhost:8000/my-leagues", {
            method: "GET",
            credentials: "include",
          }),
          fetch("http://localhost:8000/my-teams-moderator", {
            method: "GET",
            credentials: "include",
          }),
        ])

        if (!leaguesRes.ok || !teamsRes.ok) {
          throw new Error("Failed to fetch data.")
        }

        const leaguesData = await leaguesRes.json()
        const teamsData = await teamsRes.json()

        setLeagues(leaguesData || [])
        setTeams(teamsData || [])
      } catch (err) {
        console.error(err)
        setError("An error occurred while fetching data.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
            Loading your statistics...
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

  const SectionHeader = ({ icon, title, count }) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        background: `linear-gradient(135deg, ${SECONDARY_BG} 0%, ${DARK_TEXT} 100%)`,
        borderRadius: 3,
        p: 3,
        mb: 4,
        border: `1px solid ${ACCENT}`,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ bgcolor: ACCENT, width: 48, height: 48 }}>{icon}</Avatar>
        <Box>
          <Typography variant="h4" sx={{ color: TEXT, fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: LIGHT }}>
            {count} {count === 1 ? title.slice(0, -1).toLowerCase() : title.toLowerCase()} available
          </Typography>
        </Box>
      </Box>
      <Assessment sx={{ color: LIGHT, fontSize: 40, opacity: 0.7 }} />
    </Box>
  )

  const StyledCard = ({ title, subtitle, type, icon, onClick, index }) => (
    <Fade in timeout={600 + index * 200}>
      <Card
        elevation={8}
        sx={{
          backgroundColor: SECONDARY_BG,
          color: TEXT,
          borderRadius: 4,
          border: `2px solid transparent`,
          background: `linear-gradient(${SECONDARY_BG}, ${SECONDARY_BG}) padding-box, linear-gradient(135deg, ${ACCENT}, ${LIGHT}) border-box`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: `0 20px 40px rgba(10, 112, 117, 0.3)`,
            border: `2px solid ${ACCENT}`,
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="flex-start" gap={3} mb={3}>
            <Avatar
              sx={{
                bgcolor: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_HOVER})`,
                width: 56,
                height: 56,
                boxShadow: `0 4px 12px rgba(10, 112, 117, 0.4)`,
              }}
            >
              {icon}
            </Avatar>
            <Box flex={1}>
              <Typography
                variant="h5"
                sx={{
                  color: TEXT,
                  fontWeight: "bold",
                  mb: 1,
                  lineHeight: 1.2,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: LIGHT,
                  mb: 2,
                  opacity: 0.9,
                }}
              >
                {subtitle}
              </Typography>
              <Chip
                label={type}
                size="medium"
                sx={{
                  backgroundColor: DARK_TEXT,
                  color: TEXT,
                  fontWeight: "bold",
                  borderRadius: 2,
                  "& .MuiChip-label": {
                    px: 2,
                  },
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ borderColor: ACCENT, opacity: 0.3, mb: 3 }} />

          <Tooltip title={`View detailed statistics for ${title}`} arrow placement="top">
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<TrendingUp />}
              sx={{
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_HOVER})`,
                color: TEXT,
                fontWeight: "bold",
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "1.1rem",
                boxShadow: `0 4px 12px rgba(10, 112, 117, 0.3)`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${ACCENT_HOVER}, ${LIGHT})`,
                  boxShadow: `0 6px 16px rgba(10, 112, 117, 0.4)`,
                  transform: "translateY(-2px)",
                },
              }}
              onClick={onClick}
            >
              View Statistics
            </Button>
          </Tooltip>
        </CardContent>
      </Card>
    </Fade>
  )

  return (
    <Box sx={{ backgroundColor: PRIMARY_BG, minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            sx={{
              color: TEXT,
              fontWeight: "bold",
              mb: 2,
              background: `linear-gradient(135deg, ${TEXT}, ${LIGHT})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            📊 Statistics Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: LIGHT,
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            Explore comprehensive analytics for your leagues and teams. Dive deep into performance metrics, player
            statistics, and competition insights.
          </Typography>
        </Box>

        {/* Leagues Section */}
        {leagues.length > 0 && (
          <Box mb={8}>
            <SectionHeader icon={<EmojiEvents />} title="Your Leagues" count={leagues.length} />
            <Grid container spacing={4}>
              {leagues.map((league, index) => (
                <Grid item xs={12} sm={6} lg={4} key={league.league_id}>
                  <StyledCard
                    title={league.name}
                    subtitle={league.country}
                    type="League"
                    icon={<EmojiEvents />}
                    onClick={() => router.push(`/statistics/league/${league.league_id}`)}
                    index={index}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Teams Section */}
        {teams.length > 0 && (
          <Box>
            <SectionHeader icon={<Groups />} title="Your Teams" count={teams.length} />
            <Grid container spacing={4}>
              {teams.map((team, index) => (
                <Grid item xs={12} sm={6} lg={4} key={team.team_id}>
                  <StyledCard
                    title={team.name}
                    subtitle={`${team.country} • ${team.team_sport}`}
                    type="Team"
                    icon={<SportsSoccer />}
                    onClick={() => router.push(`/statistics/team/${team.team_id}`)}
                    index={index}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Empty State */}
        {leagues.length === 0 && teams.length === 0 && (
          <Box textAlign="center" py={8}>
            <Assessment sx={{ fontSize: 80, color: LIGHT, opacity: 0.5, mb: 3 }} />
            <Typography variant="h4" sx={{ color: LIGHT, mb: 2 }}>
              No Data Available
            </Typography>
            <Typography variant="body1" sx={{ color: LIGHT, opacity: 0.7 }}>
              You don't have any leagues or teams to display statistics for.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}
