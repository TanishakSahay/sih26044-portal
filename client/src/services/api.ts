import {
  User,
  Student,
  JobRequirement,
  MicroChallenge,
  AcademicCredit,
  InternshipEvaluation,
  TpoBatchAnalytics,
  Syllabus,
  CapstoneProject
} from '../types';

const API_BASE = '/api';

export const api = {
  // Auth
  login: async (email: string, role: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role })
      });
      return await res.json();
    } catch {
      return { user: { role, name: 'Demo User' } };
    }
  },

  getMe: async (role?: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/me?role=${role || 'student'}`);
      return await res.json();
    } catch {
      return null;
    }
  },

  // Student
  getStudentProfile: async (id: string = 'std-1') => {
    try {
      const res = await fetch(`${API_BASE}/students/${id}/skill-profile`);
      return await res.json();
    } catch {
      return null;
    }
  },

  getSkillGap: async (studentId: string = 'std-1', requirementId: string = 'req-1') => {
    try {
      const res = await fetch(`${API_BASE}/students/${studentId}/skill-gap?requirementId=${requirementId}`);
      return await res.json();
    } catch {
      return null;
    }
  },

  syncGithub: async (studentId: string = 'std-1', username: string = 'aaravpatel-dev') => {
    try {
      const res = await fetch(`${API_BASE}/students/${studentId}/sync-github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      return await res.json();
    } catch {
      return { success: true, verifiedSkillScore: 89 };
    }
  },

  // Requirements & Recruiter
  getRequirements: async () => {
    try {
      const res = await fetch(`${API_BASE}/requirements`);
      return await res.json();
    } catch {
      return [];
    }
  },

  getRequirementMatches: async (requirementId: string = 'req-1') => {
    try {
      const res = await fetch(`${API_BASE}/requirements/${requirementId}/matches`);
      return await res.json();
    } catch {
      return { candidates: [] };
    }
  },

  createRequirement: async (data: Partial<JobRequirement>) => {
    try {
      const res = await fetch(`${API_BASE}/requirements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch {
      return data;
    }
  },

  // Micro-Challenges & Code Sandbox
  getChallenges: async () => {
    try {
      const res = await fetch(`${API_BASE}/challenges`);
      return await res.json();
    } catch {
      return [];
    }
  },

  submitChallenge: async (challengeId: string, studentId: string, code: string) => {
    try {
      const res = await fetch(`${API_BASE}/challenges/${challengeId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, code })
      });
      return await res.json();
    } catch {
      return { success: true, passed: true, earnedPoints: 80, newVerifiedSkillScore: 88 };
    }
  },

  // TPO & Syllabi
  getSyllabi: async () => {
    try {
      const res = await fetch(`${API_BASE}/syllabi`);
      return await res.json();
    } catch {
      return [];
    }
  },

  uploadSyllabus: async (data: { department: string; batch: string; fileName: string; rawContent?: string }) => {
    try {
      const res = await fetch(`${API_BASE}/syllabi/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  getTpoAnalytics: async (collegeId: string = 'col-1') => {
    try {
      const res = await fetch(`${API_BASE}/tpo/${collegeId}/analytics`);
      return await res.json();
    } catch {
      return null;
    }
  },

  getCapstones: async () => {
    try {
      const res = await fetch(`${API_BASE}/tpo/capstones`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createCapstone: async (data: Partial<CapstoneProject>) => {
    try {
      const res = await fetch(`${API_BASE}/tpo/capstones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch {
      return data;
    }
  },

  // Credits
  getPendingCredits: async () => {
    try {
      const res = await fetch(`${API_BASE}/credits/pending`);
      return await res.json();
    } catch {
      return [];
    }
  },

  approveCredit: async (creditId: string, signedByTpo?: string) => {
    try {
      const res = await fetch(`${API_BASE}/credits/${creditId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signedByTpo })
      });
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  // Internships
  submitEvaluation: async (studentId: string, data: Partial<InternshipEvaluation>) => {
    try {
      const res = await fetch(`${API_BASE}/internships/${studentId}/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch {
      return { success: true };
    }
  }
};
