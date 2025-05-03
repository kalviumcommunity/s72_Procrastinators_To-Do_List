// MongoDB seed data for Procrastinator's To-Do List Project

// 1. Tasks Collection
const tasks = [
  {
    title: "Complete ASAP Project",
    description:
      "Finish implementing the Procrastinator's To-Do List and submit it.",
    priority: "High",
    completed: false,
    originalDeadline: new Date("2023-11-30"),
    currentDeadline: new Date("2023-12-05"),
    postponedCount: 2,
    inGraveyard: false,
    excuse: "I need more time to perfect the design.",
    lastPostponedAt: new Date("2023-11-28"),
  },
  {
    title: "Prepare Project Presentation",
    description:
      "Create slides and demo for the Procrastinator's To-Do List project.",
    priority: "High",
    completed: false,
    originalDeadline: new Date("2023-11-28"),
    currentDeadline: new Date("2023-11-29"),
    postponedCount: 1,
    inGraveyard: false,
    excuse: "I'll be more creative if I wait until the last minute.",
    lastPostponedAt: new Date("2023-11-26"),
  },
  {
    title: "Update Resume",
    description: "Add new projects and skills to my resume.",
    priority: "Medium",
    completed: false,
    originalDeadline: new Date("2023-11-15"),
    currentDeadline: new Date("2023-12-15"),
    postponedCount: 5,
    inGraveyard: true,
    excuse: "Future me will be even more impressive to write about.",
    lastPostponedAt: new Date("2023-11-25"),
  },
  {
    title: "Learn MongoDB Aggregation",
    description:
      "Study advanced MongoDB aggregation techniques for better data handling.",
    priority: "Medium",
    completed: false,
    originalDeadline: new Date("2023-11-10"),
    currentDeadline: new Date("2023-12-10"),
    postponedCount: 3,
    inGraveyard: false,
    excuse: "I need to get better at the basics first.",
    lastPostponedAt: new Date("2023-11-20"),
  },
  {
    title: "Fix Bug in Task Deletion",
    description:
      "Troubleshoot and fix the issue with task deletion in the application.",
    priority: "High",
    completed: true,
    originalDeadline: new Date("2023-11-18"),
    currentDeadline: new Date("2023-11-18"),
    postponedCount: 0,
    inGraveyard: false,
  },
  {
    title: "Read JavaScript Design Patterns Book",
    description: "Complete reading the book on JavaScript design patterns",
    priority: "Low",
    completed: false,
    originalDeadline: new Date("2023-10-15"),
    currentDeadline: new Date("2023-12-30"),
    postponedCount: 4,
    inGraveyard: false,
    excuse: "I need to practice more before reading theory.",
    lastPostponedAt: new Date("2023-11-15"),
  },
  {
    title: "Setup CI/CD Pipeline",
    description:
      "Configure continuous integration and deployment for the project",
    priority: "Medium",
    completed: false,
    originalDeadline: new Date("2023-11-05"),
    currentDeadline: new Date("2023-12-20"),
    postponedCount: 3,
    inGraveyard: false,
    excuse: "The current manual deployment works fine for now.",
    lastPostponedAt: new Date("2023-11-10"),
  },
  {
    title: "Optimize Database Queries",
    description: "Review and optimize database queries for better performance",
    priority: "Medium",
    completed: false,
    originalDeadline: new Date("2023-11-22"),
    currentDeadline: new Date("2023-12-01"),
    postponedCount: 1,
    inGraveyard: false,
    excuse: "The application is fast enough for now.",
    lastPostponedAt: new Date("2023-11-24"),
  },
  {
    title: "Write API Documentation",
    description:
      "Create comprehensive documentation for the project's API endpoints",
    priority: "Low",
    completed: false,
    originalDeadline: new Date("2023-10-30"),
    currentDeadline: new Date("2023-12-25"),
    postponedCount: 5,
    inGraveyard: true,
    excuse: "Nobody reads documentation anyway.",
    lastPostponedAt: new Date("2023-11-20"),
  },
  {
    title: "Refactor Frontend Components",
    description: "Clean up and optimize the React component structure",
    priority: "Medium",
    completed: false,
    originalDeadline: new Date("2023-11-15"),
    currentDeadline: new Date("2023-11-30"),
    postponedCount: 2,
    inGraveyard: false,
    excuse: "If it ain't broke, don't fix it.",
    lastPostponedAt: new Date("2023-11-22"),
  },
  {
    title: "Implement Dark Mode Feature",
    description:
      "Add dark mode toggle to improve UI accessibility and reduce eye strain",
    priority: "Low",
    completed: false,
    originalDeadline: new Date("2023-12-10"),
    currentDeadline: new Date("2023-12-15"),
    postponedCount: 1,
    inGraveyard: false,
    excuse: "I should learn more about CSS variables first.",
    lastPostponedAt: new Date("2023-12-08"),
  },
  {
    title: "Add Social Media Sharing",
    description:
      "Allow users to share their procrastination stats on social media",
    priority: "Medium",
    completed: false,
    originalDeadline: new Date("2023-12-05"),
    currentDeadline: new Date("2023-12-20"),
    postponedCount: 3,
    inGraveyard: false,
    excuse: "Need to research privacy implications first.",
    lastPostponedAt: new Date("2023-12-10"),
  },
  {
    title: "Write Unit Tests",
    description: "Create comprehensive test suite for backend API endpoints",
    priority: "High",
    completed: false,
    originalDeadline: new Date("2023-11-25"),
    currentDeadline: new Date("2023-12-30"),
    postponedCount: 6,
    inGraveyard: true,
    excuse: "Tests are for people who write buggy code.",
    lastPostponedAt: new Date("2023-12-05"),
  },
];

