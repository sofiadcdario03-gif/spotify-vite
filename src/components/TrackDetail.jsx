import React, { useEffect, useState } from 'react'
import './TrackDetail.css'

const TrackDetail = ({ track }) => {
  const [displayTrack, setDisplayTrack] = useState(null)

  useEffect(() => {
    setDisplayTrack(track)
  }, [track])

  if (!displayTrack) {
    return (
      <div className="track-detail-placeholder">
        <p>Select a track to view details</p>
      </div>
    )
  }

  const genreBadgeColor = {
    'Pop': '#ff6b6b',
    'Rock': '#4ecdc4',
    'Indie': '#ffe66d',
    'Jazz': '#95e1d3',
    'Hip-Hop': '#a8e6cf',
    'Electronic': '#ff8b94',
    'R&B': '#ffa07a',
    'Country': '#f0e68c',
    'Classical': '#dda0dd',
    'Metal': '#800000',
    'Folk': '#deb887',
    'Blues': '#4169e1',
    'Reggae': '#228b22',
    'Punk': '#ff4500',
    'Soul': '#da70d6'
  }

  const roleBadgeColor = displayTrack.userRole === 'creator' ? '#dc143c' : '#333'

  return (
    <div className="track-detail">
      <div className="detail-header">
        <h3>Track Details</h3>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h4>{displayTrack.title}</h4>
          <div className="badges">
            <span 
              className="genre-badge"
              style={{ backgroundColor: genreBadgeColor[displayTrack.genre] || '#dc143c' }}
            >
              {displayTrack.genre}
            </span>
            <span 
              className="role-badge"
              style={{ backgroundColor: roleBadgeColor }}
            >
              {displayTrack.userRole === 'creator' ? 'Creator' : 'Listener'}
            </span>
          </div>
        </div>

        <div className="detail-info">
          <div className="info-item">
            <span className="label">Artist:</span>
            <span className="value">{displayTrack.artist}</span>
          </div>
          <div className="info-item">
            <span className="label">Rating/BPM:</span>
            <span className="value">{displayTrack.rating}/100</span>
          </div>
          <div className="info-item">
            <span className="label">Record Label:</span>
            <span className="value">{displayTrack.label}</span>
          </div>
          <div className="info-item">
            <span className="label">User Role:</span>
            <span className="value capitalize">{displayTrack.userRole}</span>
          </div>
        </div>

        <div className="rating-bar">
          <div className="rating-label">Rating</div>
          <div className="rating-track">
            <div 
              className="rating-fill"
              style={{ width: `${displayTrack.rating}%` }}
            />
          </div>
          <div className="rating-value">{displayTrack.rating}</div>
        </div>
      </div>
    </div>
  )
}

export default TrackDetail