import React, { useState } from 'react'
import TrackForm from './components/TrackForm'
import TrackTable from './components/TrackTable'
import TrackDetail from './components/TrackDetail'
import './App.css'

function App() {
  const [tracks, setTracks] = useState([])
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [view, setView] = useState('form') // 'form' or 'table'

  const handleAddTrack = (track) => {
    setTracks([...tracks, track])
    setView('table')
  }

  const handleSelectTrack = (track) => {
    setSelectedTrack(track)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Spotify Track Manager</h1>
        <button 
          className="nav-button"
          onClick={() => setView(view === 'form' ? 'table' : 'form')}
        >
          {view === 'form' ? 'View Tracks' : 'Add Track'}
        </button>
      </header>

      <main className="app-main">
        {view === 'form' ? (
          <TrackForm onAddTrack={handleAddTrack} />
        ) : (
          <div className="table-view">
            <TrackTable 
              tracks={tracks} 
              onSelectTrack={handleSelectTrack}
              selectedTrack={selectedTrack}
            />
            {selectedTrack && (
              <TrackDetail track={selectedTrack} />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App