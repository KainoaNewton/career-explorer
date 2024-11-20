export interface Career {
  id: string;
  title: string;
  category: string;
  yearsOfEducation: number;
  averageSalary: string;
  description: string;
  dailyTasks: string[];
  requiredSkills: string[];
}

export const categories = [
  {
    id: "tech",
    title: "Technology",
    description: "Explore careers in software, data, and IT",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Discover medical and wellness professions",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "creative",
    title: "Creative",
    description: "Find opportunities in design and arts",
    color: "from-orange-500 to-pink-500",
  },
  {
    id: "business",
    title: "Business",
    description: "Learn about finance and management roles",
    color: "from-yellow-500 to-orange-500",
  },
];

export const careers: Career[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "tech",
    yearsOfEducation: 4,
    averageSalary: "$105,000",
    description: "Design and develop software applications and systems",
    dailyTasks: [
      "Write and review code",
      "Attend team meetings",
      "Debug software issues",
      "Design system architecture",
    ],
    requiredSkills: [
      "Programming languages",
      "Problem-solving",
      "Software design",
      "Version control",
    ],
  },
  {
    id: "nurse-practitioner",
    title: "Nurse Practitioner",
    category: "healthcare",
    yearsOfEducation: 6,
    averageSalary: "$115,000",
    description: "Provide advanced nursing care and treatment",
    dailyTasks: [
      "Examine patients",
      "Prescribe medications",
      "Create treatment plans",
      "Maintain medical records",
    ],
    requiredSkills: [
      "Clinical expertise",
      "Patient care",
      "Medical knowledge",
      "Communication",
    ],
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    category: "creative",
    yearsOfEducation: 4,
    averageSalary: "$85,000",
    description: "Create user-friendly digital experiences",
    dailyTasks: [
      "Conduct user research",
      "Create wireframes",
      "Design prototypes",
      "Test usability",
    ],
    requiredSkills: [
      "UI/UX design",
      "User research",
      "Prototyping",
      "Visual design",
    ],
  },
];