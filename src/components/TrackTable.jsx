import React, { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import './TrackTable.css'

const TrackTable = ({ tracks, onSelectTrack, selectedTrack, filterGenre, onFilterChange }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Track Title',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'genre',
        header: 'Genre',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'artist',
        header: 'Artist',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        cell: info => info.getValue(),
      },
    ],
    []
  )

  const filteredTracks = useMemo(() => {
    if (filterGenre === 'all') {
      return tracks
    }
    return tracks.filter(track => track.genre === filterGenre)
  }, [tracks, filterGenre])

  const handleFilterChange = (e) => {
    onFilterChange(e.target.value)
    setPagination(prev => ({ ...prev, pageIndex: 0 }))
  }

  const table = useReactTable({
    data: filteredTracks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  })

  const handleRowClick = (track) => {
    onSelectTrack(track)
  }

  return (
    <div className="track-table-container">
      <div className="table-header">
        <h2>Track Registry</h2>
        <div className="filter-control">
          <label htmlFor="genre-filter">Filter by Genre:</label>
          <select
            id="genre-filter"
            value={filterGenre}
            onChange={handleFilterChange}
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

      {tracks.length === 0 ? (
        <div className="empty-state">
          <p>No tracks added yet. Add your first track!</p>
        </div>
      ) : filteredTracks.length === 0 ? (
        <div className="empty-state">
          <p>No tracks found for the selected genre. Select "All Genres" to see all tracks.</p>
        </div>
      ) : (
        <>
        <div className="table-wrapper">
        <table className="track-table">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row.original)}
                className={selectedTrack?.id === row.original.id ? 'selected' : ''}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setPagination(prev => ({ ...prev, pageIndex: Math.max(0, prev.pageIndex - 1) }))}
          disabled={pagination.pageIndex === 0}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-info">
          Page {pagination.pageIndex + 1} of{' '}
          {Math.ceil(filteredTracks.length / pagination.pageSize)}
        </span>
        <button
          onClick={() => setPagination(prev => ({ ...prev, pageIndex: Math.min(Math.ceil(filteredTracks.length / pagination.pageSize) - 1, prev.pageIndex + 1) }))}
          disabled={pagination.pageIndex >= Math.ceil(filteredTracks.length / pagination.pageSize) - 1}
          className="pagination-button"
        >
          Next
        </button>
      </div>
      </>
      )}
    </div>
  )
}

export default TrackTable