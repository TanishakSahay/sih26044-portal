export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'tpo' | 'recruiter';
  avatar: string;
  collegeId?: string;
  collegeName?: string;
  companyName?: string;
  title?: string;
}

export interface College {
  id: string;
  name: string;
  code: string;
  location: string;
  tier: string;
  activeStudentsCount: number;
  placementRate: number;
}

export interface SyllabusTopic {
  courseCode: string;
  courseName: string;
  semester: number;
  extractedSkills: string[];
  lastUpdated: string;
  matchReadinessScore: number;
}

export interface Syllabus {
  id: string;
  collegeId: string;
  department: string;
  batch: string;
  fileName: string;
  uploadDate: string;
  topics: SyllabusTopic[];
  totalSkillsExtracted: number;
}

export interface StudentSkill {
  name: string;
  category: 'core' | 'framework' | 'tools' | 'cloud' | 'database';
  level: number; // 0 - 100
  verified: boolean;
  verifiedSource?: 'micro-challenge' | 'github' | 'coursework' | 'internship';
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  commitsCount: number;
  detectedSkills: string[];
  url: string;
}

export interface Student {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar: string;
  collegeId: string;
  collegeName: string;
  department: string;
  batch: string;
  cgpa: number;
  verifiedSkillScore: number;
  totalCreditsEarned: number;
  targetCredits: number;
  githubUsername?: string;
  githubRepos?: GitHubRepo[];
  skills: StudentSkill[];
  completedChallengesCount: number;
  currentInternship?: {
    company: string;
    role: string;
    startDate: string;
    mentorName: string;
  };
}

export interface JobRequirement {
  id: string;
  recruiterId: string;
  companyName: string;
  companyLogo?: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Internship' | '6-Month Co-op';
  stipendOrSalary: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  minCgpa: number;
  minSkillScore: number;
  openings: number;
  applicantsCount: number;
  postedDate: string;
  status: 'active' | 'closed';
}

export interface MicroChallenge {
  id: string;
  title: string;
  skillTarget: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  durationMinutes: number;
  points: number;
  description: string;
  starterCode: string;
  language: 'javascript' | 'typescript' | 'python' | 'sql';
  testCases: {
    input: string;
    expectedOutput: string;
    description: string;
  }[];
  solutionSnippet?: string;
}

export interface AcademicCredit {
  id: string;
  studentId: string;
  studentName: string;
  collegeId: string;
  companyName: string;
  internshipRole: string;
  creditsRequested: number;
  status: 'pending' | 'approved' | 'rejected';
  mentorRating: number; // 1 to 5
  mentorFeedback: string;
  submissionDate: string;
  approvedDate?: string;
  signedByTpo?: string;
}

export interface InternshipEvaluation {
  id: string;
  studentId: string;
  studentName: string;
  companyName: string;
  weekNumber: number;
  technicalCompetence: number;
  problemSolving: number;
  collaboration: number;
  overallRating: number;
  comments: string;
  recommendedCredits: number;
  evaluatorName: string;
  createdAt: string;
}

export interface CapstoneProject {
  id: string;
  title: string;
  companyName: string;
  sponsorName: string;
  stipend: string;
  durationMonths: number;
  description: string;
  requiredSkills: string[];
  maxTeams: number;
  enrolledTeams: number;
  deadline: string;
}

// ----------------- IN-MEMORY SEEDED DATABASE -----------------

export const colleges: College[] = [
  {
    id: 'col-1',
    name: 'Indian Institute of Technology Bombay',
    code: 'IITB',
    location: 'Mumbai, Maharashtra',
    tier: 'Tier 1 / Institute of Eminence',
    activeStudentsCount: 3400,
    placementRate: 94.2
  },
  {
    id: 'col-2',
    name: 'National Institute of Technology Tiruchirappalli',
    code: 'NITT',
    location: 'Tiruchirappalli, Tamil Nadu',
    tier: 'Tier 1 / Institute of National Importance',
    activeStudentsCount: 2850,
    placementRate: 91.8
  },
  {
    id: 'col-3',
    name: 'College of Engineering, Guindy (Anna University)',
    code: 'CEG-AU',
    location: 'Chennai, Tamil Nadu',
    tier: 'Tier 1 / State Autonomous',
    activeStudentsCount: 4100,
    placementRate: 88.5
  }
];

