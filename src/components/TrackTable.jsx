import React, { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import './TrackTable.css'

const TrackTable = ({ tracks, onSelectTrack, selectedTrack }) => {
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

  const table = useReactTable({
    data: tracks,
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

  if (tracks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tracks added yet. Add your first track!</p>
      </div>
    )
  }

  return (
    <div className="track-table-container">
      <h2>Track Registry</h2>
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
          {Math.ceil(tracks.length / pagination.pageSize)}
        </span>
        <button
          onClick={() => setPagination(prev => ({ ...prev, pageIndex: Math.min(Math.ceil(tracks.length / pagination.pageSize) - 1, prev.pageIndex + 1) }))}
          disabled={pagination.pageIndex >= Math.ceil(tracks.length / pagination.pageSize) - 1}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default TrackTable