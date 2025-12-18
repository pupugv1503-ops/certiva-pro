import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import Certificate from '../models/Certificate';
import User from '../models/User';
import Course from '../models/Course';
import { v4 as uuidv4 } from 'uuid';

// @desc    Generate a certificate
// @route   POST /api/certificates/generate
// @access  Private
export const generateCertificate = async (req: Request, res: Response) => {
  const { courseId } = req.body;
  const user = req.user;

  try {
    // Check if certificate already exists
    const existingCert = await Certificate.findOne({ user: (user as any)?._id, course: courseId });
    if (existingCert) {
       // Return existing
       res.status(200).json(existingCert);
       return;
    }

    const uniqueId = uuidv4();
    const certificate = await Certificate.create({
      user: (user as any)?._id,
      course: courseId,
      uniqueId,
    });

    const populatedCert = await Certificate.findById(certificate._id)
      .populate('user', 'name')
      .populate('course', 'title');
      
    res.status(201).json(populatedCert);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Download Certificate PDF
// @route   GET /api/certificates/:id/download
// @access  Private (or Public with ID?)
export const downloadCertificate = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('user', 'name')
      .populate('course', 'title');

    if (!certificate) {
      res.status(404).json({ message: 'Certificate not found' });
      return;
    }

    const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate-${certificate.uniqueId}.pdf`);

    doc.pipe(res);

    // Design Certificate
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');
    
    // Border
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).strokeColor('#4F46E5').lineWidth(5).stroke();

    doc.fontSize(40).fillColor('#111827').text('Certificate of Completion', 0, 100, { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(20).text('This is to certify that', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(30).fillColor('#4F46E5').text((certificate.user as any).name, { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(20).fillColor('#111827').text('has successfully completed the course', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(25).text((certificate.course as any).title, { align: 'center' });
    doc.moveDown(2);
    
    doc.fontSize(15).text(`Date: ${new Date(certificate.issueDate).toLocaleDateString()}`, { align: 'center' });
    doc.text(`Certificate ID: ${certificate.uniqueId}`, { align: 'center' });

    doc.end();

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Verify Certificate
// @route   GET /api/certificates/verify/:uniqueId
// @access  Public
export const verifyCertificate = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findOne({ uniqueId: req.params.uniqueId })
      .populate('user', 'name')
      .populate('course', 'title');

    if (certificate) {
      res.json({ valid: true, certificate });
    } else {
      res.json({ valid: false, message: 'Invalid Certificate ID' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
