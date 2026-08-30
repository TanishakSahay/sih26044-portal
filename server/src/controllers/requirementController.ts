import { Request, Response } from 'express';
import { jobRequirements, students } from '../db/store';
import { calculateSkillDelta } from './aiController';

export const requirementController = {
  // GET /api/requirements
  getAllRequirements: (req: Request, res: Response) => {
    return res.json(jobRequirements);
  },

  // GET /api/requirements/:id
  getRequirementById: (req: Request, res: Response) => {
    const requirement = jobRequirements.find(r => r.id === req.params.id) || jobRequirements[0];
    return res.json(requirement);
  },

  // POST /api/requirements
  createRequirement: (req: Request, res: Response) => {
    const {
      title,
      companyName,
      department,
      location,
      type,
      stipendOrSalary,
      description,
      requiredSkills,
      preferredSkills,
      minCgpa,
      minSkillScore,
      openings
    } = req.body;

    const newReq = {
      id: `req-${Date.now()}`,
      recruiterId: 'usr-recruiter-1',
      companyName: companyName || 'Innovate Tech',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      title: title || 'Full Stack Engineer',
      department: department || 'Engineering',
      location: location || 'Bengaluru',
      type: type || 'Internship',
      stipendOrSalary: stipendOrSalary || '₹50,000 / month',
      description: description || 'Seeking passionate developers to solve scale problems.',
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : ['Node.js', 'React', 'PostgreSQL'],
      preferredSkills: Array.isArray(preferredSkills) ? preferredSkills : ['Docker', 'AWS'],
      minCgpa: Number(minCgpa) || 7.5,
      minSkillScore: Number(minSkillScore) || 70,
      openings: Number(openings) || 3,
      applicantsCount: 0,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active' as const
    };

    jobRequirements.unshift(newReq);

    return res.status(201).json(newReq);
  },

  // GET /api/requirements/:id/matches (Ranked Candidates)
  getMatchesForRequirement: (req: Request, res: Response) => {
    const requirement = jobRequirements.find(r => r.id === req.params.id) || jobRequirements[0];

    // Compute skill match for every student
    const candidateRankings = students.map(student => {
      const delta = calculateSkillDelta(student.skills, requirement.requiredSkills, requirement.preferredSkills);
      
      const matchedCount = student.skills.filter(s =>
        requirement.requiredSkills.some(reqSkill => reqSkill.toLowerCase() === s.name.toLowerCase())
      ).length;

      const githubStars = (student.githubRepos || []).reduce((acc, r) => acc + r.stars, 0);

      // Determine hiring stage
      let hiringStage: 'applied' | 'shortlisted' | 'interviewing' | 'offered' | 'hired' = 'applied';
      if (delta.matchPercent >= 85) hiringStage = 'interviewing';
      else if (delta.matchPercent >= 75) hiringStage = 'shortlisted';

      return {
        studentId: student.id,
        name: student.name,
        avatar: student.avatar,
        collegeName: student.collegeName,
        department: student.department,
        matchPercent: delta.matchPercent,
        verifiedSkillScore: student.verifiedSkillScore,
        cgpa: student.cgpa,
        githubStars,
        completedChallengesCount: student.completedChallengesCount,
        matchedSkillsCount: matchedCount,
        hiringStage
      };
    });

    // Rank candidates by Verified Skill Score + Match Percentage
    candidateRankings.sort((a, b) => {
      const scoreA = a.verifiedSkillScore * 0.6 + a.matchPercent * 0.4;
      const scoreB = b.verifiedSkillScore * 0.6 + b.matchPercent * 0.4;
      return scoreB - scoreA;
    });

    return res.json({
      requirement,
      candidates: candidateRankings
    });
  }
};