// 2. Users Collection
const users = [
  {
    username: "avinash_kumar",
    email: "avinash@example.com",
    fullName: "Avinash Kumar Sah",
    createdAt: new Date("2023-10-01"),
    lastLogin: new Date("2023-11-27"),
    procrastinationScore: 85, // On a scale of 1-100
    completedTasks: 12,
    postponedTasks: 32,
  },
  {
    username: "procrastination_master",
    email: "delay@example.com",
    fullName: "Delay Expert",
    createdAt: new Date("2023-09-15"),
    lastLogin: new Date("2023-11-25"),
    procrastinationScore: 98,
    completedTasks: 3,
    postponedTasks: 67,
  },
  {
    username: "deadline_crusher",
    email: "ontime@example.com",
    fullName: "Punctual Person",
    createdAt: new Date("2023-10-10"),
    lastLogin: new Date("2023-11-26"),
    procrastinationScore: 12,
    completedTasks: 45,
    postponedTasks: 7,
  },
  {
    username: "someday_doer",
    email: "eventually@example.com",
    fullName: "Future Planner",
    createdAt: new Date("2023-09-20"),
    lastLogin: new Date("2023-11-24"),
    procrastinationScore: 78,
    completedTasks: 8,
    postponedTasks: 29,
  },
  {
    username: "tomorrow_is_another_day",
    email: "tomorrow@example.com",
    fullName: "Scarlett O'Hara",
    createdAt: new Date("2023-10-15"),
    lastLogin: new Date("2023-11-23"),
    procrastinationScore: 90,
    completedTasks: 5,
    postponedTasks: 41,
  },
  {
    username: "productivity_guru",
    email: "efficient@example.com",
    fullName: "Tim Efficiency",
    createdAt: new Date("2023-10-05"),
    lastLogin: new Date("2023-12-10"),
    procrastinationScore: 15,
    completedTasks: 67,
    postponedTasks: 3,
  },
  {
    username: "last_minute_miracle",
    email: "deadline@example.com",
    fullName: "Miracle Worker",
    createdAt: new Date("2023-09-25"),
    lastLogin: new Date("2023-12-08"),
    procrastinationScore: 95,
    completedTasks: 28,
    postponedTasks: 52,
  },
];