export const users: User[] = [
  {
    id: 'usr-student-1',
    name: 'Aarav Patel',
    email: 'aarav.patel@iitb.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    collegeId: 'col-1',
    collegeName: 'IIT Bombay',
    title: 'Final Year B.Tech CSE'
  },
  {
    id: 'usr-tpo-1',
    name: 'Dr. Ramesh Sundaram',
    email: 'tpo.head@iitb.ac.in',
    role: 'tpo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    collegeId: 'col-1',
    collegeName: 'IIT Bombay',
    title: 'Head of Training & Placement'
  },
  {
    id: 'usr-recruiter-1',
    name: 'Pooja Deshmukh',
    email: 'pooja.deshmukh@razorpay.com',
    role: 'recruiter',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    companyName: 'Razorpay',
    title: 'Lead Technical Talent Partner'
  }
];

export const syllabi: Syllabus[] = [
  {
    id: 'syl-1',
    collegeId: 'col-1',
    department: 'Computer Science & Engineering',
    batch: '2022-2026',
    fileName: 'IITB_CSE_Curriculum_R22.pdf',
    uploadDate: '2024-07-15',
    totalSkillsExtracted: 28,
    topics: [
      {
        courseCode: 'CS213',
        courseName: 'Data Structures & Algorithms',
        semester: 3,
        extractedSkills: ['C++', 'Data Structures', 'Algorithms', 'Trees', 'Graphs', 'Dynamic Programming'],
        lastUpdated: '2022-06-10',
        matchReadinessScore: 82
      },
      {
        courseCode: 'CS317',
        courseName: 'Database and Information Systems',
        semester: 5,
        extractedSkills: ['SQL', 'Relational Database', 'Indexing', 'Normalization', 'ACID Transactions'],
        lastUpdated: '2022-06-10',
        matchReadinessScore: 78
      },
      {
        courseCode: 'CS348',
        courseName: 'Computer Networks & Distributed Systems',
        semester: 6,
        extractedSkills: ['TCP/IP', 'HTTP/HTTPS', 'Socket Programming', 'REST APIs', 'DNS Architecture'],
        lastUpdated: '2022-06-10',
        matchReadinessScore: 74
      },
      {
        courseCode: 'CS415',
        courseName: 'Web & Distributed Applications',
        semester: 7,
        extractedSkills: ['JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Express', 'JWT Authentication'],
        lastUpdated: '2023-01-15',
        matchReadinessScore: 71
      }
    ]
  }
];

