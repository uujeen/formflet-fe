export default function DeskAlt({ id, color = '#D8B0FF' }: SvgProps) {
  return (
    <svg
      id={id}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: 'rotate(-90deg)' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id={id}>
        <path
          id={id}
          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z"
          stroke={color}
          strokeWidth="1.5"
        />
        <path id={id} d="M9 12L15 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path id={id} d="M9 16L13 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path
          id={id}
          d="M8.5 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15.5"
          stroke={color}
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
