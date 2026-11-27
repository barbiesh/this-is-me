// All copy and facts for the site. Source of truth: Barbie's CV.
// Edit anything here — components read from this file only.

export type Link = { label: string; href: string };

export const person = {
  firstName: "Barbie",
  lastName: "Shah",
  monogram: "B·S",
  role: "IT · UI/UX · Project coordination",
  location: "Pokhara, Nepal",
  address: "Fulbari, Pokhara-11",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fulbari%2C+Pokhara",
  email: "barbie.shah003@gmail.com",
  phoneDisplay: "+977 986 465 6512",
  phoneHref: "tel:+9779864656512",
  linkedin: "https://www.linkedin.com/in/barbieshah",
  linkedinDisplay: "linkedin.com/in/barbieshah",
  // Add your GitHub / Instagram URLs here and they will appear in Contact.
  github: "",
  instagram: "",
  // Put a PDF at public/barbie-shah-cv.pdf and set this to "/barbie-shah-cv.pdf" to show a download link.
  cvUrl: "",
};

export const hero = {
  kicker: "Portfolio — Pokhara, Nepal",
  intro:
    "IT student turning code, design and organised thinking into work that runs smoothly.",
  tagline: "Tidy plans, thoughtful products.",
  scroll: "Scroll to begin",
};

export const nav: Link[] = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Beyond", href: "#beyond-work" },
  { label: "Contact", href: "#contact" },
];

export const folio: Record<string, { no: string; name: string }> = {
  home: { no: "01", name: "Home" },
  about: { no: "02", name: "About" },
  journey: { no: "03", name: "Journey" },
  skills: { no: "04", name: "Skills" },
  projects: { no: "05", name: "Projects" },
  experience: { no: "06", name: "Experience" },
  "beyond-work": { no: "07", name: "Beyond work" },
  contact: { no: "08", name: "Contact" },
};

export const about = {
  title: "Hello, I'm Barbie.",
  pullQuote: "Technical enough to build it. Organised enough to run it.",
  paragraphs: [
    "I'm an IT student from Pokhara, studying for a Bachelor in Information Technology (Hons) at Informatics College Pokhara. Along the way I've built an e-commerce site in Laravel, trained a machine learning model, designed relational databases and reworked guidebooks as a UI/UX intern.",
    "Now I want to bring that hands-on technical side to project coordination and team management: keeping work on track, getting things done efficiently and solving problems in practical ways.",
    "I communicate clearly, I get on well with people, and I'm just as comfortable working on my own as I am in a team.",
  ],
  facts: [
    { k: "Based in", v: "Pokhara, Nepal" },
    { k: "Studying", v: "BIT (Hons), 2023–2025" },
    { k: "Heading toward", v: "Project coordination" },
    { k: "Also fluent in", v: "UI/UX & development" },
  ],
};

export type JourneyStop = { when: string; title: string; place: string; note: string; kind: string };

export const journey: JourneyStop[] = [
  {
    when: "2023 — 2025",
    title: "Bachelor in Information Technology (Hons)",
    place: "Informatics College Pokhara",
    note: "Programming, databases and web development, with three notable projects: an e-commerce site, a machine learning model and a database design.",
    kind: "Education",
  },
  {
    when: "Jan — Apr 2025",
    title: "UI/UX Designer Intern",
    place: "Himalaya Expeditions",
    note: "Designed e-guidebooks, structuring visuals and organising content, and improved the user interface and experience for print and digital.",
    kind: "Internship",
  },
  {
    when: "Sep 2025",
    title: "Project Management — Foundation",
    place: "Alison",
    note: "Project management certificate.",
    kind: "Certificate",
  },
  {
    when: "Oct 2025",
    title: "Project Management Foundations",
    place: "Project Management Institute, via LinkedIn Learning",
    note: "Project management certificate, issued through LinkedIn Learning.",
    kind: "Certificate",
  },
  {
    when: "Next",
    title: "A project coordination role",
    place: "Open to opportunities",
    note: "Ready to bring technical know-how and organisation to a team.",
    kind: "Up next",
  },
];

