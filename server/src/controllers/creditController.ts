import { Request, Response } from 'express';
import { academicCredits, students } from '../db/store';

export const creditController = {
  // GET /api/credits/pending
  getPendingCredits: (req: Request, res: Response) => {
    const pending = academicCredits.filter(c => c.status === 'pending');
    return res.json(pending);
  },

  // GET /api/credits
  getAllCredits: (req: Request, res: Response) => {
    return res.json(academicCredits);
  },

  // POST /api/credits/:id/approve (1-Click TPO Approval Action)
  approveCredit: (req: Request, res: Response) => {
    const creditId = req.params.id;
    const { signedByTpo } = req.body;

    const credit = academicCredits.find(c => c.id === creditId);
    if (!credit) {
      return res.status(404).json({ error: 'Credit request not found' });
    }

    credit.status = 'approved';
    credit.approvedDate = new Date().toISOString().split('T')[0];
    credit.signedByTpo = signedByTpo || 'Dr. Ramesh Sundaram (TPO Head)';

    // Update student official academic transcript
    const student = students.find(s => s.id === credit.studentId);
    if (student) {
      student.totalCreditsEarned += credit.creditsRequested;
    }

    return res.json({
      success: true,
      message: `Academic credits (${credit.creditsRequested} credits) approved for ${credit.studentName}!`,
      credit,
      studentUpdatedCredits: student?.totalCreditsEarned
    });
  },

  // POST /api/credits/:id/reject
  rejectCredit: (req: Request, res: Response) => {
    const creditId = req.params.id;
    const credit = academicCredits.find(c => c.id === creditId);
    if (!credit) {
      return res.status(404).json({ error: 'Credit request not found' });
    }

    credit.status = 'rejected';
    return res.json({ success: true, message: 'Credit request rejected', credit });
  }
};
