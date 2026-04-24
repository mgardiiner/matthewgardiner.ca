export type Stakeholder = {
  name: string;
  role: string;
};

export type Project = {
  slug: string;
  employer: string;
  company: string;
  department: string;
  title: string;
  excerpt: string;
  date: string;
  lastUpdated?: string;
  tags: string[];
  url?: string;
  metric?: string;
  images: string[];
  live?: string;
  featured?: boolean;
  top?: boolean;
  duration: string;
  problem: string;
  solution: string;
  related?: string[];
  stakeholders: Stakeholder[];
};

export type Testimonial = {
  quote: string;
  author: string;
  jobTitle: string;
  date: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
};

export const portfolioData: {
  email: string;
  github: string;
  linkedin: string;
  skills: string[];
  experience: Experience[];
  testimonials: Testimonial[];
  projects: Project[];
} = {
  email: "matthew_gardiner@hotmail.com",
  github: "https://github.com/mgardiiner",
  linkedin: "https://www.linkedin.com/in/matthew-gardiner-046115119/",
  skills: [
    "PHP",
    "Full-stack Development",
    "APIs",
    "UI Engineering",
    "Design Systems",
    "Accessibility",
    "Performance",
  ],
  experience: [
    {
      role: "Full-Stack PHP Developer",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      period: "2020 — Present",
      description: "Building and shipping internal tools, AI-powered products, and customer-facing features at scale. Led UI engineering efforts across multiple product lines.",
      tags: ["PHP", "Vue", "MySQL", "AI", "GCP"],
    },
    {
      role: "Web Developer",
      employer: "Trend Hunter",
      company: "Freelance",
      period: "2018 — 2020",
      description: "Designed and developed full-stack web applications for small businesses and startups. Focused on clean UI, performance, and fast delivery.",
      tags: ["PHP", "JavaScript", "CSS", "WordPress"],
    },
  ],
  testimonials: [
    {
      quote: "Matt is incredibly fast, thoughtful, and dependable. His behind-the-scenes work on THGPT made a real impact, and he consistently delivered high-quality results.",
      author: "Alisha Ellis",
      jobTitle: "Senior Strategy Manager & Futurist, Trend Hunter",
      date: "2026-01-30",
    },
    {
      quote: "Matt was a huge help in reconciling CRM data against Salesforce. He jumped in quickly, solved the problem efficiently, and made a complicated process much easier.",
      author: "Sarah Kelly",
      jobTitle: "Senior Sales Analyst, Trend Hunter",
      date: "2025-12-16",
    },
    {
      quote: "Matt provided outstanding onboarding support and guided us through early projects with patience and clarity. His help made a big difference in getting up to speed.",
      author: "Osamudiamen Adun",
      jobTitle: "Junior Web Developer, Trend Hunter",
      date: "2025-09-19",
    },
    {
      quote: "Matt played a key role in onboarding and setting up the new Engineering team. He was organized, proactive, and consistently reliable throughout the process.",
      author: "Derek Cohen",
      jobTitle: "CTO, Trend Hunter",
      date: "2025-09-05",
    },
    {
      quote: "Matt proactively introduced new OpenAI API methods that helped the team move faster right away. He has a strong instinct for useful technical improvements.",
      author: "Derek Cohen",
      jobTitle: "CTO, Trend Hunter",
      date: "2025-08-15",
    },
    {
      quote: "Matt dedicated real time and care to building the ticketing feature for the IT Support GPT bot. His technical support was thoughtful, collaborative, and much appreciated.",
      author: "Omar",
      jobTitle: "Senior IT Specialist, Trend Hunter",
      date: "2025-06-12",
    },
    {
      quote: "Matt helped drive a high volume of feature work forward with strong execution and consistency. He's someone you can count on when there's a lot to get done.",
      author: "Derek Cohen",
      jobTitle: "CTO, Trend Hunter",
      date: "2025-04-11",
    },
    {
      quote: "Matt's attention to detail stood out immediately. He spotted an issue early, raised it quickly, and helped prevent a much bigger problem.",
      author: "Derek Cohen",
      jobTitle: "CTO, Trend Hunter",
      date: "2025-03-18",
    },
    {
      quote: "Matt implemented AI on our ER backend in a way that meaningfully streamlined the submission process. He brings both technical skill and practical business impact.",
      author: "Grace Mahas",
      jobTitle: "VP of Content, Trend Hunter",
      date: "2025-02-14",
    },
    {
      quote: "Matt took ownership of a cross-functional feature outside his usual area and handled it proactively. He's always willing to step up where needed.",
      author: "Derek Cohen",
      jobTitle: "CTO, Trend Hunter",
      date: "2025-01-14",
    },
    {
      quote: "Matt built and presented a new content brief tool that left a strong impression. His work combined smart product thinking with clear execution.",
      author: "Derek Cohen",
      jobTitle: "CTO, Trend Hunter",
      date: "2024-11-06",
    },
    {
      quote: "Matt is consistently supportive, generous with his time, and genuinely helpful. He's the kind of teammate who makes complex work feel manageable.",
      author: "Arezoo Azarbayi",
      jobTitle: "Account Executive, Trend Hunter",
      date: "2024-09-04",
    },
    {
      quote: "Matt delivered one of the first real tools for the McClatchy project and helped automate part of the workflow. He moves ideas into practical solutions quickly.",
      author: "Derek Cohen",
      jobTitle: "CTO, Trend Hunter",
      date: "2024-06-28",
    },
    {
      quote: "Matt consistently improves internal systems in ways that make day-to-day work easier for everyone. His CRM enhancements had immediate value for the team.",
      author: "Ady Floyd",
      jobTitle: "VP of Innovation Strategy, Trend Hunter",
      date: "2024-03-14",
    },
    {
      quote: "Working with Matt has been a great learning experience. He's collaborative, knowledgeable, and creates an environment where people feel supported.",
      author: "Arezoo Azarbayi",
      jobTitle: "Account Executive, Trend Hunter",
      date: "2024-02-29",
    },
    {
      quote: "Matt tackled some of the oldest legacy code on the site and resolved issues with impressive speed. He's especially strong at stepping into tough technical problems.",
      author: "Derek Cohen",
      jobTitle: "CTO, Trend Hunter",
      date: "2023-11-24",
    },
    {
      quote: "Matt was incredibly helpful with technical issues and always patient when answering questions. He made frustrating problems much easier to deal with.",
      author: "Derya Turan",
      jobTitle: "SDR, Trend Hunter",
      date: "2023-07-13",
    },
    {
      quote: "Matt handled a time-sensitive account setup with remarkable speed. He's reliable under pressure and always quick to help when something urgent comes up.",
      author: "Don Holmes",
      jobTitle: "CRO, Trend Hunter",
      date: "2023-07-11",
    },
    {
      quote: "Matt came through on a rush request and helped assemble a complex set of assessment overview groupings quickly and accurately. He's great in high-pressure situations.",
      author: "Gil Cohen",
      jobTitle: "SVP Strategy, Trend Hunter",
      date: "2023-06-28",
    },
    {
      quote: "Matt stepped in on important feature work at a critical time and helped get everything rolled out smoothly. He's dependable and execution-focused.",
      author: "Derek Cohen",
      jobTitle: "CTO, Trend Hunter",
      date: "2023-01-13",
    },
  ],
  projects: [
{
      slug: "horizon-thgpt-redesign",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Strategy & Product",
      title: "Horizon (THGPT) Redesign",
      excerpt:
        "A major redesign initiative for Trend Hunter GPT focused on modernizing the interface, improving prompt-driven workflows, and creating a clearer foundation for future AI product expansion.",
      date: "2026-01-06",
      lastUpdated: "2026-04-20",
      tags: ["UI", "AI", "PHP", "MySQL", "Design", "Redesign"],
      url: "https://www.trendhunter.ai/gpt",
      images: [
        new URL("../assets/images/projects/horizon-thgpt-redesign/home.png", import.meta.url).href,
        new URL("../assets/images/projects/horizon-thgpt-redesign/settings.png", import.meta.url).href,
        new URL("../assets/images/projects/horizon-thgpt-redesign/saved-ideas.png", import.meta.url).href,
        new URL("../assets/images/projects/horizon-thgpt-redesign/hunt-result.png", import.meta.url).href,
        new URL("../assets/images/projects/horizon-thgpt-redesign/ai-campaigns.png", import.meta.url).href,
      ],
      live: "https://www.trendhunter.ai/gpt",      top: true,
      duration: "~2 months, plus ongoing iteration",
      problem:
        "Trend Hunter GPT had grown beyond its original interface, adding new AI workflows, report types, and research use cases that made the experience harder to navigate and less scalable for future product development.",
      solution:
        "Led the Horizon redesign of THGPT, restructuring the user experience around clearer navigation, stronger visual hierarchy, and more intuitive prompt-driven workflows. The redesign improved usability, gave the product a more polished AI-native interface, and created a stronger foundation for ongoing model, reporting, and subscription-related improvements.",
      related: ["thgpt", "openai-api", "dashboard-summarizer"],
      stakeholders: [
        { name: "Alisha Ellis", role: "Senior Strategy Manager & Futurist, Trend Hunter" },
        { name: "Baillie Roy", role: "Graphic Designer, Trend Hunter" },
        { name: "Andrew Chow", role: "VP of Video Production, Trend Hunter" },
      ],
    },
{
      slug: "wiresense",
      employer: "Trend Hunter",
      company: "McClatchy",
      department: "McClatchy Print",
      title: "Wiresense",
      excerpt:
        "An internal data workflow project involving SFTP-based file handling and CUE-driven processing to support structured publishing and platform operations.",
      date: "2025-12-12",
      lastUpdated: "2026-04-17",
      tags: ["API", "SFTP", "Automation", "Internal Tools"],
      url: "",
      metric: "",
      images: [
        new URL("../assets/images/projects/wiresense/categories.png", import.meta.url).href,
        new URL("../assets/images/projects/wiresense/content.png", import.meta.url).href,
        new URL("../assets/images/projects/wiresense/feeds.png", import.meta.url).href,
        new URL("../assets/images/projects/wiresense/queue.png", import.meta.url).href,
      ],
      live: "",      duration: "Ongoing",
      problem:
        "The team needed a more reliable way to move and process structured files across internal systems, with less manual handling and more consistency in downstream workflows.",
      solution:
        "Worked on Wiresense as an ongoing internal project focused on file transfer and structured data processing. Contributed to workflows involving SFTP and CUE to support more reliable ingestion, handling, and operational use of structured information.",
      stakeholders: [
        { name: "Sarah Patterson", role: "Senior Director of Publishing, McClatchy" },
        { name: "Leland Senn", role: "Director, McClatchy" },
      ],
    },
{
      slug: "client-driven-tooling",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Client Success & Customer Relations",
      title: "Client-Driven Product Iteration & Tooling",
      excerpt:
        "A high-volume stream of client and customer success-driven feature work that shaped product direction, internal tools, and workflow improvements across multiple systems.",
      date: "2021-10-19",
      lastUpdated: "2026-04-15",
      tags: ["Product", "UI", "PHP", "Internal Tools", "Iteration"],
      url: "",
      metric: "",
      images: [],
      live: "",      duration: "Ongoing",
      problem:
        "Client needs and internal stakeholder requests were rapidly evolving, requiring fast iteration across multiple tools without sacrificing stability or consistency.",
      solution:
        "Delivered a high volume of targeted improvements and features based on client and customer success feedback. Helped shape product direction through continuous iteration, improving usability, fixing edge cases, and extending internal tools to better support real-world workflows.",
      related: ["print-tools", "trendtangle", "thgpt", "ecommerce-brief"],
      stakeholders: [],
    },
{
      slug: "futurist-ticketing",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Operations and Futurism",
      title: "Futurist Ticketing",
      excerpt:
        "An internal ticketing and access workflow for managing futurist-related requests, handoffs, and operational support more consistently.",
      date: "2021-05-31",
      lastUpdated: "2026-04-07",
      tags: ["UI", "PHP", "Payments", "API"],
      url: "",
      metric: "",
      images: [
        new URL("../assets/images/projects/futurist-ticketing/tickets.png", import.meta.url).href,
        new URL("../assets/images/projects/futurist-ticketing/stats.png", import.meta.url).href,
        new URL("../assets/images/projects/futurist-ticketing/travel-booking.png", import.meta.url).href,
        new URL("../assets/images/projects/futurist-ticketing/archived.png", import.meta.url).href,
      ],
      live: "",      duration: "",
      problem:
        "Futurist-related requests needed a more structured intake and fulfillment workflow than email or ad hoc coordination could provide.",
      solution:
        "Built an internal ticketing workflow to manage futurist requests and access more reliably, giving teams a clearer operational path from request intake through completion.",
      stakeholders: [
        { name: "Tana Makmanee", role: "SVP Insights Strategy, Trend Hunter" },
        { name: "Ady Floyd", role: "VP of Innovation Strategy, Trend Hunter" },
        { name: "Leeron Stern", role: "Operations Coordinator, Trend Hunter" },
      ],
    },
{
      slug: "account-user-systems",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Engineering",
      title: "Account & User Systems",
      excerpt:
        "A set of improvements and underlying systems for managing user accounts, permissions, onboarding, and access across multiple Trend Hunter products.",
      date: "2021-07-12",
      lastUpdated: "2026-04-07",
      tags: ["UI", "PHP", "MySQL", "Systems", "Internal Tools"],
      url: "",
      metric: "",
      images: [],
      live: "",      duration: "Ongoing",
      problem:
        "As multiple products and internal tools evolved, user management became fragmented, leading to inconsistencies in permissions, onboarding flows, and account-related logic across the platform.",
      solution:
        "Worked across multiple systems to improve account handling, permissions, and onboarding flows. Standardized patterns for user access and reduced friction in account-related workflows, supporting more scalable and consistent product experiences across tools.",
      related: ["thgpt", "futurist-ticketing", "openai-api"],
      stakeholders: [],
    },
{
      slug: "innovation-assessment",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Strategy & Product",
      title: "Innovation Assessment",
      excerpt:
        "A redesigned assessment experience that helps users identify their innovation archetype and receive tailored tactics through a clearer, more modern interface.",
      date: "2021-12-10",
      lastUpdated: "2026-03-23",
      tags: ["UI", "PHP", "MySQL", "Redesign"],
      url: "https://www.innovationassessment.com",
      images: [new URL(
        "../assets/images/projects/innovation-assessment/innovation-assessment.png",
        import.meta.url
      ).href],
      live: "https://www.innovationassessment.com",      duration: "~3 months",
      problem:
        "The previous assessment experience felt dated and created unnecessary friction from landing page through results.",
      solution:
        "Redesigned and rebuilt the frontend to modernize the brand, improve usability, and create a smoother journey from assessment entry to personalized results.",
      related: ["artemis-athena", "print-tools", "ecommerce-brief"],
      stakeholders: [{ name: "Jaime Neely / Underwood", role: "President, Trend Hunter" }],
    },
{
      slug: "print-tools",
      employer: "Trend Hunter",
      company: "McClatchy",
      department: "McClatchy Print & Publications",
      title: "Print Tools",
      excerpt:
        "A suite of internal publishing tools for generating print-ready inspection reports, AI recaps, and market-specific editorial outputs.",
      date: "2025-03-31",
      lastUpdated: "2026-03-23",
      tags: ["UI", "PHP", "Design Systems"],
      url: "",
      metric: "",
      images: [
        new URL("../assets/images/projects/print-tools/recap.png", import.meta.url).href,
        new URL("../assets/images/projects/print-tools/events.png", import.meta.url).href,
        new URL("../assets/images/projects/print-tools/real-estate.png", import.meta.url).href,
        new URL("../assets/images/projects/print-tools/health-inspection.png", import.meta.url).href,
      ],
      live: "",      duration: "Ongoing",
      problem:
        "Print workflows relied on fragile, market-specific processes for formatting inspection data, generating recaps, and preparing publication-ready outputs.",
      solution:
        "Built and refined internal print tools that transform inspection and article data into structured, market-specific outputs. The work included recap generation, template formatting, Snowflake query updates, sorting improvements, bug fixes, and a migration toward using the inspections API as the core data source.",
      stakeholders: [
        { name: "David Frese", role: "Multimedia Producer, McClatchy" },
        { name: "Nick Siano", role: "Content Strategist, McClatchy" },
        { name: "Michael Homan", role: "Multimedia Producer, McClatchy" },
        { name: "Steve Wilson", role: "Platforms Editor, McClatchy" },
      ],
    },
{
      slug: "openai-api",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Engineering",
      title: "OpenAI API",
      excerpt:
        "A reusable internal integration layer for OpenAI features across products, covering streaming, model selection, document handling, and AI-powered workflows.",
      date: "2021-10-26",
      lastUpdated: "2026-03-13",
      tags: ["API", "AI", "PHP"],
      url: "",
      metric: "",
      images: [
        new URL("../assets/images/projects/openai-api/openai-api.png", import.meta.url).href,
      ],
      live: "",      duration: "Ongoing",
      problem:
        "Multiple internal tools were beginning to depend on OpenAI, but there was no shared layer for managing model logic, streaming, or document-based workflows consistently.",
      solution:
        "Built and expanded internal OpenAI API tooling used across products, including streaming endpoints, automatic model selection, document upload workflows for better retrieval, and support for multiple AI-powered product experiences.",
      stakeholders: [{ name: "Derek Cohen", role: "CTO, Trend Hunter" }],
    },
{
      slug: "health-inspection-api",
      employer: "Trend Hunter",
      company: "McClatchy",
      department: "McClatchy Print & Publications",
      title: "Health Inspection API",
      excerpt:
        "A scraping and API layer for restaurant inspection data that powers safety reporting, print workflows, and structured market-level lookup tools.",
      date: "2025-05-12",
      lastUpdated: "2026-02-03",
      tags: ["API", "PHP", "MySQL", "GCP", "Scraping"],
      url: "",
      metric: "",
      images: [new URL(
        "../assets/images/projects/health-inspection-api/health-inspection-api.png",
        import.meta.url
      ).href],
      live: "",      top: true,
      duration: "~3 months, plus ongoing iteration",
      problem:
        "Print partners needed timely health inspection data, but the source systems were fragmented, inconsistent across markets, and difficult to consume programmatically.",
      solution:
        "Built a scraping pipeline and API for collecting, normalizing, and serving inspection data across markets. Added endpoints like market and county lookup, improved PDF extraction and retry logic, and made the API the source of truth for downstream print tools instead of direct database calls.",
      related: ["trendtangle", "openai-api", "slack-applications"],
      stakeholders: [
        { name: "Sarah Patterson", role: "Senior Director of Publishing, McClatchy" },
        { name: "Leland Senn", role: "Director, McClatchy" },
      ],
    },
{
      slug: "internal-tools-automation",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "All Trend Hunter Departments",
      title: "Internal Tools & Workflow Automation",
      excerpt:
        "A broad set of internal utilities, automations, and supporting tools that improved efficiency, reduced manual work, and supported multiple product lines.",
      date: "2021-04-13",
      lastUpdated: "2026-01-28",
      tags: ["Automation", "Internal Tools", "PHP", "Systems"],
      url: "",
      metric: "",
      images: [],
      live: "",      duration: "Ongoing",
      problem:
        "Teams relied on a growing number of manual processes and disconnected tools, creating inefficiencies and slowing down development and operational workflows.",
      solution:
        "Built and maintained a wide range of internal tools and automations that supported development, content workflows, and operational tasks. Reduced manual overhead, improved consistency, and enabled faster iteration across multiple projects and teams.",
      related: ["print-tools", "dashboard-summarizer", "slack-applications"],
      stakeholders: [],
    },
{
      slug: "thgpt",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Strategy & Product",
      title: "Trend Hunter GPT",
      excerpt:
        "An AI research platform for exploring trends, generating reports, and uncovering product opportunities from a single prompt-driven workflow, including a major redesign that overhauled the core user experience.",
      date: "2024-11-28",
      lastUpdated: "2025-12-17",
      tags: ["UI", "AI", "PHP", "MySQL", "Design", "Redesign"],
      url: "https://www.trendhunter.ai/gpt",
      images: [new URL("../assets/images/projects/thgpt/thgpt.png", import.meta.url).href],
      live: "https://www.trendhunter.ai/gpt",      featured: true,
      duration: "Ongoing",
      problem:
        "Trend Hunter needed a scalable and intuitive way for users to research trends, generate reports, and explore new ideas with AI, without relying on one-off manual workflows. As the product evolved, the experience also needed a significant overhaul to improve usability and better support expanding functionality.",
      solution:
        "Built and iterated on Trend Hunter GPT, a prompt-driven product for trend exploration, report generation, and idea discovery. Led a major redesign of the experience to improve usability, clarity, and overall product polish, while continuing to expand model selection, report downloads, subscription tracking, and platform stability as usage grew.",
      related: ["horizon-thgpt-redesign", "trendtangle", "ecommerce-brief", "openai-api"],
      stakeholders: [
        { name: "Alisha Ellis", role: "Senior Strategy Manager & Futurist, Trend Hunter" },
        { name: "Baillie Roy", role: "Graphic Designer, Trend Hunter" },
        { name: "Andrew Chow", role: "VP of Video Production, Trend Hunter" },
      ],
    },
{
      slug: "trendtangle",
      employer: "Trend Hunter",
      company: "McClatchy",
      department: "McClatchy Real Time News",
      title: "TrendTangle",
      excerpt:
        "A trend intelligence dashboard that surfaces high-performing stories across publishers and social platforms using NewsWhip data.",
      date: "2024-07-31",
      lastUpdated: "2025-11-19",
      tags: ["UI", "AI", "PHP", "MySQL", "Design"],
      images: [
        new URL("../assets/images/projects/trendtangle/trendtangle.png", import.meta.url).href,
        new URL("../assets/images/projects/trendtangle/explore-news.png", import.meta.url).href,
        new URL("../assets/images/projects/trendtangle/explore-trends.png", import.meta.url).href,
        new URL("../assets/images/projects/trendtangle/external-lists.png", import.meta.url).href,
        new URL("../assets/images/projects/trendtangle/reddit-lists.png", import.meta.url).href,
        new URL("../assets/images/projects/trendtangle/tracking.png", import.meta.url).href,
      ],
      live: "",      top: true,
      duration: "~2 months, plus ongoing iteration",
      problem:
        "The team needed a centralized way to monitor what content was gaining traction across platforms and publishers, without manually checking multiple sources.",
      solution:
        "Built a dashboard powered by the NewsWhip API that aggregates trending articles and supports filtering, sorting, weekly reporting, and source expansion. Later updates included syncing additional Facebook pages, resolving API expiry issues, and fixing access problems tied to infrastructure rules.",
      related: ["thgpt", "health-inspection-api", "ecommerce-brief"],
      stakeholders: [
        { name: "Josh Magness", role: "Assistant Managing Editor, McClatchy" },
        {
          name: "Michael Garbet",
          role: "National Real Time Reporter • General News, McClatchy",
        },
      ],
    },
{
      slug: "slack-applications",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Engineering",
      title: "Slack Applications",
      excerpt:
        "A set of internal Slack-based workflows and integrations for reducing context switching and bringing operational tools directly into team communication.",
      date: "2023-01-31",
      lastUpdated: "2025-11-19",
      tags: ["API", "Integrations", "UI"],
      url: "",
      metric: "",
      images: [
        new URL("../assets/images/projects/slack-applications/slack-integrations.png", import.meta.url).href,
      ],
      live: "",      duration: "",
      problem:
        "Important operational tasks were spread across too many systems, creating friction for teams that already worked primarily inside Slack.",
      solution:
        "Built Slack-connected applications and integrations that surfaced useful workflows directly in the tools teams already used, reducing back-and-forth and improving responsiveness.",
      stakeholders: [],
    },
{
      slug: "trend-hunter-environment-changer-mac",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Dev",
      title: "Trend Hunter Environment Changer (Mac)",
      excerpt:
        "A Mac utility that streamlines environment switching for local development, reducing setup friction and speeding up context changes across projects.",
      date: "2025-10-01",
      lastUpdated: "2025-10-01",
      tags: ["Desktop", "Automation", "Tooling"],
      url: "",
      metric: "",
      images: [
        new URL("../assets/images/projects/trend-hunter-environment-changer-mac/environment-changer.png", import.meta.url).href,
      ],
      live: "",      duration: "",
      problem:
        "Switching between development environments on Mac was repetitive, error-prone, and slowed down project setup.",
      solution:
        "Built a desktop utility to automate environment switching and standardize local setup, making it faster to move between projects and reducing configuration mistakes.",
      stakeholders: [],
    },
{
      slug: "dashboard-summarizer",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Engineering",
      title: "Dashboard Summarizer",
      excerpt:
        "An internal AI-assisted reporting system that transforms raw work logs and dashboard data into structured, shareable summaries, reducing manual reporting overhead.",
      date: "2025-05-15",
      lastUpdated: "2025-09-19",
      tags: ["AI", "Automation", "Internal Tools", "PHP"],
      url: "",
      metric: "",
      images: [new URL("../assets/images/projects/dashboard-summarizer/summarizer.png", import.meta.url).href],
      live: "",      duration: "Ongoing",
      problem:
        "Weekly dashboard reporting took time to compile and rewrite, especially when turning completed work into a clean summary format that was fast to review and easy to share.",
      solution:
        "Developed and improved the Dashboard Summarizer tool to speed up end-of-week dashboard creation. The tool helped turn completed work into clearer summaries faster, reducing manual effort and making recurring reporting more consistent. Expanded the tool to support broader dashboard workflows and higher volumes of reporting, making it a key part of recurring internal communication and performance tracking.",
      related: ["thgpt", "openai-api", "print-tools"],
      stakeholders: [],
    },
{
      slug: "ecommerce-brief",
      employer: "Trend Hunter",
      company: "McClatchy",
      department: "McClatchy Ecommerce",
      title: "Ecommerce Brief",
      excerpt:
        "An AI-assisted brief generation tool that produces structured ecommerce content outlines and automates parts of the editorial research workflow.",
      date: "2024-06-27",
      lastUpdated: "2025-09-16",
      tags: ["UI", "PHP", "MySQL", "AI", "GCP"],
      url: "",
      metric: "",
      images: [
        new URL("../assets/images/projects/ecommerce-brief/ecommerce-brief.png", import.meta.url).href,
        new URL("../assets/images/projects/ecommerce-brief/google-drive.png", import.meta.url).href,
      ],
      live: "",
      duration: "~2 months, with follow-on improvements",
      problem:
        "Content teams were spending too much time manually structuring ecommerce briefs and coordinating research inputs across tools.",
      solution:
        "Built an AI-powered brief generation tool that turns a topic into a structured, research-ready content outline. Later updates improved Google Sheets integration, automated cron-based brief processing, and reduced manual overhead in the content pipeline.",
      related: ["thgpt", "trendtangle", "linkedin-posting-tool"],
      stakeholders: [
        { name: "Andy Wilson", role: ", McClatchy" },
        { name: "Michelle Prado", role: ", McClatchy" },
        { name: "Jane Howard", role: "SVP of Advertising, McClatchy" },
      ],
    },
{
      slug: "social-media-generator",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Social Media & Design",
      title: "Social Media Generator",
      excerpt:
        "An internal tool for generating on-brand social graphics from Trend Hunter content, supporting Instagram and LinkedIn formats with configurable themes, resolutions, and category filters.",
      date: "2021-06-23",
      lastUpdated: "2024-01-24",
      tags: ["UI", "PHP", "Design", "Automation"],
      url: "",
      metric: "",
      images: [
        new URL("../assets/images/projects/social-media-generator/selector.png", import.meta.url).href,
        new URL("../assets/images/projects/social-media-generator/output.png", import.meta.url).href,
      ],
      live: "",
      duration: "",
      problem:
        "Creating on-brand social graphics for Instagram and LinkedIn required manual effort and inconsistent formatting, slowing down the social media team's output.",
      solution:
        "Built a generator tool that pulls TH content by URL or category filter and outputs sized, branded graphics in white or black themes at normal or high resolution — covering both Instagram and LinkedIn formats.",
      related: ["linkedin-posting-tool", "trendtangle"],
      stakeholders: [
        { name: "Renee C.", role: "Social Media, Trend Hunter" },
        { name: "Celine L.", role: "Design, Trend Hunter" },
        { name: "Josh M.", role: "Social Media, Trend Hunter" },
      ],
    },
{
      slug: "linkedin-posting-tool",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Marketing & Engineering",
      title: "LinkedIn Posting Tool",
      excerpt:
        "A workflow tool for structuring and streamlining LinkedIn publishing, helping teams move from draft to distribution with less manual coordination.",
      date: "2023-09-13",
      lastUpdated: "2025-09-10",
      tags: ["Automation", "API", "UI"],
      url: "",
      metric: "",
      images: [
        new URL("../assets/images/projects/linkedin-posting-tool/text-post.png", import.meta.url).href,
        new URL("../assets/images/projects/linkedin-posting-tool/image-post.png", import.meta.url).href,
      ],
      live: "",      duration: "",
      problem:
        "Publishing to LinkedIn involved repetitive steps and coordination overhead that made the workflow harder to scale.",
      solution:
        "Built an internal posting workflow to support LinkedIn publishing with a more structured, repeatable process for preparing and managing posts.",
      stakeholders: [],
    },
{
      slug: "video-report-ticket-delivery-system",
      employer: "Trend Hunter",
      company: "Trend Hunter",
      department: "Client Relations & Product",
      title: "Video Report Ticket & Delivery System",
      excerpt:
        "A workflow system for managing the intake, production, and delivery of video reports with clearer status tracking and less manual follow-up.",
      date: "2023-07-05",
      lastUpdated: "2025-09-10",
      tags: ["Workflow", "Automation", "UI"],
      url: "",
      metric: "",
      images: [
        new URL("../assets/images/projects/video-report-ticket-delivery-system/video-request.png", import.meta.url).href,
      ],
      live: "",      duration: "",
      problem:
        "Video report requests and deliveries needed a clearer operational workflow to reduce ambiguity, missed handoffs, and manual tracking.",
      solution:
        "Built a ticketing and delivery workflow that organized requests, tracked progress, and made report fulfillment more consistent from intake to final delivery.",
      stakeholders: [
        { name: "Andrew Chow", role: "VP of Video Production, Trend Hunter" },
        { name: "Zahra Karim", role: "Senior Research Manager, Trend Hunter" },
        { name: "Mishal Omar", role: "Managing Insights Editor, Trend Hunter" },
      ],
    },
{
      slug: "artemis-athena",
      employer: "Trend Hunter",
      company: "Trend Hunter & McClatchy",
      department: "Engineering, Editorial & Strategy",
      title: "Artemis / Athena",
      excerpt:
        "An internal design system and interface initiative focused on creating a more consistent foundation for product experiences across Trend Hunter tools.",
      date: "2024-03-04",
      lastUpdated: "2024-07-26",
      tags: ["UI", "PHP", "Design Systems"],
      url: "",
      metric: "",
      images: [
        new URL("../assets/images/projects/artemis-athena/artemis-home.png", import.meta.url).href,
        new URL("../assets/images/projects/artemis-athena/athena-home.png", import.meta.url).href,
        new URL("../assets/images/projects/artemis-athena/athena-result.png", import.meta.url).href,
        new URL("../assets/images/projects/artemis-athena/artemis-result.png", import.meta.url).href,
      ],
      live: "",      duration: "",
      problem:
        "Internal tools had begun to diverge in UI patterns and implementation, creating inconsistency for users and extra overhead for development.",
      solution:
        "Developed shared interface patterns and reusable frontend structure to create a more consistent design and development foundation across internal products. This project was also a key contributor to the Trend Hunter acquisition.",
      stakeholders: [
        { name: "Derek Cohen", role: "CTO, Trend Hunter" },
        { name: "Jeremy Gutsche", role: "CEO, Trend Hunter" },
        { name: "Matthew Hart", role: "VP of DEV, Trend Hunter" },
        { name: "Armida Ascano", role: "Chief Insights Officer, Trend Hunter" },
      ],
    }

  ],
};