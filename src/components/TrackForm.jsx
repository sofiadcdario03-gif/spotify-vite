import React, { useState } from 'react'
import './TrackForm.css'

const TrackForm = ({ onAddTrack }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    artist: '',
    rating: '',
    label: '',
    userRole: 'listener'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    onAddTrack({
      ...formData,
      rating: parseInt(formData.rating) || 0,
      id: Date.now()
    })
    
    // Reset form
    setFormData({
      title: '',
      genre: '',
      artist: '',
      rating: '',
      label: '',
      userRole: 'listener'
    })
  }

  return (
    <div className="track-form-container">
      <h2>Add New Track</h2>
      <form className="track-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Track Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter track title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">Select genre</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Indie">Indie</option>
            <option value="Jazz">Jazz</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="artist">Artist Name</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            placeholder="Enter artist name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating/BPM (1-100)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="100"
            placeholder="Enter rating"
          />
        </div>

        <div className="form-group">
          <label htmlFor="label">Record Label</label>
          <input
            type="text"
            id="label"
            name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="Enter record label"
          />
        </div>

        <div className="form-group radio-group">
          <label>User Role</label>
          <div className="radio-options">
            <label className="radio-label">
              <input
                type="radio"
                name="userRole"
                value="creator"
                checked={formData.userRole === 'creator'}
                onChange={handleChange}
              />
              Creator
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="userRole"
                value="listener"
                checked={formData.userRole === 'listener'}
                onChange={handleChange}
              />
              Listener
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
        >
          Add Track
        </button>
      </form>
    </div>
  )
}

export default TrackForm