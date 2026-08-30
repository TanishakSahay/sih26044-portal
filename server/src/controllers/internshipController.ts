import { Request, Response } from 'express';
import { internshipEvaluations, academicCredits, students } from '../db/store';

export const internshipController = {
  // GET /api/internships/evaluations
  getEvaluations: (req: Request, res: Response) => {
    return res.json(internshipEvaluations);
  },

  // POST /api/internships/:id/evaluate (Mentor weekly evaluation widget)
  submitEvaluation: (req: Request, res: Response) => {
    const studentId = req.params.id;
    const {
      companyName,
      weekNumber,
      technicalCompetence,
      problemSolving,
      collaboration,
      comments,
      recommendedCredits,
      evaluatorName
    } = req.body;

    const student = students.find(s => s.id === studentId || s.userId === studentId) || students[0];

    const overallRating = Number(
      ((Number(technicalCompetence) + Number(problemSolving) + Number(collaboration)) / 3).toFixed(1)
    );

    const newEvaluation = {
      id: `eval-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      companyName: companyName || 'Razorpay',
      weekNumber: Number(weekNumber) || 1,
      technicalCompetence: Number(technicalCompetence) || 5,
      problemSolving: Number(problemSolving) || 4,
      collaboration: Number(collaboration) || 5,
      overallRating,
      comments: comments || 'Student performed exceptionally on production deliverables.',
      recommendedCredits: Number(recommendedCredits) || 4,
      evaluatorName: evaluatorName || 'Corporate Mentor',
      createdAt: new Date().toISOString().split('T')[0]
    };

    internshipEvaluations.unshift(newEvaluation);

    // Auto-create or update pending academic credit request for TPO approval
    const existingCredit = academicCredits.find(c => c.studentId === student.id && c.status === 'pending');
    if (!existingCredit) {
      academicCredits.unshift({
        id: `crd-${Date.now()}`,
        studentId: student.id,
        studentName: student.name,
        collegeId: student.collegeId,
        companyName: newEvaluation.companyName,
        internshipRole: 'Software Engineering Intern',
        creditsRequested: newEvaluation.recommendedCredits,
        status: 'pending',
        mentorRating: newEvaluation.overallRating,
        mentorFeedback: newEvaluation.comments,
        submissionDate: new Date().toISOString().split('T')[0]
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Weekly intern evaluation recorded and credit approval forwarded to University TPO',
      evaluation: newEvaluation
    });
  }
};
