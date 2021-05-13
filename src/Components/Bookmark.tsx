interface BookmarkProps {
  strokeWidth?: number
  color?: string
}

const Bookmark = ({ strokeWidth, color }: BookmarkProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={'currentColor' || color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2 || strokeWidth}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  )
}

export default Bookmark
