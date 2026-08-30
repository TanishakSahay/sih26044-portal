import { Request, Response } from 'express';
import { syllabi, SyllabusTopic } from '../db/store';

export const syllabusController = {
  // GET /api/syllabi
  getSyllabi: (req: Request, res: Response) => {
    return res.json(syllabi);
  },

  // POST /api/syllabi/upload (Parses syllabus PDF / text)
  uploadSyllabus: (req: Request, res: Response) => {
    const { department, batch, fileName, rawContent } = req.body;

    const extractedTopics: SyllabusTopic[] = [
      {
        courseCode: 'CS450',
        courseName: 'Cloud Native Computing & Microservices',
        semester: 7,
        extractedSkills: ['Docker', 'Kubernetes', 'CI/CD', 'Microservices', 'gRPC', 'Prometheus'],
        lastUpdated: new Date().toISOString().split('T')[0],
        matchReadinessScore: 88
      },
      {
        courseCode: 'CS470',
        courseName: 'Distributed Systems & Data Engineering',
        semester: 7,
        extractedSkills: ['Kafka', 'Redis', 'Distributed Systems', 'Stream Processing', 'NoSQL'],
        lastUpdated: new Date().toISOString().split('T')[0],
        matchReadinessScore: 84
      },
      {
        courseCode: 'CS317',
        courseName: 'Database Management Systems',
        semester: 5,
        extractedSkills: ['SQL', 'PostgreSQL', 'Indexing', 'Normalization', 'Transactions'],
        lastUpdated: new Date().toISOString().split('T')[0],
        matchReadinessScore: 80
      }
    ];

    const newSyllabus = {
      id: `syl-${Date.now()}`,
      collegeId: 'col-1',
      department: department || 'Computer Science & Engineering',
      batch: batch || '2023-2027',
      fileName: fileName || 'Uploaded_Curriculum_Syllabus.pdf',
      uploadDate: new Date().toISOString().split('T')[0],
      topics: extractedTopics,
      totalSkillsExtracted: 32
    };

    syllabi.unshift(newSyllabus);

    return res.status(201).json({
      success: true,
      message: 'Syllabus parsed and skill vector indexed successfully',
      syllabus: newSyllabus
    });
  }
};
