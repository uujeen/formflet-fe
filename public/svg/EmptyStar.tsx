export default function EmptyStar({ color = '#484848' }: SvgProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Icon/Feather Icon">
        <path
          id="Vector"
          d="M7.99998 1.33333L10.06 5.50666L14.6666 6.18L11.3333 9.42666L12.12 14.0133L7.99998 11.8467L3.87998 14.0133L4.66665 9.42666L1.33331 6.18L5.93998 5.50666L7.99998 1.33333Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
