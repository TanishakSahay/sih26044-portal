import { Request, Response } from 'express';
import { students, colleges, academicCredits, capstoneProjects } from '../db/store';

export const tpoController = {
  // GET /api/tpo/:collegeId/analytics
  getAnalytics: (req: Request, res: Response) => {
    const collegeId = req.params.collegeId || 'col-1';
    const college = colleges.find(c => c.id === collegeId) || colleges[0];
    const collegeStudents = students.filter(s => s.collegeId === collegeId || s.collegeName.includes('IIT'));

    const readyStudents = collegeStudents.filter(s => s.verifiedSkillScore >= 80);
    const readyForPlacementPercent = Math.round((readyStudents.length / Math.max(1, collegeStudents.length)) * 100);
    
    const avgSkillScore = Math.round(
      collegeStudents.reduce((acc, s) => acc + s.verifiedSkillScore, 0) / Math.max(1, collegeStudents.length)
    );

    const pendingCredits = academicCredits.filter(c => c.status === 'pending').length;

    const topSkillGaps = [
      { skill: 'Docker & Containerization', studentCount: 142, frequencyPercent: 68 },
      { skill: 'Kubernetes & Cloud Ops', studentCount: 185, frequencyPercent: 82 },
      { skill: 'Kafka / Event Streaming', studentCount: 160, frequencyPercent: 74 },
      { skill: 'Redis Distributed Caching', studentCount: 110, frequencyPercent: 52 },
      { skill: 'CI/CD Pipelines (GitHub Actions)', studentCount: 95, frequencyPercent: 44 }
    ];

    const branchReadiness = [
      { branch: 'Computer Science & Eng', avgReadiness: 86, placedCount: 145, totalCount: 160 },
      { branch: 'Information Technology', avgReadiness: 79, placedCount: 112, totalCount: 140 },
      { branch: 'Electronics & Comm', avgReadiness: 72, placedCount: 88, totalCount: 130 },
      { branch: 'Electrical Engineering', avgReadiness: 68, placedCount: 65, totalCount: 110 }
    ];

    const skillDistribution = [
      { skillCategory: 'Data Structures & Alg', syllabusTaught: 95, industryDemanded: 90 },
      { skillCategory: 'Relational DB / SQL', syllabusTaught: 85, industryDemanded: 88 },
      { skillCategory: 'Cloud & Containers', syllabusTaught: 30, industryDemanded: 92 },
      { skillCategory: 'Microservices & APIs', syllabusTaught: 45, industryDemanded: 85 },
      { skillCategory: 'DevOps & CI/CD', syllabusTaught: 20, industryDemanded: 80 }
    ];

    return res.json({
      college,
      totalStudents: 480,
      readyForPlacementPercent,
      averageSkillScore: avgSkillScore,
      pendingCreditApprovals: pendingCredits,
      topSkillGaps,
      branchReadiness,
      skillDistribution
    });
  },

  // GET /api/tpo/capstones
  getCapstones: (req: Request, res: Response) => {
    return res.json(capstoneProjects);
  },

  // POST /api/tpo/capstones
  createCapstone: (req: Request, res: Response) => {
    const { title, companyName, sponsorName, stipend, durationMonths, description, requiredSkills, maxTeams } = req.body;
    const newCap = {
      id: `cap-${Date.now()}`,
      title: title || 'Industry Sponsored Capstone',
      companyName: companyName || 'Corporate Partner',
      sponsorName: sponsorName || 'Industry R&D Labs',
      stipend: stipend || '₹1,00,000 grant',
      durationMonths: Number(durationMonths) || 6,
      description: description || 'Collaborative capstone project with real-world mentoring.',
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : ['Python', 'Docker'],
      maxTeams: Number(maxTeams) || 3,
      enrolledTeams: 0,
      deadline: '2024-11-30'
    };

    capstoneProjects.unshift(newCap);
    return res.status(201).json(newCap);
  }
};
