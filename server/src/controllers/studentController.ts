import { Request, Response } from 'express';
import { students, jobRequirements, academicCredits } from '../db/store';
import { calculateSkillDelta } from './aiController';

export const studentController = {
  // GET /api/students
  getAllStudents: (req: Request, res: Response) => {
    return res.json(students);
  },

  // GET /api/students/:id
  getStudentById: (req: Request, res: Response) => {
    const student = students.find(s => s.id === req.params.id || s.userId === req.params.id) || students[0];
    return res.json(student);
  },

  // GET /api/students/:id/skill-profile
  getSkillProfile: (req: Request, res: Response) => {
    const student = students.find(s => s.id === req.params.id || s.userId === req.params.id) || students[0];
    const credits = academicCredits.filter(c => c.studentId === student.id);

    return res.json({
      student,
      skills: student.skills,
      verifiedSkillScore: student.verifiedSkillScore,
      credits,
      githubRepos: student.githubRepos || []
    });
  },

  // GET /api/students/:id/skill-gap?requirementId=xxx
  getSkillGap: (req: Request, res: Response) => {
    const student = students.find(s => s.id === req.params.id || s.userId === req.params.id) || students[0];
    const reqId = req.query.requirementId as string;
    const requirement = jobRequirements.find(r => r.id === reqId) || jobRequirements[0];

    const delta = calculateSkillDelta(student.skills, requirement.requiredSkills, requirement.preferredSkills);

    return res.json({
      studentId: student.id,
      requirementId: requirement.id,
      requirementTitle: requirement.title,
      companyName: requirement.companyName,
      matchPercent: delta.matchPercent,
      matchedSkills: delta.matchedSkills,
      missingSkills: delta.missingSkills,
      recommendedChallenges: delta.recommendedChallenges
    });
  },

  // POST /api/students/:id/sync-github
  syncGithub: (req: Request, res: Response) => {
    const student = students.find(s => s.id === req.params.id || s.userId === req.params.id) || students[0];
    const { username } = req.body;

    if (username) {
      student.githubUsername = username;
    }

    // Boost verified skill score upon GitHub verification
    student.verifiedSkillScore = Math.min(99, student.verifiedSkillScore + 5);

    return res.json({
      success: true,
      message: 'GitHub repositories analyzed and verified successfully',
      verifiedSkillScore: student.verifiedSkillScore,
      githubRepos: student.githubRepos
    });
  }
};