export const skills = {
  title: "The toolkit",
  intro: "The tools I build with, and the habits I work by.",
  soft: [
    "Leadership",
    "Communication",
    "Teamwork",
    "Time Management",
    "Problem-solving",
    "Analytical Thinking",
    "Detail Orientation",
  ],
  technical: [
    { group: "Project management", items: ["Trello", "ClickUp", "Notion", "TeamGantt"] },
    { group: "Programming", items: ["Python", "JavaScript", "Java", "SQL"] },
    { group: "Web development", items: ["HTML", "CSS", "Bootstrap", "Laravel"] },
    { group: "Databases", items: ["MySQL"] },
    { group: "Tools", items: ["Git", "Visual Studio Code", "XAMPP"] },
    { group: "Operating systems", items: ["Windows"] },
  ],
};

export type Project = {
  id: string;
  no: string;
  title: string;
  kind: string;
  summary: string;
  details: string[];
  stack: string[];
  stat?: { value: string; label: string };
  // Add a live demo or repo URL here when you have one; a button appears automatically.
  link?: string;
  theme: "pink" | "ink" | "cream";
};

export const projects: Project[] = [
  {
    id: "pumpkin-outfit",
    no: "01",
    title: "Pumpkin Outfit",
    kind: "E-commerce website",
    summary: "A Laravel e-commerce website with role-based access and product management.",
    details: ["Role-based access", "Product management"],
    stack: ["Laravel"],
    theme: "pink",
  },
  {
    id: "complaint-classifier",
    no: "02",
    title: "Complaint Classifier",
    kind: "Machine learning model",
    summary: "A model that classifies how companies respond to consumer complaints.",
    details: ["Random Forest classifier"],
    stack: ["Random Forest"],
    stat: { value: "64.4%", label: "accuracy" },
    theme: "ink",
  },
  {
    id: "relational-database",
    no: "03",
    title: "Relational Database",
    kind: "Database design",
    summary: "A relational database designed in MySQL for data integrity and efficient queries.",
    details: ["Data integrity", "Efficient queries"],
    stack: ["MySQL"],
    theme: "cream",
  },
];

export const experience = {
  role: "UI/UX Designer Intern",
  company: "Himalaya Expeditions",
  dates: "Jan 2025 — Apr 2025",
  lede: "Designing e-guidebooks that are clear to read, in print and on screen.",
  points: [
    "Designed e-guidebooks, focusing on how visuals are structured and content is organised.",
    "Improved the user interface and experience for both print and digital formats.",
  ],
  certifications: [
    { title: "Project Management Foundations", issuer: "Project Management Institute (via LinkedIn Learning)", date: "Oct 2025" },
    { title: "Project Management — Foundation", issuer: "Alison", date: "Sep 2025" },
  ],
};

// Beyond Work: the CV doesn't list hobbies yet. Replace these with your own —
// set `placeholder: false` once a card has real content.
export const beyond = {
  title: "Off the clock",
  intro: "The little things that don't fit on a CV.",
  cards: [
    { title: "A favourite hobby", note: "A line about what you love doing when you're not working.", placeholder: true },
    { title: "Something you're learning", note: "A skill, a language, an instrument — whatever's new.", placeholder: true },
    { title: "A small obsession", note: "A café, a playlist, a place in Pokhara you keep going back to.", placeholder: true },
  ],
  details: [
    { caption: "Detail no. 1 — pearls", focus: "60% 69%" },
    { caption: "Detail no. 2 — a cloud on the phone case", focus: "52% 51%" },
  ],
};

export const contact = {
  kicker: "Let's talk",
  title: "Say hello",
  line: "Hiring for a project coordination, IT or UI/UX role, or just want to chat? My inbox is open.",
};
