'use client'

import { useEffect, useState } from 'react'
import {
  fetchContentTypes,
  runMigration,
  type ContentType,
  type MigrationResult,
} from './actions'

const MigratePage = () => {
  const [contentTypes, setContentTypes] = useState<ContentType[]>([])
  const [selectedContentType, setSelectedContentType] = useState('blogPost')
  const [loadingTypes, setLoadingTypes] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<MigrationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [usePreview, setUsePreview] = useState(false)

  useEffect(() => {
    setLoadingTypes(true)
    setLoadError(null)
    fetchContentTypes(usePreview)
      .then((types) => {
        setContentTypes(types)
        if (types.length > 0) {
          const blogPost = types.find((t) => t.id === 'blogPost')
          setSelectedContentType(blogPost ? blogPost.id : types[0]!.id)
        }
      })
      .catch((err) => {
        setLoadError(err instanceof Error ? err.message : String(err))
      })
      .finally(() => {
        setLoadingTypes(false)
      })
  }, [usePreview])

  const handleRun = async () => {
    setRunning(true)
    setResult(null)
    setError(null)

    try {
      const migrationResult = await runMigration(selectedContentType, usePreview)
      setResult(migrationResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setRunning(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', fontFamily: 'monospace' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Contentful → Payload Migration
      </h1>

      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Migrates all entries for a content type from Contentful to Payload. Idempotent —
        already-migrated posts are skipped.
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <label
          htmlFor="use-preview"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        >
          <input
            id="use-preview"
            type="checkbox"
            checked={usePreview}
            onChange={(e) => setUsePreview(e.target.checked)}
            style={{ width: '1rem', height: '1rem' }}
          />
          <span style={{ fontWeight: 'bold' }}>Use Preview API (include drafts)</span>
        </label>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label
          htmlFor="content-type-select"
          style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
        >
          Content Type
        </label>

        {loadingTypes && <p style={{ color: '#666' }}>Loading content types…</p>}

        {loadError && (
          <p style={{ color: '#c00' }}>Failed to load content types: {loadError}</p>
        )}

        {!loadingTypes && !loadError && contentTypes.length === 0 && (
          <p style={{ color: '#666' }}>No content types found in the Contentful space.</p>
        )}

        {!loadingTypes && !loadError && contentTypes.length > 0 && (
          <select
            id="content-type-select"
            value={selectedContentType}
            onChange={(e) => setSelectedContentType(e.target.value)}
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            {contentTypes.map((ct) => (
              <option key={ct.id} value={ct.id}>
                {ct.name} ({ct.id})
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        onClick={handleRun}
        disabled={running || loadingTypes || contentTypes.length === 0}
        style={{
          padding: '0.5rem 1.5rem',
          fontSize: '1rem',
          cursor:
            running || loadingTypes || contentTypes.length === 0 ? 'not-allowed' : 'pointer',
          background:
            running || loadingTypes || contentTypes.length === 0 ? '#ccc' : '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '1.5rem',
        }}
      >
        {running ? 'Running…' : 'Run Migration'}
      </button>

      {error && (
        <div
          style={{
            padding: '1rem',
            background: '#fee',
            border: '1px solid #c00',
            borderRadius: '4px',
            marginBottom: '1rem',
            color: '#c00',
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Summary</h2>
          <table style={{ borderCollapse: 'collapse', marginBottom: '1rem' }}>
            <tbody>
              {[
                ['Total', result.total],
                ['Success', result.success],
                ['Skipped', result.skipped],
                ['Errors', result.errors],
              ].map(([label, value]) => (
                <tr key={label as string}>
                  <td style={{ padding: '0.25rem 1rem 0.25rem 0', fontWeight: 'bold' }}>
                    {label}
                  </td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {result && (
        <div>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Log</h2>
          <pre
            style={{
              background: '#111',
              color: '#0f0',
              padding: '1rem',
              borderRadius: '4px',
              overflowX: 'auto',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            {result.log.join('\n')}
          </pre>
        </div>
      )}
    </div>
  )
}

export default MigratePage
