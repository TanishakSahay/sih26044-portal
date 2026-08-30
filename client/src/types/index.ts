export type UserRole = 'student' | 'tpo' | 'recruiter';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
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
  verifiedSkillScore: number; // 0 - 100
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

export interface SkillDeltaResult {
  requirementId: string;
  requirementTitle: string;
  companyName: string;
  matchPercent: number;
  matchedSkills: string[];
  missingSkills: string[];
  syllabusGaps: string[];
  recommendedChallenges: MicroChallenge[];
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

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  studentId: string;
  code: string;
  passed: boolean;
  score: number;
  submittedAt: string;
}

export interface InternshipEvaluation {
  id: string;
  studentId: string;
  studentName: string;
  companyName: string;
  weekNumber: number;
  technicalCompetence: number; // 1-5
  problemSolving: number; // 1-5
  collaboration: number; // 1-5
  overallRating: number; // 1-5
  comments: string;
  recommendedCredits: number;
  evaluatorName: string;
  createdAt: string;
}

export interface CandidateRanking {
  studentId: string;
  name: string;
  avatar: string;
  collegeName: string;
  department: string;
  matchPercent: number;
  verifiedSkillScore: number;
  cgpa: number;
  githubStars: number;
  completedChallengesCount: number;
  matchedSkillsCount: number;
  hiringStage: 'applied' | 'shortlisted' | 'interviewing' | 'offered' | 'hired';
}

export interface TpoBatchAnalytics {
  totalStudents: number;
  readyForPlacementPercent: number;
  averageSkillScore: number;
  pendingCreditApprovals: number;
  topSkillGaps: { skill: string; studentCount: number; frequencyPercent: number }[];
  branchReadiness: {
    branch: string;
    avgReadiness: number;
    placedCount: number;
    totalCount: number;
  }[];
  skillDistribution: {
    skillCategory: string;
    syllabusTaught: number;
    industryDemanded: number;
  }[];
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
