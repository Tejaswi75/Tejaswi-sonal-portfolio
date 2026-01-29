/* =========================================================
  Site content config
  Update demo/repo links here and the website updates itself.
========================================================= */

window.PORTFOLIO = {
  person: {
    name: "Tejaswi Sonal",
    email: "tejaswisonal2@gmail.com",
    phone: "+91-8210181290",
    github: "https://github.com/Tejaswi75"
  },

  projects: [
    {
      id: "cricklive",
      title: "CrickLive — Real-Time Cricket Score App",
      period: "Jan 2025 – Apr 2025 (Completed)",
      description:
        "A responsive web app that displays live cricket scores using CricAPI with backend integration and fast frontend updates.",
      highlights: [
        "Built a responsive UI to improve real-time data accessibility",
        "Integrated CricAPI via Node.js backend and frontend rendering to reduce load latency",
        "Optimized error handling to improve stability during live match updates"
      ],
      tech: ["Node.js", "JavaScript", "API Integration", "CricAPI"],
      live: "",  // <-- put your live demo URL
      repo: ""   // <-- put your GitHub repo URL
    },
    {
      id: "college-polling",
      title: "College Polling App — Online Voting Platform",
      period: "Aug 2024 – Nov 2024 (Completed)",
      description:
        "A secure campus polling system with role-based access and one-vote-per-user enforcement using Supabase authentication.",
      highlights: [
        "Designed and developed a secure online polling system for campus elections",
        "Enforced one-vote-per-user logic using Supabase authentication to reduce duplicate voting attempts",
        "Created mobile-friendly UI templates to improve participation and accessibility"
      ],
      tech: ["Supabase", "Auth", "Role-based Access", "UI Templates"],
      live: "",  // <-- put your live demo URL
      repo: ""   // <-- put your GitHub repo URL
    }
  ]
};