export const microChallenges: MicroChallenge[] = [
  {
    id: 'mc-1',
    title: 'Docker Multi-Stage Build & Container Optimization',
    skillTarget: 'Docker',
    difficulty: 'Medium',
    durationMinutes: 25,
    points: 80,
    description: 'Optimize a Node.js microservice Dockerfile using multi-stage build caching, non-root user execution, and slim alpine base image.',
    language: 'javascript',
    starterCode: `// Function to validate container security & size parameters
function optimizeContainerConfig(config) {
  const isMultiStage = config.stages >= 2;
  const isNonRoot = config.user !== 'root' && config.user !== '0';
  const isSlim = config.baseImage.includes('alpine') || config.baseImage.includes('slim');
  
  return {
    valid: isMultiStage && isNonRoot && isSlim,
    score: (isMultiStage ? 35 : 0) + (isNonRoot ? 35 : 0) + (isSlim ? 30 : 0),
    efficiencyRating: isMultiStage && isNonRoot && isSlim ? 'A+' : 'C'
  };
}

// Test call
console.log(optimizeContainerConfig({ stages: 2, user: 'node', baseImage: 'node:20-alpine' }));
`,
    testCases: [
      {
        input: "{ stages: 2, user: 'node', baseImage: 'node:20-alpine' }",
        expectedOutput: "{ valid: true, score: 100, efficiencyRating: 'A+' }",
        description: 'Valid multi-stage alpine container with non-root user'
      },
      {
        input: "{ stages: 1, user: 'root', baseImage: 'node:20' }",
        expectedOutput: "{ valid: false, score: 0, efficiencyRating: 'C' }",
        description: 'Unoptimized single-stage root container'
      }
    ]
  },
  {
    id: 'mc-2',
    title: 'Redis Distributed Rate Limiter (Token Bucket)',
    skillTarget: 'Redis',
    difficulty: 'Hard',
    durationMinutes: 35,
    points: 120,
    description: 'Implement a Token Bucket rate limiting algorithm logic suitable for high-throughput Redis Lua scripts to throttle API abuse.',
    language: 'javascript',
    starterCode: `function checkRateLimit(key, capacity, refillRatePerSec, currentTokens, lastRefillTime, requestedTokens) {
  const now = Date.now() / 1000;
  const timeElapsed = Math.max(0, now - lastRefillTime);
  const updatedTokens = Math.min(capacity, currentTokens + (timeElapsed * refillRatePerSec));
  
  if (updatedTokens >= requestedTokens) {
    return {
      allowed: true,
      remainingTokens: Math.floor(updatedTokens - requestedTokens)
    };
  }
  return {
    allowed: false,
    remainingTokens: Math.floor(updatedTokens)
  };
}
`,
    testCases: [
      {
        input: "Refill check when tokens available",
        expectedOutput: "{ allowed: true, remainingTokens: 4 }",
        description: 'Allows request when capacity is sufficient'
      }
    ]
  },
  {
    id: 'mc-3',
    title: 'Kubernetes Rolling Update & Liveness Probes',
    skillTarget: 'Kubernetes',
    difficulty: 'Medium',
    durationMinutes: 30,
    points: 90,
    description: 'Construct a resilient Kubernetes Deployment manifest validator with maxSurge, maxUnavailable, and readiness probe definitions.',
    language: 'javascript',
    starterCode: `function validateK8sDeployment(spec) {
  const hasProbes = spec.livenessProbe && spec.readinessProbe;
  const hasZeroDowntimeStrategy = spec.strategy?.rollingUpdate?.maxUnavailable === '0%' || spec.strategy?.rollingUpdate?.maxUnavailable === 0;
  
  return {
    isProductionReady: hasProbes && hasZeroDowntimeStrategy,
    resilienceScore: (hasProbes ? 50 : 0) + (hasZeroDowntimeStrategy ? 50 : 0)
  };
}
`,
    testCases: [
      {
        input: "Full spec with probes & zero maxUnavailable",
        expectedOutput: "{ isProductionReady: true, resilienceScore: 100 }",
        description: 'Confirms zero downtime configuration'
      }
    ]
  },
  {
    id: 'mc-4',
    title: 'PostgreSQL Index Optimization & Query Plan',
    skillTarget: 'PostgreSQL',
    difficulty: 'Easy',
    durationMinutes: 20,
    points: 60,
    description: 'Identify composite B-Tree index suitability for multi-column WHERE clause filters on high cardinality tables.',
    language: 'javascript',
    starterCode: `function suggestIndex(queryFilters, tableColumns) {
  const indexedCols = queryFilters.filter(col => tableColumns.includes(col));
  const isComposite = indexedCols.length > 1;
  
  return {
    recommendedType: isComposite ? 'BTREE_COMPOSITE' : 'BTREE_SINGLE',
    columns: indexedCols,
    estimatedCostReductionPercent: isComposite ? 85 : 45
  };
}
`,
    testCases: [
      {
        input: "Filters: ['user_id', 'status', 'created_at']",
        expectedOutput: "{ recommendedType: 'BTREE_COMPOSITE', estimatedCostReductionPercent: 85 }",
        description: 'Recommends composite index'
      }
    ]
  },
  {
    id: 'mc-5',
    title: 'Kafka Event Stream Consumer with Idempotency',
    skillTarget: 'Kafka',
    difficulty: 'Hard',
    durationMinutes: 40,
    points: 130,
    description: 'Implement an idempotent message consumer processor that ensures duplicate event keys from Kafka partition rebalancing are ignored safely.',
    language: 'javascript',
    starterCode: `function processKafkaMessage(messageId, processedIdsSet, payload) {
  if (processedIdsSet.has(messageId)) {
    return { status: 'DUPLICATE_IGNORED', applied: false };
  }
  processedIdsSet.add(messageId);
  return { status: 'SUCCESS', applied: true, event: payload.type };
}
`,
    testCases: [
      {
        input: "Duplicate messageId check",
        expectedOutput: "{ status: 'DUPLICATE_IGNORED', applied: false }",
        description: 'Protects state against duplicate offset deliveries'
      }
    ]
  }
];

