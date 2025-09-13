'use client'

import { useState, useEffect } from 'react'
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react'
import { useControls } from 'react-zoom-pan-pinch'

interface ZoomControlsProps {
  showFullscreen?: boolean
  onFullscreen?: () => void
  alwaysVisible?: boolean
  initialScale?: number
}

export const ZoomControls = ({
  showFullscreen = false,
  onFullscreen,
  alwaysVisible = false,
  initialScale = 1,
}: ZoomControlsProps) => {
  const { zoomIn, zoomOut, resetTransform, centerView, instance } =
    useControls()
  const [currentZoom, setCurrentZoom] = useState(100)

  useEffect(() => {
    const updateZoom = () => {
      const scale = instance?.transformState.scale || 1
      setCurrentZoom(Math.round(scale * 100))
    }

    // Update zoom immediately
    updateZoom()

    // Set up interval to check for changes
    const interval = setInterval(updateZoom, 100)

    return () => clearInterval(interval)
  }, [instance?.transformState.scale])

  const handleReset = () => {
    resetTransform()
    setTimeout(() => {
      centerView(initialScale)
    }, 50)
  }

  return (
    <div
      className={`absolute bottom-4 right-4 z-20 flex flex-col gap-1 transition-opacity duration-300 ${alwaysVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
    >
      <button
        onClick={() => zoomIn()}
        className="w-10 h-10 flex items-center justify-center bg-gray-800/80 hover:bg-gray-700/80 rounded-lg border border-gray-600/50 text-gray-300 hover:text-white transition-colors backdrop-blur-sm"
        aria-label="Zoom in"
      >
        <ZoomIn className="w-5 h-5" />
      </button>

      <button
        onClick={handleReset}
        className="w-10 h-10 flex items-center justify-center bg-gray-800/80 hover:bg-gray-700/80 rounded-lg border border-gray-600/50 text-gray-300 hover:text-white transition-colors backdrop-blur-sm text-xs font-mono"
        aria-label="Reset zoom and pan"
      >
        {currentZoom}%
      </button>

      <button
        onClick={() => zoomOut()}
        className="w-10 h-10 flex items-center justify-center bg-gray-800/80 hover:bg-gray-700/80 rounded-lg border border-gray-600/50 text-gray-300 hover:text-white transition-colors backdrop-blur-sm"
        aria-label="Zoom out"
      >
        <ZoomOut className="w-5 h-5" />
      </button>

      {showFullscreen && (
        <button
          onClick={onFullscreen}
          className="w-10 h-10 flex items-center justify-center bg-gray-800/80 hover:bg-gray-700/80 rounded-lg border border-gray-600/50 text-gray-300 hover:text-white transition-colors backdrop-blur-sm"
          aria-label="Open fullscreen"
        >
          <Maximize className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
