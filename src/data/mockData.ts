export const student = {
  name: 'Layan Alharbi',
  id: 'S2021-4892',
  level: 4,
  title: 'Explorer',
  points: 700,
  maxPoints: 1000,
  streak: 3,
  navigations: 27,
}

export const achievements = [
  {
    id: 'early-bird',
    icon: '🌅',
    name: 'Early Bird',
    desc: 'Arrived on time for 3 classes',
    earned: true,
  },
  {
    id: 'campus-explorer',
    icon: '🗺️',
    name: 'Campus Explorer',
    desc: 'Visited 5 university locations',
    earned: true,
  },
  {
    id: 'streak-3',
    icon: '🔥',
    name: '3-Day Streak',
    desc: 'Arrived on time for 3 consecutive days',
    earned: true,
  },
  {
    id: 'night-owl',
    icon: '🦉',
    name: 'Night Owl',
    desc: 'Used Suhail after 8 PM',
    earned: false,
  },
]

export const schedule = [
  {
    id: 'cs101',
    time: '9:00 AM',
    course: 'Introduction to Computer Science',
    room: 'B203',
    building: 'Building B',
    type: 'class',
  },
  {
    id: 'meeting1',
    time: '11:00 AM',
    course: 'Project Meeting',
    room: 'Study Room 3',
    building: 'Library',
    type: 'meeting',
  },
  {
    id: 'ailab',
    time: '2:00 PM',
    course: 'AI Lab',
    room: 'Lab A1',
    building: 'Building A',
    type: 'lab',
  },
  {
    id: 'hackathon',
    time: '4:00 PM',
    course: 'FARQ Hackathon',
    room: 'Innovation Hall',
    building: 'Building C',
    type: 'event',
  },
]

export const appointments = [
  {
    id: 'appt1',
    faculty: 'Dr. Ahmad Alqahtani',
    dept: 'Computer Science',
    office: 'C214',
    building: 'Building C',
    date: 'Tuesday, Sep 23',
    time: '11:30 AM',
    purpose: 'Project discussion',
    confirmed: true,
  },
]

export const faculty = [
  {
    id: 'ahmad',
    name: 'Dr. Ahmad Alqahtani',
    dept: 'Computer Science',
    office: 'C214',
    building: 'Building C',
    avatar: 'AA',
    available: ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'],
  },
  {
    id: 'sara',
    name: 'Dr. Sara Almutairi',
    dept: 'Mathematics',
    office: 'A105',
    building: 'Building A',
    avatar: 'SA',
    available: ['9:00 AM', '10:30 AM', '2:00 PM'],
  },
]

export const rooms: Record<string, { name: string; type: string; building: string; floor: number; walkTime: number }> = {
  B203: { name: 'B203', type: 'Classroom', building: 'Building B', floor: 2, walkTime: 4 },
  B201: { name: 'B201', type: 'Classroom', building: 'Building B', floor: 2, walkTime: 4 },
  B204: { name: 'B204', type: 'Classroom', building: 'Building B', floor: 2, walkTime: 4 },
  B205: { name: 'B205', type: 'Classroom', building: 'Building B', floor: 2, walkTime: 5 },
  'Innovation Hall': { name: 'Innovation Hall', type: 'Event Hall', building: 'Building C', floor: 1, walkTime: 4 },
  C214: { name: 'C214', type: 'Faculty Office', building: 'Building C', floor: 2, walkTime: 5 },
  'Lab A1': { name: 'Lab A1', type: 'Computer Lab', building: 'Building A', floor: 1, walkTime: 6 },
}

export const events = [
  {
    id: 'farq',
    name: 'FARQ Hackathon',
    venue: 'Innovation Hall',
    building: 'Building C',
    floor: 1,
    date: 'Today',
    time: '1:00 PM',
  },
]

export const pointsHistory = [
  { id: 1, label: 'Arrived at B203 on time', points: 50, time: '9:54 AM' },
  { id: 2, label: 'Campus Explorer milestone', points: 75, time: 'Yesterday' },
  { id: 3, label: 'Arrived at Lab A1 on time', points: 50, time: 'Yesterday' },
  { id: 4, label: '3-Day Streak bonus', points: 100, time: '2 days ago' },
]

export const navHistory = [
  { id: 1, from: 'Main Lobby', to: 'B203', date: 'Today, 9:50 AM' },
  { id: 2, from: 'B203', to: 'Library', date: 'Yesterday, 11:00 AM' },
  { id: 3, from: 'Main Lobby', to: 'Lab A1', date: 'Yesterday, 1:55 PM' },
]
