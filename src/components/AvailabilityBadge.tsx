export function AvailabilityBadge(): JSX.Element {
  return (
    <span
      role="status"
      aria-live="polite"
      className="inline-flex items-center px-4 py-1 text-sm font-semibold text-white bg-teal-600/20 border border-teal-400/30 rounded-lg backdrop-blur-sm"
    >
      Available for new opportunities
    </span>
  )
}
