// Sample data for the student workspace. Pages copy these lists into state,
// so changes last until the student signs out or the page is refreshed.

export const students = [
  {
    id: "khalid",
    name: "Khalid Al-Qahtani",
    initials: "KQ",
    major: "Computer Science",
    bio: "I’m a third-year computer science student interested in gameplay systems and interactive experiences. Looking for collaborators and workshop companions.",
    courses: ["SWE 363", "ICS 343", "ICS 381"],
    interests: ["Game development", "Artificial intelligence", "Computer graphics", "Unity"],
    hobbies: ["Football", "Board games", "Digital art"],
    preferredActivities: "Workshops, hackathons, study sessions",
    clubs: ["Game Development Club"],
    interestedActivities: ["game-workshop"],
  },
  {
    id: "reem",
    name: "Reem Al-Anazi",
    initials: "RA",
    major: "Software Engineering",
    bio: "Software engineering student who enjoys game design jams and helping teammates ship small projects.",
    courses: ["SWE 363", "SWE 387"],
    interests: ["Game development", "Game design"],
    hobbies: ["Sketching", "Volleyball"],
    preferredActivities: "Game jams, study sessions",
    clubs: ["Coding Club"],
    interestedActivities: [],
  },
  {
    id: "fahad",
    name: "Fahad Al-Shehri",
    initials: "FA",
    major: "Software Engineering",
    bio: "I build small games in C# and like pairing on course projects.",
    courses: ["SWE 363", "ICS 343"],
    interests: ["Game development", "C#"],
    hobbies: ["Chess", "Cycling"],
    preferredActivities: "Workshops, project teams",
    clubs: [],
    interestedActivities: [],
  },
  {
    id: "lina",
    name: "Lina Nasser",
    initials: "LN",
    major: "Information Systems",
    bio: "Information systems student curious about how people use technology. I enjoy usability studies and weekend hikes.",
    courses: ["ISE 291", "SWE 387"],
    interests: ["UX research", "Product design"],
    hobbies: ["Hiking", "Photography"],
    preferredActivities: "Meetups, design reviews",
    clubs: ["UX & Product Community"],
    interestedActivities: ["product-meetup"],
  },
  {
    id: "yousef",
    name: "Yousef Al-Mutairi",
    initials: "YA",
    major: "Software Engineering",
    bio: "Web developer in the making. Usually found in the library before exams.",
    courses: ["SWE 363", "ICS 343"],
    interests: ["Web development", "Web apps"],
    hobbies: ["Football", "Gaming"],
    preferredActivities: "Study sessions, hackathons",
    clubs: ["Coding Club"],
    interestedActivities: ["study-session"],
  },
  {
    id: "rana",
    name: "Rana Nadeem",
    initials: "RN",
    major: "Information Systems",
    bio: "Interested in data, dashboards, and design systems.",
    courses: ["ISE 291"],
    interests: ["Data visualization", "UX research"],
    hobbies: ["Reading", "Baking"],
    preferredActivities: "Workshops",
    clubs: ["Game Development Club"],
    interestedActivities: [],
  },
];

// Connection state with the signed-in student, keyed by student id.
export const startingConnections = {
  lina: { status: "incoming", note: "Requested 2 hours ago" },
  yousef: { status: "connected", note: "Connected 2 months ago" },
  rana: { status: "connected", note: "Connected last semester" },
};

export const startingConversations = {
  yousef: [
    { id: 1, from: "them", text: "Did you finish the SWE 363 lab?", time: "Tue 6:10 PM" },
    { id: 2, from: "me", text: "Almost, I will push it tonight.", time: "Tue 6:14 PM" },
    { id: 3, from: "them", text: "See you in class tomorrow.", time: "Tue 6:15 PM" },
  ],
};