// 3. Excuses Collection
const excuses = [
  {
    text: "Why do it now when Future You can suffer instead?",
    category: "Philosophy",
    usageCount: 42,
    rating: 4.8,
  },
  {
    text: "Hard work pays off later… but laziness pays off now.",
    category: "Wisdom",
    usageCount: 37,
    rating: 4.7,
  },
  {
    text: "Procrastinators unite!... tomorrow.",
    category: "Humor",
    usageCount: 53,
    rating: 4.9,
  },
  {
    text: "Your bed is calling. Answer it.",
    category: "Self-Care",
    usageCount: 31,
    rating: 4.5,
  },
  {
    text: "If it's urgent, they'll remind you again, right?",
    category: "Logic",
    usageCount: 28,
    rating: 4.3,
  },
  {
    text: "Einstein probably procrastinated too. Be like Einstein.",
    category: "Inspiration",
    usageCount: 24,
    rating: 4.4,
  },
  {
    text: "This task is like fine wine - it gets better with age.",
    category: "Wisdom",
    usageCount: 19,
    rating: 4.2,
  },
  {
    text: "The deadline is more of a suggestion, really.",
    category: "Humor",
    usageCount: 45,
    rating: 4.6,
  },
  {
    text: "You've earned a break... since the last break.",
    category: "Self-Care",
    usageCount: 33,
    rating: 4.4,
  },
  {
    text: "Your brain cells need rest to perform optimally later.",
    category: "Science",
    usageCount: 22,
    rating: 4.3,
  },
  {
    text: "It's not procrastination, it's 'task marination'.",
    category: "Reframing",
    usageCount: 38,
    rating: 4.7,
  },
  {
    text: "Let's be honest, are you really in the right mindset for this?",
    category: "Self-Care",
    usageCount: 27,
    rating: 4.5,
  },
  {
    text: "Mercury is in retrograde. Scientifically, it's a bad time to start new tasks.",
    category: "Pseudoscience",
    usageCount: 18,
    rating: 4.6,
  },
  {
    text: "I'll do it as soon as I've organized my entire digital life first.",
    category: "Perfectionism",
    usageCount: 23,
    rating: 4.4,
  },
  {
    text: "My future self probably has more wisdom to tackle this effectively.",
    category: "Philosophy",
    usageCount: 15,
    rating: 4.2,
  },
];

// 4. Motivations Collection
const motivations = [
  {
    text: "Your future self is already judging you.",
    category: "Guilt",
    usageCount: 34,
    rating: 4.6,
  },
  {
    text: "That task isn't going to do itself… or will it?",
    category: "Logic",
    usageCount: 29,
    rating: 4.3,
  },
  {
    text: "Think of how smug you'll feel after doing this.",
    category: "Reward",
    usageCount: 41,
    rating: 4.7,
  },
  {
    text: "DO IT! (But like… after a snack.)",
    category: "Humor",
    usageCount: 38,
    rating: 4.8,
  },
  {
    text: "Every second you waste is a second you can never get back. No pressure.",
    category: "Existential",
    usageCount: 23,
    rating: 4.2,
  },
  {
    text: "Shia LaBeouf is watching. Just. Do. It.",
    category: "Pop Culture",
    usageCount: 47,
    rating: 4.9,
  },
  {
    text: "Success is doing what you said you'd do, even when the mood has passed.",
    category: "Wisdom",
    usageCount: 25,
    rating: 4.5,
  },
  {
    text: "You'll feel so much better once this is done.",
    category: "Self-Care",
    usageCount: 36,
    rating: 4.6,
  },
  {
    text: "Action creates motivation. Not the other way around.",
    category: "Wisdom",
    usageCount: 20,
    rating: 4.4,
  },
  {
    text: "The best time to start was yesterday. The second best time is now.",
    category: "Philosophy",
    usageCount: 31,
    rating: 4.7,
  },
  {
    text: "Your procrastination skills are impressive. Imagine if you applied that creativity to your tasks!",
    category: "Humor",
    usageCount: 19,
    rating: 4.8,
  },
];

