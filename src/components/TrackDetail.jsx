import React, { useEffect, useState } from 'react'
import './TrackDetail.css'

const TrackDetail = ({ track }) => {
  const [displayTrack, setDisplayTrack] = useState(null)
  const [filterGenre, setFilterGenre] = useState('all')

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
        <div className="filter-control">
          <label htmlFor="genre-filter">Filter Genre:</label>
          <select
            id="genre-filter"
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
          >
            <option value="all">All Genres</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Indie">Indie</option>
            <option value="Jazz">Jazz</option>
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="Electronic">Electronic</option>
            <option value="R&B">R&B</option>
            <option value="Country">Country</option>
            <option value="Classical">Classical</option>
            <option value="Metal">Metal</option>
            <option value="Folk">Folk</option>
            <option value="Blues">Blues</option>
            <option value="Reggae">Reggae</option>
            <option value="Punk">Punk</option>
            <option value="Soul">Soul</option>
          </select>
        </div>
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