export const jobRequirements: JobRequirement[] = [
  {
    id: 'req-1',
    recruiterId: 'usr-recruiter-1',
    companyName: 'Razorpay',
    companyLogo: 'https://cdn.razorpay.com/static-assets/razorpay.png',
    title: 'Fintech Backend Infrastructure Intern',
    department: 'Core Payments & Settlements',
    location: 'Bengaluru (Hybrid)',
    type: 'Internship',
    stipendOrSalary: '₹65,000 / month + PPO (₹24 LPA)',
    description: 'Join the Core Banking & Payments team to architect distributed transaction settlement engines handling 15,000+ TPS. Requires strong systems fundamentals, Redis caching, Docker, and PostgreSQL.',
    requiredSkills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs', 'Distributed Systems'],
    preferredSkills: ['Kafka', 'Kubernetes', 'Go', 'AWS'],
    minCgpa: 8.0,
    minSkillScore: 75,
    openings: 5,
    applicantsCount: 42,
    postedDate: '2024-08-20',
    status: 'active'
  },
  {
    id: 'req-2',
    recruiterId: 'usr-recruiter-2',
    companyName: 'Google Cloud India',
    companyLogo: 'https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg',
    title: 'Cloud Platforms & SRE Engineering Intern',
    department: 'GCP Core Infrastructure',
    location: 'Hyderabad / Bengaluru',
    type: '6-Month Co-op',
    stipendOrSalary: '₹1,10,000 / month + Housing',
    description: 'Work alongside Google SRE teams deploying resilient Kubernetes clusters, microservices observability with OpenTelemetry, and containerized scale-out workloads.',
    requiredSkills: ['Kubernetes', 'Docker', 'Linux Internals', 'Python', 'Go', 'CI/CD'],
    preferredSkills: ['Terraform', 'Prometheus', 'gRPC'],
    minCgpa: 8.2,
    minSkillScore: 80,
    openings: 8,
    applicantsCount: 68,
    postedDate: '2024-08-18',
    status: 'active'
  },
  {
    id: 'req-3',
    recruiterId: 'usr-recruiter-3',
    companyName: 'Tata Elxsi',
    companyLogo: 'https://www.tataelxsi.com/assets/img/logo.svg',
    title: 'Autonomous Systems & Edge AI Developer',
    department: 'Transportation & Mobility',
    location: 'Pune / Trivandrum',
    type: 'Full-time',
    stipendOrSalary: '₹12 LPA - ₹18 LPA',
    description: 'Developing low-latency computer vision and sensor fusion models for next-generation Connected Autonomous Vehicles. Requires C++, PyTorch, ROS2, and Linux kernel optimization.',
    requiredSkills: ['C++', 'PyTorch', 'Computer Vision', 'Linux', 'ROS2', 'Data Structures'],
    preferredSkills: ['CUDA', 'TensorRT', 'Embedded Systems'],
    minCgpa: 7.5,
    minSkillScore: 70,
    openings: 12,
    applicantsCount: 35,
    postedDate: '2024-08-15',
    status: 'active'
  },
  {
    id: 'req-4',
    recruiterId: 'usr-recruiter-4',
    companyName: 'CRED',
    companyLogo: 'https://web-assets.cred.club/_next/assets/images/home-page/cred-logo.png',
    title: 'Full Stack Product Engineer (Growth)',
    department: 'Rewards & Member Experience',
    location: 'Bengaluru',
    type: 'Internship',
    stipendOrSalary: '₹80,000 / month',
    description: 'Craft high-fidelity, silky-smooth member web & mobile experiences with React, TypeScript, GraphQL, Node.js, and high-performance micro-frontends.',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GraphQL', 'State Management'],
    preferredSkills: ['Next.js', 'Framer Motion', 'Redis'],
    minCgpa: 7.8,
    minSkillScore: 78,
    openings: 4,
    applicantsCount: 51,
    postedDate: '2024-08-22',
    status: 'active'
  },
  {
    id: 'req-5',
    recruiterId: 'usr-recruiter-5',
    companyName: 'Zerodha',
    companyLogo: 'https://zerodha.com/static/images/logo.svg',
    title: 'High-Frequency Trading & Market Systems Engineer',
    department: 'Exchange Gateways & OMS',
    location: 'Bengaluru (On-site)',
    type: 'Full-time',
    stipendOrSalary: '₹22 LPA - ₹30 LPA',
    description: 'Engineers building sub-millisecond websocket market data feeds and order execution engines in Go/Rust with PostgreSQL and Redis.',
    requiredSkills: ['Go', 'PostgreSQL', 'Redis', 'WebSockets', 'Concurrency', 'Networking'],
    preferredSkills: ['Rust', 'ClickHouse', 'Kafka'],
    minCgpa: 8.0,
    minSkillScore: 82,
    openings: 3,
    applicantsCount: 29,
    postedDate: '2024-08-24',
    status: 'active'
  }
];

