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

  const [errors, setErrors] = useState({
    title: '',
    genre: '',
    artist: '',
    rating: '',
    label: ''
  })

  const validateField = (name, value) => {
    let error = ''
    
    switch (name) {
      case 'title':
        if (value.length < 3) {
          error = 'Title must be at least 3 characters'
        }
        break
      case 'genre':
        if (!value) {
          error = 'Genre is required'
        }
        break
      case 'artist':
        if (!value) {
          error = 'Artist name is required'
        } else if (value.length < 3) {
          error = 'Artist name must be at least 3 characters'
        }
        break
      case 'rating':
        const numRating = parseInt(value)
        if (!value || numRating < 1 || numRating > 100) {
          error = 'Rating must be between 1 and 100'
        }
        break
      case 'label':
        if (!value) {
          error = 'Label name is required'
        } else if (value.length < 3) {
          error = 'Label name must be at least 3 characters'
        }
        break
      default:
        break
    }
    
    return error
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Real-time validation
    const error = validateField(name, value)
    setErrors({
      ...errors,
      [name]: error
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors = {
      title: validateField('title', formData.title),
      genre: validateField('genre', formData.genre),
      artist: validateField('artist', formData.artist),
      rating: validateField('rating', formData.rating),
      label: validateField('label', formData.label)
    }
    
    setErrors(newErrors)
    
    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some(error => error !== '')
    
    if (!hasErrors) {
      onAddTrack({
        ...formData,
        rating: parseInt(formData.rating),
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
      setErrors({
        title: '',
        genre: '',
        artist: '',
        rating: '',
        label: ''
      })
    }
  }

  const isFormValid = !Object.values(errors).some(error => error !== '') &&
    formData.title.length >= 3 &&
    formData.genre &&
    formData.artist.length >= 3 &&
    formData.rating >= 1 && formData.rating <= 100 &&
    formData.label.length >= 3

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
          {errors.title && <span className="error">{errors.title}</span>}
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
          {errors.genre && <span className="error">{errors.genre}</span>}
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
          {errors.artist && <span className="error">{errors.artist}</span>}
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
          {errors.rating && <span className="error">{errors.rating}</span>}
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
          {errors.label && <span className="error">{errors.label}</span>}
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
          disabled={!isFormValid}
        >
          Add Track
        </button>
      </form>
    </div>
  )
}

export default TrackForm