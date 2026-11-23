/* The only file to edit for a new student. Plain text, no HTML.
   An empty list [] hides its section. Guide: CUSTOMISE.md */
window.PORTFOLIO = {
  theme: "indigo", // indigo | saffron | emerald | rose | graphite
  banner: "Sample portfolio template by Chirag Jangra", // "" = no banner

  name: "Aarav Mehta",
  title: "Full-stack developer",
  role: "Full-stack developer · B.E. Computer Science, final year",
  tagline: "I build fast, well-tested web apps for real users, and I measure whether they helped.",
  availability: "Open to SDE roles · Class of 2027",
  location: "Pune, India",
  email: "aarav.mehta@example.com",
  phone: "+91 98XXX XXXXX",
  resume: "assets/resume.pdf",
  heroStack: ["TypeScript", "Go", "React", "PostgreSQL"],
  stats: [["8.9", "CGPA"], ["2", "Internships"], ["650+", "DSA problems"]],

  about: [
    "I'm a final-year Computer Science student at Westbridge Institute of Technology, Pune. I enjoy the unglamorous parts of software: clean data models, fast queries and the test that catches a bug before users do.",
    "Across two internships I shipped a Go payments service and rebuilt a retail dashboard in React. On campus I lead the coding club and build tools my classmates use daily."
  ],
  facts: [["Based in", "Pune, India"], ["Graduating", "June 2027"], ["Looking for", "SDE, backend or full-stack roles"], ["Speaks", "English, Hindi, Marathi"]],
  summary: "Final-year CS student and full-stack developer with two internships. Ships React, Node and Go services used by 1,200+ people; strong in DSA, databases and testing.", // printed résumé

  skills: [
    ["Languages", "TypeScript", "JavaScript", "Python", "Go", "Java", "C++", "SQL"],
    ["Frontend", "React", "Next.js", "Tailwind CSS", "HTML & CSS", "Flutter"],
    ["Backend & data", "Node.js", "Express", "FastAPI", "PostgreSQL", "Redis", "MongoDB"],
    ["Cloud & DevOps", "Docker", "AWS", "GitHub Actions", "Linux", "Nginx"],
    ["CS fundamentals", "Data structures", "Algorithms", "DBMS", "Operating systems", "Networks"]
  ],
  learning: ["Kubernetes", "System design", "Rust"],

  projects: [
    {
      title: "CampusQueue", year: "2026", kind: "Live on campus",
      impact: "Canteen pre-ordering app that cut peak-hour waits from 18 to 6 minutes for 1,200+ students.",
      stack: ["React", "Node.js", "Socket.IO", "PostgreSQL", "Redis"],
      details: ["Live order board over WebSockets and Redis pub/sub.", "Pickup slots smooth the 1 pm rush: 9,400 orders in one semester."],
      github: "https://github.com/aarav-mehta-sample/campusqueue", live: "https://campusqueue.example.com"
    },
    {
      title: "LexiBrief", year: "2025", kind: "Hackathon winner",
      impact: "Turns 40-page legal notices into plain-language briefs in under 10 seconds.",
      stack: ["Python", "FastAPI", "pgvector", "Next.js"],
      details: ["Cites the source paragraph for every claim it makes.", "Built in 36 hours by a team of four; first of 220 teams."],
      github: "https://github.com/aarav-mehta-sample/lexibrief", live: "https://lexibrief.example.com"
    },
    {
      title: "KrishiSense", year: "2025", kind: "Research",
      impact: "Soil sensors and a tiny ML model that cut irrigation water by about 30% on a pilot farm.",
      stack: ["ESP32", "MQTT", "TensorFlow Lite", "Flutter"],
      details: ["Eight solar-powered nodes report soil moisture every 15 minutes.", "Presented at a national student research conference."],
      github: "https://github.com/aarav-mehta-sample/krishisense"
    },
    {
      title: "git-pulse", year: "2024", kind: "Open source",
      impact: "CLI that profiles repository health, scanning 100k commits in under a second.",
      stack: ["Go", "libgit2", "GitHub Actions"],
      details: ["Finds bus factor, churn hot-spots and stale branches.", "180 stars; 6x faster than the script it replaced."],
      github: "https://github.com/aarav-mehta-sample/git-pulse"
    }
  ],

  experience: [
    {
      role: "Software Engineering Intern", org: "Contoso Labs", place: "Bengaluru", period: "May – Jul 2026",
      points: ["Built a Go service that reconciles 2M+ payment records a day; manual review fell 70%.", "Added Prometheus alerts that cut incident detection from hours to minutes."],
      tags: ["Go", "PostgreSQL", "Kafka", "Prometheus"]
    },
    {
      role: "Web Developer Intern", org: "Northwind Retail", place: "Remote", period: "Dec 2025 – Feb 2026",
      points: ["Rebuilt the store-ops dashboard in React; load time fell from 4.1 s to 1.3 s.", "Wrote 120+ unit and end-to-end tests and set up CI."],
      tags: ["React", "TypeScript", "Playwright"]
    },
    {
      role: "Technical Lead", org: "CodeCell coding club", place: "Pune", period: "2025 – now",
      points: ["Run weekly DSA sessions and 12 workshops a year for 400+ students.", "Organised the club's first 24-hour hackathon: 60 teams."],
      tags: ["Mentoring", "Events"]
    }
  ],

  education: [
    { degree: "B.E. Computer Science & Engineering", school: "Westbridge Institute of Technology, Pune", period: "2023 – 2027", score: "CGPA 8.9 / 10", note: "DSA, DBMS, Operating Systems, Networks, ML" },
    { degree: "Class XII, CBSE (Science)", school: "Sunrise Senior Secondary School, Nashik", period: "2023", score: "94.2%", note: "Physics, Chemistry, Maths, Computer Science" }
  ],

  // icon: trophy | code | cert | paper | github | star
  achievements: [
    { title: "Winner, 36-hour national hackathon", detail: "First of 220 teams with LexiBrief.", year: "2025", icon: "trophy" },
    { title: "Contest rating 1,850", detail: "Top 6% in competitive programming.", year: "2026", icon: "code" },
    { title: "Cloud fundamentals certificate", detail: "Associate-level, core cloud services.", year: "2025", icon: "cert" },
    { title: "Paper presented", detail: "Soil moisture prediction, national student conference.", year: "2025", icon: "paper" },
    { title: "14 merged open-source PRs", detail: "Fixes and docs for developer tools.", year: "2024 – 26", icon: "github" },
    { title: "Merit scholarship", detail: "Top 5% of the department, two years running.", year: "2024 – 25", icon: "star" }
  ],

  contactBlurb: "Hiring for a 2027 SDE or backend role? I reply within a day; email is fastest.",
  socials: [ // icon: the label, or code | mail | arrow
    { label: "LinkedIn", url: "https://www.linkedin.com/in/aarav-mehta-sample" },
    { label: "GitHub", url: "https://github.com/aarav-mehta-sample" },
    { label: "LeetCode", url: "https://leetcode.com/u/aarav-mehta-sample", icon: "code" }
  ],

  // [accent, accent 2]: dark shades for light mode, light shades for dark
  themes: {
    indigo: { light: ["#4338ca", "#0e7490"], dark: ["#a5b4fc", "#67e8f9"] },
    saffron: { light: ["#b03a0a", "#8a5a00"], dark: ["#fdba74", "#fde047"] },
    emerald: { light: ["#066e52", "#0369a1"], dark: ["#6ee7b7", "#7dd3fc"] },
    rose: { light: ["#be123c", "#7e22ce"], dark: ["#fda4af", "#d8b4fe"] },
    graphite: { light: ["#27272a", "#52525b"], dark: ["#e4e4e7", "#a1a1aa"] }
  }
};