export const students: Student[] = [
  {
    id: 'std-1',
    userId: 'usr-student-1',
    name: 'Aarav Patel',
    email: 'aarav.patel@iitb.ac.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    collegeId: 'col-1',
    collegeName: 'IIT Bombay',
    department: 'Computer Science & Engineering',
    batch: '2022-2026',
    cgpa: 8.92,
    verifiedSkillScore: 84,
    totalCreditsEarned: 18,
    targetCredits: 24,
    githubUsername: 'aaravpatel-dev',
    completedChallengesCount: 6,
    currentInternship: {
      company: 'Razorpay',
      role: 'Backend Engineering Intern',
      startDate: '2024-05-15',
      mentorName: 'Pooja Deshmukh'
    },
    githubRepos: [
      {
        id: 'repo-1',
        name: 'distributed-kv-store',
        description: 'Raft consensus based distributed key-value store with WAL and snapshotting in Go & gRPC.',
        language: 'Go',
        stars: 38,
        forks: 9,
        commitsCount: 142,
        detectedSkills: ['Go', 'Distributed Systems', 'gRPC', 'Concurrency'],
        url: 'https://github.com/aaravpatel-dev/distributed-kv-store'
      },
      {
        id: 'repo-2',
        name: 'fintech-ledger-engine',
        description: 'Double-entry accounting transaction engine using PostgreSQL ACID transactions & Redis.',
        language: 'TypeScript',
        stars: 24,
        forks: 5,
        commitsCount: 88,
        detectedSkills: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
        url: 'https://github.com/aaravpatel-dev/fintech-ledger-engine'
      }
    ],
    skills: [
      { name: 'C++', category: 'core', level: 90, verified: true, verifiedSource: 'coursework' },
      { name: 'Data Structures', category: 'core', level: 92, verified: true, verifiedSource: 'coursework' },
      { name: 'Algorithms', category: 'core', level: 88, verified: true, verifiedSource: 'coursework' },
      { name: 'Node.js', category: 'framework', level: 86, verified: true, verifiedSource: 'github' },
      { name: 'PostgreSQL', category: 'database', level: 82, verified: true, verifiedSource: 'micro-challenge' },
      { name: 'Redis', category: 'database', level: 80, verified: true, verifiedSource: 'micro-challenge' },
      { name: 'Docker', category: 'tools', level: 75, verified: true, verifiedSource: 'micro-challenge' },
      { name: 'Kubernetes', category: 'cloud', level: 60, verified: false },
      { name: 'Kafka', category: 'cloud', level: 55, verified: false }
    ]
  },
  {
    id: 'std-2',
    userId: 'usr-student-2',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@nitt.edu',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    collegeId: 'col-2',
    collegeName: 'NIT Trichy',
    department: 'Computer Science & Engineering',
    batch: '2022-2026',
    cgpa: 9.15,
    verifiedSkillScore: 89,
    totalCreditsEarned: 20,
    targetCredits: 24,
    githubUsername: 'ananya-iyer',
    completedChallengesCount: 8,
    githubRepos: [
      {
        id: 'repo-3',
        name: 'k8s-autoscaler-mesh',
        description: 'Custom Kubernetes HPA controller utilizing Prometheus custom metrics.',
        language: 'Go',
        stars: 52,
        forks: 14,
        commitsCount: 165,
        detectedSkills: ['Kubernetes', 'Docker', 'Go', 'Prometheus', 'CI/CD'],
        url: 'https://github.com/ananya-iyer/k8s-autoscaler-mesh'
      }
    ],
    skills: [
      { name: 'Kubernetes', category: 'cloud', level: 92, verified: true, verifiedSource: 'github' },
      { name: 'Docker', category: 'tools', level: 90, verified: true, verifiedSource: 'micro-challenge' },
      { name: 'Go', category: 'core', level: 88, verified: true, verifiedSource: 'github' },
      { name: 'Python', category: 'core', level: 85, verified: true, verifiedSource: 'coursework' },
      { name: 'CI/CD', category: 'tools', level: 84, verified: true, verifiedSource: 'micro-challenge' }
    ]
  },
  {
    id: 'std-3',
    userId: 'usr-student-3',
    name: 'Rohan Sengupta',
    email: 'rohan.sengupta@annauniv.edu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    collegeId: 'col-3',
    collegeName: 'Anna University',
    department: 'Information Technology',
    batch: '2022-2026',
    cgpa: 8.45,
    verifiedSkillScore: 78,
    totalCreditsEarned: 14,
    targetCredits: 24,
    githubUsername: 'rohan-sengupta',
    completedChallengesCount: 5,
    skills: [
      { name: 'React', category: 'framework', level: 88, verified: true, verifiedSource: 'micro-challenge' },
      { name: 'TypeScript', category: 'framework', level: 82, verified: true, verifiedSource: 'micro-challenge' },
      { name: 'Tailwind CSS', category: 'framework', level: 85, verified: true, verifiedSource: 'coursework' },
      { name: 'GraphQL', category: 'tools', level: 70, verified: false },
      { name: 'Next.js', category: 'framework', level: 75, verified: false }
    ]
  },
  {
    id: 'std-4',
    userId: 'usr-student-4',
    name: 'Priyanka Sharma',
    email: 'priyanka.s@iitb.ac.in',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    collegeId: 'col-1',
    collegeName: 'IIT Bombay',
    department: 'Electrical Engineering',
    batch: '2022-2026',
    cgpa: 8.78,
    verifiedSkillScore: 81,
    totalCreditsEarned: 16,
    targetCredits: 24,
    githubUsername: 'priyanka-ai',
    completedChallengesCount: 7,
    skills: [
      { name: 'C++', category: 'core', level: 85, verified: true, verifiedSource: 'coursework' },
      { name: 'PyTorch', category: 'framework', level: 88, verified: true, verifiedSource: 'micro-challenge' },
      { name: 'Computer Vision', category: 'core', level: 82, verified: true, verifiedSource: 'coursework' },
      { name: 'ROS2', category: 'tools', level: 65, verified: false }
    ]
  }
];

