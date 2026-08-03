import { Request, Response } from 'express';

const projects = [
  {
    id: 1,
    title: 'CySentinel',
    tags: ['Full-Stack', 'Cybersecurity', 'Informatics'],
    desc: 'A full-stack cybersecurity application developed as a final-year Informatics group project. Features a strictly structured repository and software engineering system documentation.',
    img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    github: 'https://github.com/nkosinathi/Team17-Main', // Add your real link here
    demo: 'https://youtube.com/watch?v=your-demo-link'     // Optional demo link
  },
  {
    id: 2,
    title: 'Mall Tycoon',
    tags: ['PropTech', 'Administration', 'B2B'],
    desc: 'A business-oriented PropTech administration engine designed specifically for mall managers to oversee shop layouts, calculate costs, and manage rent structures effectively.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    github: 'https://github.com/nkosinathi/mall-tycoon',
    // Notice no demo link here - the frontend will automatically handle it!
  },
  {
    id: 3,
    title: 'Chart Analyzer',
    tags: ['JavaFX', 'Desktop App', 'Data Analysis'],
    desc: 'A JavaFX-based desktop software program engineered for comprehensive chart analysis, complete with final packaging and technical documentation.',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    github: 'https://github.com/nkosinathi/Apex-Modulators-Chart-Analyzer',
    demo: 'https://youtube.com/watch?v=chart-demo'
  }
];

export const getProjects = (req: Request, res: Response): void => {
  try {
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};