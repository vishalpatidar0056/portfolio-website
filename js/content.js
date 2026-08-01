

export const content = {
  profile: {
    name: 'Vishal Patidar',
    tagline: 'BA English Literature student exploring Data Analytics and Web Development — reading data as closely as I read a text, and building solutions that tell meaningful stories.',
    location: 'Dugarpur, Rajasthan, India',
    email: 'vishalpatidar0056@gmail.com',
    phone: '+91 96640 24018',
    linkedin: 'https://www.linkedin.com/in/vishal-patidar-04b042353',
    github: 'https://www.github.com/vishalpatidar0056',
    instagram: 'https://www.instagram.com/vishal_patidar0506',
    photo: 'images/myself.jpeg',
    bio: 'I am currently pursuing my second year of a BA in English Literature at Vardhman Mahaveer Open University, Kota, while independently building practical skills in data analytics, web development, and applied generative AI. I enjoy combining analytical thinking with creativity, using technology to solve real-world problems and transform ideas into useful digital experiences. My journey has been driven by curiosity and continuous learning rather than following a traditional path. Alongside my degree, I have completed professional job-simulation programs and spend much of my time exploring modern development tools, AI-assisted workflows, and data-driven decision-making. Whether I am building websites, experimenting with new technologies, or analyzing datasets, I enjoy understanding how things work beneath the surface. Studying English Literature has strengthened my ability to think critically, communicate clearly, and recognize patterns in complex information. In many ways, data analytics feels similar to literary analysis — both involve looking beyond what is immediately visible to uncover meaningful insights and tell compelling stories. I am passionate about lifelong learning and believe that the best way to grow is by building, experimenting, and improving every day. My goal is to become a versatile technology professional who combines strong analytical skills, modern AI tools, and thoughtful design to create solutions that make a real impact.'
  },

  education: {
    degree: 'BA, English Literature (2nd year)',
    institution: 'Vardhman Mahaveer Open University, Kota',
    location: 'Udaipur, Rajasthan, India',
    classes: ['12th (89.40%) — 2022–2024', '10th (87%) — 2020–2021'],
    schools: ['Govt. Senior Secondary School, Dugarpur, Rajasthan, India', 'Govt. Senior Secondary School, Kariyana, Rajasthan, India']
  },

  // Each key becomes an orbiting cluster of satellite nodes on the Skills planet
  skills: {
    'Data & Analytics': ['Advanced Excel', 'VLOOKUP', 'Pivot Tables', 'Macros', 'Google Sheets', 'Power BI', 'Tableau', 'Data Cleaning', 'EDA', 'Data Visualization', 'KPI Reporting'],
    'AI & Tools': ['Prompt Engineering', 'ChatGPT', 'Gemini', 'Predictive Modeling', 'No-Code ML', 'MS Office Suite', 'Google Workspace', 'Notion', 'GitHub', 'VS Code', 'Cursor AI', 'Midjourney'],
    'Programming': ['HTML', 'Python', 'CSS', 'JAVA', 'MySQL'],
    'Domain Knowledge': ['Risk Analytics', 'Customer Behavior Analysis', 'Data Labeling', 'Trust & Safety', 'Forensic Data Analysis'],
    'Soft Skills': ['Analytical Thinking', 'Research', 'Documentation', 'Problem Solving']
  },

  // Stations along the Experience railway, oldest to newest
  experience: [
    {
      role: 'GenAI Powered Data Analytics',
      organization: 'Tata iQ',
      program: 'Forage job simulation',
      date: '2026',
      bullets: [
        'Conducted EDA using GenAI tools to assess data quality and identify risk indicators for financial services',
        'Proposed a no-code predictive modeling framework to assess customer delinquency risk',
        'Designed an AI-driven collections strategy using agentic AI, with a focus on ethical AI and regulatory compliance'
      ]
    },
    {
      role: 'Data Science',
      organization: 'British Airways',
      program: 'Forage job simulation',
      date: 'June 2026',
      bullets: [
        'Scraped and analyzed customer review data to identify key drivers of customer satisfaction',
        'Built a predictive model to understand factors influencing customer buying behavior',
        'Presented data-driven insights to support business strategy'
      ]
    },
    {
      role: 'Data Analytics',
      organization: 'Deloitte Australia',
      program: 'Forage job simulation',
      date: 'June 2026',
      bullets: [
        'Created an interactive data dashboard using Tableau for client presentation',
        'Used Excel to classify data, perform analysis, and draw actionable business conclusions',
        'Applied forensic technology techniques to evaluate datasets'
      ]
    },
    {
      role: 'Data Labeling',
      organization: 'Forage Academy',
      program: 'Forage job simulation',
      date: 'June 2026',
      bullets: [
        'Classified 500+ customer support messages for Intent, Sentiment, and PII with 98% consistency',
        'Evaluated edge cases and wrote rationales to improve labeling guidelines'
      ]
    }
  ],

  // Each becomes a floating building on the Projects planet
  projects: [
    {
      title: 'AI-Powered Reporting Automation',
      image: 'images/GEN ai.png',
      bullets: [
        'Built AI workflows to automate weekly reports, reducing manual time by 40%',
        'Used ChatGPT + Google Sheets for data summarization and insight generation'
      ]
    },
    {
      title: 'British Airways Data Science Job Simulation',
      image: 'images/data secience.jpg',
      bullets: [
        'Built a predictive model to understand factors that influence buying behaviour',
        'Scraped and analyzed customer review data to identify key drivers of customer satisfaction',
        'Presented data-driven insights to support business strategy'
      ]
    },
    {
      title: 'Data Labeling Job Simulation',
      image: 'images/forge data labeling.jpg',
      bullets: [
        'Evaluated tricky or ambiguous edge cases, and wrote short rationales justifying final label decisions',
        'Practiced classifying messages for Intent, Sentiment, and PII using a consistent labeling schema',
        'Classified 500+ customer support messages with 98% consistency',
        'Strengthened my ability to apply clear definitions, follow ethical privacy practices, and maintain consistency across data'
      ]
    },
    {
      title: 'Deloitte Data Analytics Job Simulation',
      image: 'images/Data Analytics job simulation.jpg',
      bullets: [
        'Created an interactive data dashboard using Tableau for client presentation',
        'Used Excel to classify data, perform analysis, and draw actionable business conclusions',
        'Applied forensic technology techniques to evaluate datasets',
        'Gained experience in data cleaning, analysis, and visualization to support business decision-making'
      ]
    }
  ],

  // Each becomes an orbiting moon on the Web Applications planet
  websites: [
    {
      title: 'Luffatri AI',
      description: 'Version 1 — a Character-AI style site where you can chat with AI characters, ask questions, roleplay, and have natural conversations. Built with React, FastAPI, and Google Gemini AI.',
      image: 'images/luffatri-ai.jpg',
      url: 'https://luffatri-ai-frontend.onrender.com',
      technologies: ['React', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Google Gemini AI']
    },
    {
      title: 'Multitool Calculator Platform',
      description: 'A web-based utility platform with over 15 dynamic tools — advanced mathematical calculators, programming formatters (JSON/XML), and daily utilities like QR code generation and unit conversion.',
      image: 'images/multitool.png',
      url: 'https://multitool-calculator.netlify.app/',
      technologies: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Lucide Icons', 'Netlify']
    },
    {
      title: 'AI Universe — 3D Neural Operating System',
      description: 'A highly interactive 120Hz 3D AI operating system with a procedural WebGL particle engine, a serverless backend routing to Gemini and Groq APIs, live voice synthesis, stateful local memory, and a glassmorphism UI.',
      image: 'images/ai-universe.png',
      url: 'https://aiuniversechat.netlify.app/',
      technologies: ['TypeScript', 'Three.js', 'Netlify Functions', 'Gemini API', 'Groq API']
    },
    {
      title: 'Nebula Chat — Real-Time Messaging Platform',
      description: 'A full-stack real-time messaging platform with Google OAuth, Supabase backend, dynamic profiles and friend management, in-chat voice notes via MediaRecorder, and RLS-enforced blocking/reporting.',
      image: 'images/Nebula chat.png',
      url: 'https://nebula-chat-gilt.vercel.app/',
      technologies: ['Next.js', 'TypeScript', 'Supabase', 'Framer Motion', 'Vercel']
    },
    {
  title: 'ResumeForge — AI Resume Builder & Career Toolkit',
  description: 'A full-stack SaaS platform for crafting ATS-optimized resumes and AI-tailored cover letters. Features include Supabase authentication and database, real-time resume previews, dynamic form state management, and an interactive user dashboard.',
  image: 'images/Resumesaas.jpg',
  url: 'https://resume-forge-eight-eta.vercel.app/',
  technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vercel']
}
  ],

  // Each becomes a glowing crystal on the Certificates planet
  certificates: [
    {
      name: 'Google Data Analytics Professional Certificate',
      issuer: 'Coursera',
      verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/VFHMRB05XT3W',
      image: 'images/google data certificate.jpeg'
    },
    {
      name: 'Google Advanced Data Analytics Professional Certificate',
      issuer: 'Coursera',
      verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/HK94GB80N3B3',
      image: 'images/google advanced.jpg'
    },
    {
      name: 'Data Analytics',
      issuer: 'Tutedude',
      verifyUrl: null,
      image: 'images/tutedude.png'
    }
  ]
};