// 5. Stats Collection
const stats = [
  {
    userId: "avinash_kumar",
    date: new Date("2023-11-01"),
    tasksCompleted: 3,
    tasksPostponed: 7,
    tasksAddedToGraveyard: 1,
    procrastinationIndex: 72,
  },
  {
    userId: "avinash_kumar",
    date: new Date("2023-11-08"),
    tasksCompleted: 5,
    tasksPostponed: 4,
    tasksAddedToGraveyard: 0,
    procrastinationIndex: 55,
  },
  {
    userId: "avinash_kumar",
    date: new Date("2023-11-15"),
    tasksCompleted: 2,
    tasksPostponed: 9,
    tasksAddedToGraveyard: 2,
    procrastinationIndex: 81,
  },
  {
    userId: "avinash_kumar",
    date: new Date("2023-11-22"),
    tasksCompleted: 4,
    tasksPostponed: 6,
    tasksAddedToGraveyard: 1,
    procrastinationIndex: 64,
  },
  {
    userId: "procrastination_master",
    date: new Date("2023-11-22"),
    tasksCompleted: 1,
    tasksPostponed: 12,
    tasksAddedToGraveyard: 3,
    procrastinationIndex: 95,
  },
  {
    userId: "avinash_kumar",
    date: new Date("2023-11-29"),
    tasksCompleted: 6,
    tasksPostponed: 3,
    tasksAddedToGraveyard: 0,
    procrastinationIndex: 42,
  },
  {
    userId: "productivity_guru",
    date: new Date("2023-12-01"),
    tasksCompleted: 14,
    tasksPostponed: 1,
    tasksAddedToGraveyard: 0,
    procrastinationIndex: 8,
  },
];

// 6. Notifications Collection
const notifications = [
  {
    userId: "avinash_kumar",
    message:
      "You've postponed 'Update Resume' 5 times. Let it go or just do it!",
    timestamp: new Date("2023-12-01T10:00:00Z"),
    read: false,
  },
  {
    userId: "procrastination_master",
    message: "Daily Reminder: 'Future You' is not a superhero.",
    timestamp: new Date("2023-12-02T09:30:00Z"),
    read: true,
  },
];

// 7. Achievements Collection
const achievements = [
  {
    name: "Last Minute Legend",
    description: "Completed 3 tasks on their final deadline.",
    icon: "⏰",
    points: 30,
  },
  {
    name: "Graveyard Keeper",
    description: "Moved 5+ tasks to the graveyard.",
    icon: "⚰️",
    points: 50,
  },
];

// 8. Settings Collection
const settings = [
  {
    userId: "avinash_kumar",
    theme: "dark",
    reminderFrequency: "daily",
    graveyardAutoMoveDays: 10,
  },
  {
    userId: "procrastination_master",
    theme: "chaotic",
    reminderFrequency: "weekly",
    graveyardAutoMoveDays: 5,
  },
];

// 9. Graveyard Collection
const graveyard = [
  {
    taskId: "update_resume",
    buriedOn: new Date("2023-12-01"),
    reason: "Postponed more than 5 times",
  },
  {
    taskId: "write_unit_tests",
    buriedOn: new Date("2023-12-05"),
    reason: "User gave up after 6 postponements",
  },
];

// 10. ProcrastinationStats Collection
const procrastinationStats = [
  {
    userId: "avinash_kumar",
    avgPostponementsPerTask: 3.1,
    mostCommonExcuse: "Future me will handle it better.",
    mostDelayedTask: "Update Resume",
  },
  {
    userId: "procrastination_master",
    avgPostponementsPerTask: 5.4,
    mostCommonExcuse: "Why do it now when Future You can suffer instead?",
    mostDelayedTask: "Write API Documentation",
  },
];

// Export all collections
module.exports = {
  tasks,
  users,
  excuses,
  motivations,
  stats,
  notifications,
  achievements,
  settings,
  graveyard,
  procrastinationStats,
};
