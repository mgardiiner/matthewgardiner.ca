export const portfolioData = {
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
  projects: [
    {
      slug: "thgpt",
      title: "Trend Hunter GPT",
      excerpt:
        "Hunt hidden opportunities about any topic in any industry. Get insights, trends, downloadable reports and generated product ideas.",
      date: "2025-01-12",
      tags: ["UI", "AI", "PHP", "MySQL", "Design"],
      url: "https://www.trendhunter.ai/gpt",
      // metric: "+60% conversions",
      image: new URL("../assets/images/projects/thgpt.png", import.meta.url)
        .href,
      live: "https://www.trendhunter.ai/gpt",
      hoverVideo: new URL(
        "../assets/videos/projects/thgpt.mp4",
        import.meta.url
      ).href,
      featured: true,
    },
    {
      slug: "trendtangle",
      title: "TrendTangle",
      excerpt:
        "Find real-time trending articles from Facebook, Reddit, Twitter and more utilizing the Newswhip API.",
      date: "2025-02-03",
      tags: ["UI", "AI", "PHP", "MySQL", "Design"],
      // metric: "+40% CTR",
      image: new URL(
        "../assets/images/projects/trendtangle.png",
        import.meta.url
      ).href,
      live: "",
      hoverVideo: new URL(
        "../assets/videos/projects/trendtangle.mp4",
        import.meta.url
      ).href,
      top: true,
    },
    {
      slug: "health-inspection-api",
      title: "Health Inspection API",
      excerpt:
        "Serve health inspection data for restaurants, enabling real-time safety ratings and violation tracking for print publications.",
      date: "2025-10-01",
      tags: ["API", "PHP", "MySQL", "GCP", "Scraping"],
      url: "",
      metric: "",
      image: new URL(
        "../assets/images/projects/health-inspection-api.png",
        import.meta.url
      ).href,
      live: "",
      hoverVideo: "",
      top: true,
    },
    {
      slug: "ecommerce-brief",
      title: "Ecommerce Brief",
      excerpt:
        "A content brief generation tool that streamlines the creation of structured ecommerce article briefs for automating research.",
      date: "2024-05-15",
      tags: ["UI", "PHP", "MySQL", "AI", "GCP"],
      url: "",
      metric: "",
      image: new URL(
        "../assets/images/projects/ecommerce-brief.png",
        import.meta.url
      ).href,
      live: "",
      hoverVideo: new URL(
        "../assets/videos/projects/ecommerce-brief.mp4",
        import.meta.url
      ).href,
      top: true,
    },
    {
      slug: "innovation-assessment",
      title: "Innovation Assessment",
      excerpt:
        "Discover your Innovation Archetype & specific tactics to realize your potential, faster.",
      date: "2023-08-15",
      tags: ["UI", "PHP", "MySQL", "Redesign"],
      url: "https://www.innovationassessment.com",
      image: new URL(
        "../assets/images/projects/innovation-assessment.png",
        import.meta.url
      ).href,
      live: "https://www.innovationassessment.com",
      hoverVideo: new URL(
        "../assets/videos/projects/innovation-assessment.gif",
        import.meta.url
      ).href,
    },
    {
      slug: "print-tools",
      title: "Print Tools",
      excerpt: "Placeholder summary for the Print Tools project.",
      date: "2024-04-10",
      tags: ["UI", "PHP", "Design Systems"],
      url: "",
      metric: "",
      image: "",
      live: "",
      hoverVideo: "",
    },
    {
      slug: "futurist-ticketing",
      title: "Futurist Ticketing",
      excerpt: "Placeholder summary for the Futurist Ticketing project.",
      date: "2024-03-20",
      tags: ["UI", "PHP", "Payments", "API"],
      url: "",
      metric: "",
      image: "",
      live: "",
      hoverVideo: "",
    },
    {
      slug: "trend-hunter-environment-changer-mac",
      title: "Trend Hunter Environment Changer (Mac)",
      excerpt:
        "Placeholder summary for the Trend Hunter Environment Changer (Mac) project.",
      date: "2024-03-01",
      tags: ["Desktop", "Automation", "Tooling"],
      url: "",
      metric: "",
      image: "",
      live: "",
      hoverVideo: "",
    },
    {
      slug: "openai-api",
      title: "OpenAI API",
      excerpt: "Placeholder summary for the OpenAI API project.",
      date: "2024-02-12",
      tags: ["API", "AI", "PHP"],
      url: "",
      metric: "",
      image: "",
      live: "",
      hoverVideo: "",
    },
    {
      slug: "artemis-athena",
      title: "Artemis / Athena",
      excerpt: "Placeholder summary for the Artemis / Athena project.",
      date: "2024-02-01",
      tags: ["UI", "PHP", "Design Systems"],
      url: "",
      metric: "",
      image: "",
      live: "",
      hoverVideo: "",
    },
    {
      slug: "linkedin-posting-tool",
      title: "LinkedIn Posting Tool",
      excerpt: "Placeholder summary for the LinkedIn Posting Tool project.",
      date: "2024-01-15",
      tags: ["Automation", "API", "UI"],
      url: "",
      metric: "",
      image: "",
      live: "",
      hoverVideo: "",
    },
    {
      slug: "slack-applications",
      title: "Slack Applications",
      excerpt: "Placeholder summary for the Slack Applications project.",
      date: "2023-12-10",
      tags: ["API", "Integrations", "UI"],
      url: "",
      metric: "",
      image: "",
      live: "",
      hoverVideo: "",
    },
    {
      slug: "video-report-ticket-delivery-system",
      title: "Video Report Ticket & Delivery System",
      excerpt:
        "Placeholder summary for the Video Report Ticket & Delivery System project.",
      date: "2023-11-20",
      tags: ["Workflow", "Automation", "UI"],
      url: "",
      metric: "",
      image: "",
      live: "",
      hoverVideo: "",
    },
  ],
  testimonials: [
    {
      quote:
        "Fast, thoughtful, and shipped a design system we actually use. The UI quality jumped immediately.",
      name: "Alex Kim",
      title: "Product Lead, Company",
    },
    {
      quote:
        "Took a messy frontend and turned it into a clean Nuxt codebase with real performance wins.",
      name: "Sam Rivera",
      title: "Engineering Manager, Company",
    },
    {
      quote:
        "Great product instincts—helped us clarify what mattered and execute quickly.",
      name: "Jordan Lee",
      title: "Founder, Startup",
    },
  ],
};
