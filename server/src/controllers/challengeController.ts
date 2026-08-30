import { Request, Response } from 'express';
import { microChallenges, students, MicroChallenge } from '../db/store';

export const challengeController = {
  // GET /api/challenges
  getAllChallenges: (req: Request, res: Response) => {
    return res.json(microChallenges);
  },

  // GET /api/challenges/recommended?studentId=xxx
  getRecommendedChallenges: (req: Request, res: Response) => {
    const studentId = req.query.studentId as string;
    const student = students.find(s => s.id === studentId || s.userId === studentId) || students[0];

    // Identify skills where student level < 80 or not verified
    const weakSkills = student.skills
      .filter(s => s.level < 80 || !s.verified)
      .map(s => s.name.toLowerCase());

    const recommended = microChallenges.filter(ch =>
      weakSkills.some(ws => ws.includes(ch.skillTarget.toLowerCase()) || ch.skillTarget.toLowerCase().includes(ws))
    );

    return res.json(recommended.length > 0 ? recommended : microChallenges);
  },

  // POST /api/challenges/:id/submit
  submitChallenge: (req: Request, res: Response) => {
    const challengeId = req.params.id;
    const { studentId, code } = req.body;

    const challenge = microChallenges.find(c => c.id === challengeId);
    if (!challenge) {
      return res.status(404).json({ error: 'Micro-challenge not found' });
    }

    const student = students.find(s => s.id === studentId || s.userId === studentId) || students[0];

    // Validate tests
    const passed = true; // In production sandbox, runs test cases
    const earnedPoints = challenge.points;

    // Upgrade student skill status
    const existingSkill = student.skills.find(s => s.name.toLowerCase() === challenge.skillTarget.toLowerCase());
    if (existingSkill) {
      existingSkill.verified = true;
      existingSkill.verifiedSource = 'micro-challenge';
      existingSkill.level = Math.min(100, existingSkill.level + 15);
    } else {
      student.skills.push({
        name: challenge.skillTarget,
        category: 'tools',
        level: 80,
        verified: true,
        verifiedSource: 'micro-challenge'
      });
    }

    student.completedChallengesCount += 1;
    student.verifiedSkillScore = Math.min(99, student.verifiedSkillScore + 3);

    return res.json({
      success: true,
      passed,
      earnedPoints,
      newVerifiedSkillScore: student.verifiedSkillScore,
      skillTarget: challenge.skillTarget,
      message: `Verified Skill Score upgraded! Mastered ${challenge.skillTarget}.`
    });
  }
};
