import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Path to our JSON database
const dataFilePath = path.join(__dirname, '../data/portfolio.json');

export const getPortfolioData = (req: Request, res: Response): void => {
  try {
    const rawData = fs.readFileSync(dataFilePath, 'utf-8');
    res.status(200).json(JSON.parse(rawData));
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Failed to read portfolio data.' });
  }
};

export const updatePortfolioData = (req: Request, res: Response): void => {
  try {
    // req.body contains the updated JSON from your Admin Dashboard
    const newData = req.body;
    
    // Write it back to the file, nicely formatted with 2 spaces
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2), 'utf-8');
    
    res.status(200).json({ success: true, message: 'Data updated successfully!' });
  } catch (error) {
    console.error('Error writing data:', error);
    res.status(500).json({ error: 'Failed to update portfolio data.' });
  }
};