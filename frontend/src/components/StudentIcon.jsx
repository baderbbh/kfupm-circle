// Outline icons shared by the student workspace pages.
const paths = {
  home: "M3 10 12 3l9 7M5 9v12h14V9M9 21v-8h6v8",
  search: "m16 16 5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  people:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M18 8a3 3 0 0 0-2-5M22 21v-2a4 4 0 0 0-3-4",
  message: "M4 4h16v12H9l-5 5V4Z",
  club: "M4 21V8l8-5 8 5v13M9 21v-8h6v8",
  calendar: "M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2ZM7 2v6M17 2v6M3 11h18",
  inbox: "M3 4h18v16H3V4ZM3 13h5l2 3h4l2-3h5",
  person: "M4 21a8 8 0 0 1 16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  arrow: "m9 5 7 7-7 7",
  logout: "M9 3H4v18h5M13 7l5 5-5 5M8 12h13",
  flag: "M5 21V4M5 4h11l-2 4 2 4H5",
  plus: "M12 5v14M5 12h14",
  check: "m5 12 5 5L20 7",
};

export default function StudentIcon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