export const academicCredits: AcademicCredit[] = [
  {
    id: 'crd-1',
    studentId: 'std-1',
    studentName: 'Aarav Patel',
    collegeId: 'col-1',
    companyName: 'Razorpay',
    internshipRole: 'Backend Engineering Intern',
    creditsRequested: 4,
    status: 'pending',
    mentorRating: 4.8,
    mentorFeedback: 'Aarav exhibited stellar mastery of PostgreSQL transactions, containerized service optimization, and solved zero-downtime ledger migration flawlessly.',
    submissionDate: '2024-08-25'
  },
  {
    id: 'crd-2',
    studentId: 'std-2',
    studentName: 'Ananya Iyer',
    collegeId: 'col-2',
    companyName: 'Google Cloud India',
    internshipRole: 'Cloud Platforms Intern',
    creditsRequested: 6,
    status: 'pending',
    mentorRating: 4.9,
    mentorFeedback: 'Outstanding contribution to our Kubernetes ingress controller team. Verified mastery of Go microservices and high-availability deployment patterns.',
    submissionDate: '2024-08-26'
  },
  {
    id: 'crd-3',
    studentId: 'std-3',
    studentName: 'Rohan Sengupta',
    collegeId: 'col-3',
    companyName: 'CRED',
    internshipRole: 'Frontend Engineering Intern',
    creditsRequested: 4,
    status: 'approved',
    mentorRating: 4.7,
    mentorFeedback: 'Delivered member onboarding UI with high animation polish and test coverage.',
    submissionDate: '2024-07-20',
    approvedDate: '2024-08-05',
    signedByTpo: 'Prof. S. Rangarajan (Anna Univ TPO)'
  }
];