export const clubs = [
  {
    id: "game-dev",
    name: "Game Development Club",
    initials: "GD",
    summary: "Learn game design, development tools, and collaborate on playable projects.",
    description: "Learn game design, explore development tools, and collaborate with other students on playable projects.",
    about: "We host practical workshops, peer demos, and small project teams for students at every experience level.",
    tags: ["Game development", "Design"],
    interests: ["Game development", "Unity", "Interactive design"],
    contact: "gamedev@clubs.kfupm.edu.sa",
    activityId: "game-workshop",
    announcements: [
      {
        title: "Welcome to the new semester",
        body: "Our weekly project meetups resume this Wednesday in Building 22.",
        published: "Published 12 May by Sara Mansour",
      },
    ],
  },
  {
    id: "ux-product",
    name: "UX & Product Community",
    initials: "UX",
    summary: "A community for students curious about research, product thinking, and design.",
    description: "A community for students curious about user research, product thinking, and interface design.",
    about: "Members run design critiques, usability tests, and product case study sessions every other week.",
    tags: ["UX research", "Product"],
    interests: ["UX research", "Product design", "Prototyping"],
    contact: "uxproduct@clubs.kfupm.edu.sa",
    activityId: "product-meetup",
    announcements: [
      {
        title: "Design critique night",
        body: "Bring a screen you are working on and get feedback from other members.",
        published: "Published 10 May by Huda Al-Harbi",
      },
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Club",
    initials: "CS",
    summary: "Practice security skills through workshops, challenges, and peer learning.",
    description: "Practice security skills through hands-on workshops, capture-the-flag challenges, and peer learning.",
    about: "We prepare teams for national CTF competitions and run beginner-friendly security labs.",
    tags: ["Security", "CTF"],
    interests: ["Security", "CTF", "Networking"],
    contact: "cyber@clubs.kfupm.edu.sa",
    activityId: null,
    announcements: [],
  },
];

export const activities = [
  {
    id: "game-workshop",
    title: "Game Development Workshop",
    category: "Workshop",
    host: "Game Development Club",
    day: "24",
    month: "MAY",
    year: "2025",
    weekday: "Saturday",
    fullDate: "Saturday, 24 May 2025",
    time: "4:00 PM",
    timeRange: "4:00 PM – 7:00 PM",
    place: "Building 22 · Innovation Lab",
    location: "Building 22, Innovation Lab",
    about: "Join a guided workshop on building a small game prototype in Unity. Beginners are welcome, and starter files will be provided.",
    bring: "A laptop with Unity installed and your KFUPM student ID.",
    cancelled: false,
  },
  {
    id: "study-session",
    title: "SWE 363 Exam Study Session",
    category: "Study session",
    host: "Peer-led session",
    day: "27",
    month: "MAY",
    year: "2025",
    weekday: "Tuesday",
    fullDate: "Tuesday, 27 May 2025",
    time: "7:00 PM",
    timeRange: "7:00 PM – 9:00 PM",
    place: "Library · Room 3B",
    location: "Library, Room 3B",
    about: "Review the SWE 363 midterm topics together and work through practice questions in small groups.",
    bring: "Your notes and a laptop or tablet.",
    cancelled: false,
  },
  {
    id: "product-meetup",
    title: "Product Design Meetup",
    category: "Meetup",
    host: "UX & Product Community",
    day: "29",
    month: "MAY",
    year: "2025",
    weekday: "Thursday",
    fullDate: "Thursday, 29 May 2025",
    time: "5:30 PM",
    timeRange: "5:30 PM – 7:00 PM",
    place: "Student Mall · Room 14",
    location: "Student Mall, Room 14",
    about: "Short talks from students who worked on product teams, followed by an open discussion.",
    bring: "Nothing required. Questions are welcome.",
    cancelled: false,
  },
  {
    id: "photo-walk",
    title: "Outdoor Photography Walk",
    category: "Outdoor",
    host: "Photography Community",
    day: "02",
    month: "JUN",
    year: "2025",
    weekday: "Monday",
    fullDate: "Monday, 2 June 2025",
    time: "4:30 PM",
    timeRange: "4:30 PM – 6:00 PM",
    place: "Main Gate",
    location: "Main Gate",
    about: "A relaxed walk around campus to practice outdoor photography.",
    bring: "Any camera or phone.",
    cancelled: true,
  },
];

export const startingInvitations = [
  {
    id: 1,
    direction: "incoming",
    type: "Club Invitation",
    title: "Join the Cybersecurity Club",
    detail: "Sent by the Cybersecurity Club manager",
    clubId: "cybersecurity",
    status: "pending",
  },
];

// Full course names shown on student profiles.
export const courseTitles = {
  "SWE 363": "Web Engineering",
  "SWE 387": "Software Project Management",
  "ICS 343": "Computer Networks",
  "ICS 381": "Artificial Intelligence",
  "ISE 291": "Data Science",
};

export const reportReasons = [
  "Misleading or inappropriate content",
  "Harassment",
  "Spam",
];

export function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export function getFirstName(name) {
  return name.trim().split(/\s+/)[0];
}

// Lists the courses, interests, and clubs a student shares with the profile.
export function getSharedAttributes(profile, student, joinedClubs = []) {
  const myCourses = (profile.courses || []).map((item) => item.toLowerCase());
  const myInterests = (profile.interests || []).map((item) => item.toLowerCase());
  const myClubs = joinedClubs.map((item) => item.toLowerCase());

  return {
    courses: student.courses.filter((item) => myCourses.includes(item.toLowerCase())),
    interests: student.interests.filter((item) => myInterests.includes(item.toLowerCase())),
    clubs: student.clubs.filter((item) => myClubs.includes(item.toLowerCase())),
  };
}

export function countShared(shared) {
  return shared.courses.length + shared.interests.length + shared.clubs.length;
}
