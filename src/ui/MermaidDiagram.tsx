'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import * as Dialog from '@radix-ui/react-dialog'
import mermaid from 'mermaid'
import { ZoomControls } from '@/ui/ZoomControls'

interface MermaidDiagramProps {
  code: string
  id: string
}

// Initialize mermaid once when module loads
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  look: 'classic',
  securityLevel: 'strict',
  fontFamily:
    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
})

// Reusable diagram renderer component
const DiagramRenderer = ({
  code,
  id,
  className = '',
}: {
  code: string
  id: string
  className?: string
}) => {
  const mermaidRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderDiagram = async () => {
      if (mermaidRef.current) {
        // Small delay to ensure DOM is ready, especially for modal context
        await new Promise(resolve => setTimeout(resolve, 10))

        // Check again after delay in case ref became null during timeout
        if (!mermaidRef.current) return

        mermaidRef.current.innerHTML = code
        const diagramId = id
        const { svg, bindFunctions } = await mermaid.render(diagramId, code)
        if (mermaidRef.current) {
          // Add null check for test safety
          mermaidRef.current.innerHTML = svg
          bindFunctions?.(mermaidRef.current)
        }
      }
    }

    renderDiagram()
  }, [code, id])

  return (
    <div
      ref={mermaidRef}
      className={`[&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-none [&_svg]:min-h-[300px] ${className}`}
      role="img"
      aria-label="Mermaid diagram"
      data-testid="mermaid-diagram"
    />
  )
}

export const MermaidDiagram = ({ code, id }: MermaidDiagramProps) => {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

  return (
    <>
      {/* Main diagram with zoom/pan */}
      <div className="my-8 rounded-2xl border-2 border-gray-700/50 shadow-2xl backdrop-blur-sm overflow-hidden group relative transition-all duration-500 hover:border-gray-600/70 hover:shadow-3xl">
        {/* Enhanced gradient background with more dramatic sweep */}
        <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-40% via-black via-80% to-black" />

        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 to-blue-500/15 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

        <TransformWrapper
          initialScale={1}
          minScale={0.25}
          maxScale={3}
          wheel={{ step: 0.1 }}
          panning={{ disabled: false }}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent
            wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing"
            contentClass="p-6 min-h-[400px] flex items-center justify-center"
          >
            <DiagramRenderer code={code} id={id} />
          </TransformComponent>

          <ZoomControls
            showFullscreen={true}
            onFullscreen={() => setIsFullscreenOpen(true)}
          />
        </TransformWrapper>
      </div>

      {/* Fullscreen Modal */}
      <Dialog.Root open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed inset-4 z-50 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            <Dialog.Title className="sr-only">
              Fullscreen Mermaid Diagram
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              View the Mermaid diagram in fullscreen mode with zoom and pan
              controls
            </Dialog.Description>

            {/* Close button */}
            <Dialog.Close
              className="absolute top-4 right-4 z-60 w-10 h-10 flex items-center justify-center bg-gray-800/80 hover:bg-gray-700/80 rounded-lg border border-gray-600/50 text-gray-300 hover:text-white transition-colors backdrop-blur-sm"
              aria-label="Close fullscreen"
            >
              <X className="w-5 h-5" />
            </Dialog.Close>

            {/* Fullscreen diagram */}
            <div className="w-full h-full relative">
              {/* Enhanced gradient background */}
              <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-40% via-black via-80% to-black" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

              <TransformWrapper
                initialScale={1.75}
                minScale={0.1}
                maxScale={5}
                wheel={{ step: 0.1 }}
                panning={{ disabled: false }}
                doubleClick={{ disabled: true }}
                centerOnInit={true}
              >
                <TransformComponent
                  wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing"
                  contentClass="p-8 flex items-center justify-center min-h-full"
                >
                  <DiagramRenderer code={code} id={`${id}-fullscreen`} />
                </TransformComponent>

                <ZoomControls
                  showFullscreen={false}
                  alwaysVisible={true}
                  initialScale={1.75}
                />
              </TransformWrapper>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export default MermaidDiagram