export const internshipEvaluations: InternshipEvaluation[] = [
  {
    id: 'eval-1',
    studentId: 'std-1',
    studentName: 'Aarav Patel',
    companyName: 'Razorpay',
    weekNumber: 12,
    technicalCompetence: 5,
    problemSolving: 5,
    collaboration: 4,
    overallRating: 4.8,
    comments: 'Exceptional depth in concurrent systems and database connection pooling. Fast learner.',
    recommendedCredits: 4,
    evaluatorName: 'Pooja Deshmukh (Lead Talent Partner)',
    createdAt: '2024-08-25'
  }
];

export const capstoneProjects: CapstoneProject[] = [
  {
    id: 'cap-1',
    title: 'Real-Time Fraud Detection Pipeline using Apache Flink & Redis',
    companyName: 'Razorpay',
    sponsorName: 'Fintech Security Innovation Labs',
    stipend: '₹1,50,000 grant per team',
    durationMonths: 6,
    description: 'Design and deploy a streaming fraud analytics pipeline capable of flagging suspicious UPI transactions in < 25 milliseconds.',
    requiredSkills: ['Kafka', 'Redis', 'Java / Go', 'Distributed Systems'],
    maxTeams: 4,
    enrolledTeams: 2,
    deadline: '2024-10-15'
  },
  {
    id: 'cap-2',
    title: 'Autonomous Edge Perception for Drone Delivery in Complex Weather',
    companyName: 'Tata Elxsi',
    sponsorName: 'Aerospace & Mobility Group',
    stipend: '₹2,00,000 grant + Hardware Kits',
    durationMonths: 6,
    description: 'Implement real-time obstacle avoidance and visual SLAM on NVIDIA Jetson Orin edge modules.',
    requiredSkills: ['PyTorch', 'C++', 'Computer Vision', 'ROS2'],
    maxTeams: 3,
    enrolledTeams: 1,
    deadline: '2024-10-30'
  }
];
