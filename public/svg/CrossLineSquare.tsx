export default function CrossLineSquare({ color = '#484848' }: SvgProps) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.5 3H5.5C4.96957 3 4.46086 3.21071 4.08579 3.58579C3.71071 3.96086 3.5 4.46957 3.5 5V9M9.5 3H19.5C20.0304 3 20.5391 3.21071 20.9142 3.58579C21.2893 3.96086 21.5 4.46957 21.5 5V9M9.5 3V21M3.5 9V19C3.5 19.5304 3.71071 20.0391 4.08579 20.4142C4.46086 20.7893 4.96957 21 5.5 21H9.5M3.5 9H21.5M21.5 9V19C21.5 19.5304 21.2893 20.0391 20.9142 20.4142C20.5391 20.7893 20.0304 21 19.5 21H9.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
