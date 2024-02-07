export default function RectangleCheckOff({ color = '#484848' }: SvgProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
    </svg>
  );
}
