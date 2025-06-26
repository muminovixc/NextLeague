"use client"

import { useEffect, useState } from "react"
import { getSentRequestLeague } from "../../lib/request"
import { Send, X, Clock, CheckCircle, XCircle, Users, Trophy, User, Inbox, Eye } from "lucide-react"

export default function SentRequestModal({ onClose }) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        const data = await getSentRequestLeague()
        console.log(data)
        setRequests(data)
      } catch (err) {
        console.error("Error loading sent requests:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSentRequests()
  }, [])

  const getStatusBadge = (req) => {
    if (!req.is_reviewed) {
      return (
        <div className="bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-yellow-400" />
            <span className="text-yellow-400 text-xs font-medium">PENDING</span>
          </div>
        </div>
      )
    }

    if (req.is_accepted) {
      return (
        <div className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-400" />
            <span className="text-green-400 text-xs font-medium">ACCEPTED</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
          <div className="flex items-center gap-2">
            <XCircle className="w-3 h-3 text-red-400" />
            <span className="text-red-400 text-xs font-medium">DECLINED</span>
          </div>
        </div>
      )
    }
  }

  const getStatusColor = (req) => {
    if (!req.is_reviewed) return "border-yellow-500/30"
    return req.is_accepted ? "border-green-500/30" : "border-red-500/30"
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-end p-4 z-50">
      <div className="bg-gradient-to-br from-[#032f30] to-[#031716] rounded-2xl border border-[#0a7075] w-full max-w-md shadow-2xl max-h-[90vh] overflow-hidden mt-4 animate-in slide-in-from-right duration-300">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0a7075] to-[#0c969c] p-6 border-b border-[#0a7075]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Sent Requests</h2>
                <p className="text-white/80 text-sm">
                  {requests.length} {requests.length === 1 ? "request" : "requests"} sent
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white group-hover:text-red-300 transition-colors" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="bg-[#274d60]/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#6ba3be]/30 border-t-[#6ba3be] rounded-full animate-spin" />
              </div>
              <p className="text-[#6ba3be] font-medium text-lg">Loading sent requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-[#274d60]/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Inbox className="w-8 h-8 text-[#6ba3be]" />
              </div>
              <p className="text-[#6ba3be] font-medium text-lg">No sent requests</p>
              <p className="text-[#0a7075] text-sm mt-2">{"You haven't sent any join requests yet"}</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className={`bg-gradient-to-r from-[#031716] to-[#032f30] p-5 rounded-xl border ${getStatusColor(req)} hover:border-[#0c969c] transition-all duration-300 group`}
                >
                  {/* Request Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#0c969c]/20 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-[#6ba3be]" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{req.team_name}</h3>
                        <p className="text-[#6ba3be] text-sm">request to join</p>
                      </div>
                    </div>
                    {getStatusBadge(req)}
                  </div>

                  {/* Request Details */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-3 text-sm">
                      <Trophy className="w-4 h-4 text-[#6ba3be] flex-shrink-0" />
                      <div>
                        <span className="text-[#6ba3be]">League: </span>
                        <span className="text-white font-medium">{req.league_name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <User className="w-4 h-4 text-[#6ba3be] flex-shrink-0" />
                      <div>
                        <span className="text-[#6ba3be]">League Owner: </span>
                        <span className="text-white font-medium">{req.receiver_full_name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Message */}
                  <div className="bg-[#274d60]/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4 text-[#6ba3be] flex-shrink-0" />
                      <span className="text-[#6ba3be]">
                        {!req.is_reviewed
                          ? "Waiting for league owner to review your request"
                          : req.is_accepted
                            ? "Your request has been accepted! You can now participate in the league"
                            : "Your request was declined by the league owner"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {requests.length > 0 && (
          <div className="p-6 border-t border-[#0a7075] bg-[#031716]/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-[#6ba3be]">
                <Send className="w-4 h-4" />
                <span>Track your join request status</span>
              </div>
              <button onClick={onClose} className="text-[#6ba3be] hover:text-white transition-colors font-medium">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
