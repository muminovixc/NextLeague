"use client"

import { useEffect, useState } from "react"
import { getRequestsForLeague } from "../../lib/request"
import { addTeamInLeague } from "../../lib/league"
import { Mail, X, Check, XCircle, Users, Trophy, User, Inbox, CheckCircle } from "lucide-react"

export default function RequestModal({ onClose }) {
  const [requests, setRequests] = useState([])
  const [processingId, setProcessingId] = useState(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getRequestsForLeague()
        console.log(data)
        setRequests(data)
      } catch (err) {
        console.error("Error loading requests:", err)
      }
    }

    fetchRequests()
  }, [])

  const handleAccept = async (req) => {
    const payload = {
      league_id: req.league_id,
      team_id: req.team_id,
      sender_id: req.sender_id,
      request_id: req.id,
    }

    setProcessingId(req.id)
    try {
      console.log("Sending to backend:", payload)
      await addTeamInLeague(payload)
      setRequests((prev) => prev.filter((r) => r.id !== req.id))
    } catch (error) {
      console.error("Error accepting request:", error)
    } finally {
      setProcessingId(null)
    }
  }

  const handleDecline = async (id) => {
    console.log("Declined request ID:", id)
    setProcessingId(id)
    // TODO: API poziv za odbijanje requesta
    setTimeout(() => {
      setRequests((prev) => prev.filter((req) => req.id !== id))
      setProcessingId(null)
    }, 500)
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-end p-4 z-50">
      <div className="bg-gradient-to-br from-[#032f30] to-[#031716] rounded-2xl border border-[#0a7075] w-full max-w-md shadow-2xl max-h-[90vh] overflow-hidden mt-4 animate-in slide-in-from-right duration-300">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0a7075] to-[#0c969c] p-6 border-b border-[#0a7075]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Join Requests</h2>
                <p className="text-white/80 text-sm">
                  {requests.length} {requests.length === 1 ? "request" : "requests"} pending
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
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-[#274d60]/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Inbox className="w-8 h-8 text-[#6ba3be]" />
              </div>
              <p className="text-[#6ba3be] font-medium text-lg">No pending requests</p>
              <p className="text-[#0a7075] text-sm mt-2">{"You'll see join requests here when teams apply"}</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-gradient-to-r from-[#031716] to-[#032f30] p-5 rounded-xl border border-[#0a7075] hover:border-[#0c969c] transition-all duration-300 group"
                >
                  {/* Request Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#0c969c]/20 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-[#6ba3be]" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{req.team_name}</h3>
                        <p className="text-[#6ba3be] text-sm">wants to join</p>
                      </div>
                    </div>
                    <div className="bg-[#274d60] px-2 py-1 rounded-full">
                      <span className="text-[#6ba3be] text-xs font-medium">NEW</span>
                    </div>
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
                        <span className="text-[#6ba3be]">Requested by: </span>
                        <span className="text-white font-medium">{req.sender_full_name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccept(req)}
                      disabled={processingId === req.id}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-4 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {processingId === req.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Accept
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDecline(req.id)}
                      disabled={processingId === req.id}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {processingId === req.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Decline
                        </>
                      )}
                    </button>
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
                <CheckCircle className="w-4 h-4" />
                <span>Review each request carefully</span>
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
