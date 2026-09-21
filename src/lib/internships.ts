export type Internship = {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  duration: string;
  location: string;
  start: string;
  looking: string[];
  responsibilities: string[];
  requirements: string[];
};

export const internships: Internship[] = [
  {
    slug: "equipment-engineering",
    title: "Equipment Engineering Intern",
    category: "Equipment — SAW",
    blurb:
      "Support BAW/SAW production ramp projects — tool setup, qualification and efficiency improvement projects alongside our equipment engineers.",
    duration: "6 months",
    location: "Bedok, Singapore",
    start: "Flexible",
    looking: ["EEE / Mechatronics / Chemical", "Computer Science / Manufacturing", "Industrial or Systems Eng"],
    responsibilities: [
      "Support BAW/SAW production ramp projects in terms of tool setup and qualification.",
      "Set up PCI and documentation for tools.",
      "Work on improvement projects for low efficiency tools.",
      "Support engineers in equipment setup and improvement.",
      "Any ad-hoc tasks assigned by supervisor.",
    ],
    requirements: [
      "Pursuing a Bachelor's Degree in Electrical & Electronics, Mechatronics, Chemical, Computer Science, Manufacturing, Industrial or Systems Engineering.",
      "Team player with good leadership, communication and inter-personal skills.",
      "Engineering problem solving skills.",
      "Willingness to learn new skills and have initiative.",
    ],
  },
  {
    slug: "facilities-engineering",
    title: "Facilities Engineering Intern",
    category: "Facilities — Bedok",
    blurb:
      "Help monitor and maintain our plant water systems, analyse consumption data and work with contractors on preventive maintenance.",
    duration: "6 months",
    location: "Bedok, Singapore",
    start: "Flexible",
    looking: ["Electrical & Electronics Eng", "Mechanical Eng", "Reads technical drawings"],
    responsibilities: [
      "Assist in monitoring, operation and maintenance of water systems: RO/DI water, wastewater treatment, reclaim, glycerin and process cooling water.",
      "Assist engineers with data analysis and weekly/monthly water consumption reports.",
      "Assist the shift team in solving day-to-day operation and maintenance issues.",
      "Liaise with contractors on preventive maintenance, rectification and routine works.",
      "Submit incident reports on the above systems.",
      "Ensure system parameters are always kept within baseline.",
      "Build a fundamental understanding of other facilities systems such as ACMV.",
    ],
    requirements: [
      "Currently pursuing a Bachelor's Degree in Electrical & Electronics Engineering or Mechanical Engineering.",
      "Able to evaluate technical drawings and schematics.",
      "Able to work as a team.",
    ],
  },
  {
    slug: "automation-camline",
    title: "Automation Intern (Camline)",
    category: "Automation",
    blurb:
      "Troubleshoot and enhance our Camline manufacturing systems with production, engineering, IT and QA teams, and support automation projects.",
    duration: "6 months",
    location: "Bedok, Singapore",
    start: "Flexible",
    looking: ["EEE / Mechatronics / Chemical", "Computer Science / Manufacturing", "Industrial or Systems Eng"],
    responsibilities: [
      "Work closely with production, engineering (process & equipment), IT and QA to investigate, troubleshoot and resolve Camline issues raised.",
      "Engage production, engineering teams and external solution providers to implement automation projects and hit implementation targets/KPIs.",
      "Participate in Skyworks automation Camline projects for productivity and quality improvement.",
      "Provide support to the automation team for investigation and enhancement activity.",
      "Any other ad-hoc duties as assigned.",
    ],
    requirements: [
      "Pursuing a Bachelor's Degree in Electrical & Electronics, Mechatronics, Chemical, Computer Science, Manufacturing, Industrial or Systems Engineering.",
      "Fast learner for new systems with minimum supervision.",
      "Good communication and documentation skills.",
      "Strong and systematic problem solving and troubleshooting skills.",
      "Good team player, able to work independently, with a passion for continuous learning.",
      "Preferred: project handling experience, basic machine operational knowledge, flow charting, exposure to robotics, AI and machine learning.",
    ],
  },
  {
    slug: "capex-sourcing",
    title: "CAPEX Sourcing Intern",
    category: "Sourcing & Procurement",
    blurb:
      "Support procurement of long-term assets — RFQs, supplier quotation analysis, spend analysis and cost optimisation with engineering teams.",
    duration: "6 months",
    location: "Singapore",
    start: "Flexible",
    looking: ["Supply Chain / Logistics", "Business or Operations", "Industrial or Systems Eng"],
    responsibilities: [
      "Support procurement teams in acquiring long-term assets such as machinery, equipment and infrastructure.",
      "Prepare RFQs, analyse supplier quotations and track performance metrics.",
      "Assist with contract negotiation, maintain documentation and conduct market research.",
      "Collaborate with engineering teams to optimise cost and delivery.",
      "Any ad-hoc tasks as requested.",
    ],
    requirements: [
      "Currently pursuing or recently completed a Diploma or Bachelor's Degree in Supply Chain Management, Logistics & Transportation, Business Administration or Management, Industrial or Systems Engineering, Operations Management, or Procurement / Strategic Sourcing.",
      "A minimum GPA of 3.0 may be preferred.",
      "Proficiency in Microsoft Excel, including Pivot Tables, VLOOKUP and basic data visualisation.",
      "Exposure to SAP and Power BI is highly advantageous; familiarity with Ariba or other digital procurement platforms is a plus.",
      "Strong data cleaning and analysis skills to support spend analysis and supplier performance tracking.",
    ],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist Intern",
    category: "Global Sourcing",
    blurb:
      "Build proof-of-concept data models for our Global Sourcing team — new databases, algorithms and predictive models, then share the insights.",
    duration: "6 months",
    location: "Ang Mo Kio, Singapore",
    start: "Flexible",
    looking: ["Data Science / Analytics", "Manufacturing / Industrial / Systems Eng", "Business"],
    responsibilities: [
      "Work closely with Skyworks Global Sourcing stakeholders to understand their business goals.",
      "Determine the best data sources and models to support those goals.",
      "Engage cross-functional stakeholders from finance, business lines and external consultants.",
      "Develop proof-of-concept data models, including new databases, creative algorithms and predictive models.",
      "Present data creatively and share insights with team members.",
      "Integrate POC models into existing business processes.",
    ],
    requirements: [
      "Undergraduate degree in Manufacturing, Industrial or Systems Engineering, Business, Data Science and/or Business Analytics.",
      "Experience with MS Excel and artificial intelligence.",
    ],
  },
];
