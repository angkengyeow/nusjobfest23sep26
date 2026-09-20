export type Internship = {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  duration: string;
  location: string;
  start: string;
  looking: string[];
};

export const internships: Internship[] = [
  {
    slug: "rf-analog-ic-design",
    title: "RF & Analog IC Design Intern",
    category: "Design Engineering",
    blurb:
      "Work alongside our RF design team on front-end modules — schematic entry, simulation and layout review for products that ship in millions of mobile devices.",
    duration: "6 months",
    location: "Singapore",
    start: "May 2026",
    looking: ["Electrical Engineering", "Cadence / ADS exposure", "Year 3 & above"],
  },
  {
    slug: "process-engineering",
    title: "Process Engineering Intern",
    category: "Manufacturing",
    blurb:
      "Support yield improvement and process control on a high-volume production line, using data analysis to drive real manufacturing decisions.",
    duration: "6 months",
    location: "Singapore",
    start: "May 2026",
    looking: ["Chemical / Materials Eng", "Statistics & data analysis", "Year 3 & above"],
  },
  {
    slug: "test-engineering",
    title: "Test Engineering Intern",
    category: "Product Engineering",
    blurb:
      "Develop and characterise automated test programs for RF devices, from bench validation through to production test release.",
    duration: "6 months",
    location: "Singapore",
    start: "Jan 2026",
    looking: ["EEE / Computer Eng", "Python or C", "Year 2 & above"],
  },
  {
    slug: "firmware-embedded",
    title: "Firmware & Embedded Software Intern",
    category: "Software",
    blurb:
      "Write and debug low-level drivers and tooling for connectivity platforms, working close to the silicon with our systems team.",
    duration: "6 months",
    location: "Singapore",
    start: "May 2026",
    looking: ["Computer Engineering", "C / embedded systems", "Year 3 & above"],
  },
];
