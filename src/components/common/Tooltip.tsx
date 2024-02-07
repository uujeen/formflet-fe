export default function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute hidden bg-gray-dark-active gap-1.5 rounded px-2 py-1 left-full ml-2.5 group-hover:block whitespace-nowrap">
      <p className="b3 text-white">{children}</p>
    </div>
  );
}
