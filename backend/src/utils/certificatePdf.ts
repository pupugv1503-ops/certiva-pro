import PDFDocument from 'pdfkit';

export type CertificatePdfData = {
  certificateId: string;
  holderName: string;
  certificationTitle: string;
  score: number;
  issueDate: string;
};

export const writeCertificatePdfToResponse = (
  res: import('express').Response,
  data: CertificatePdfData
) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="certiva-certificate-${data.certificateId}.pdf"`
  );

  doc.pipe(res);

  // Header
  doc.fontSize(26).font('Helvetica-Bold').text('CERTIFICATE OF COMPLETION', {
    align: 'center',
  });
  doc.moveDown(0.6);

  doc
    .fontSize(14)
    .font('Helvetica')
    .text('This certifies that', { align: 'center' });

  doc.moveDown(0.6);
  doc
    .fontSize(24)
    .font('Helvetica-Bold')
    .text(data.holderName, { align: 'center' });

  doc.moveDown(0.8);
  doc
    .fontSize(14)
    .font('Helvetica')
    .text('has successfully completed', { align: 'center' });

  doc.moveDown(0.6);
  doc
    .fontSize(20)
    .font('Helvetica-Bold')
    .text(data.certificationTitle, { align: 'center' });

  doc.moveDown(1.2);

  // Details box
  const startY = doc.y;
  const boxX = 80;
  const boxWidth = 435;
  const boxHeight = 140;

  doc
    .roundedRect(boxX, startY, boxWidth, boxHeight, 12)
    .lineWidth(1)
    .stroke('#3b82f6');

  doc
    .fontSize(12)
    .font('Helvetica')
    .fillColor('#111827')
    .text(`Certificate ID: ${data.certificateId}`, boxX + 20, startY + 25);

  doc.text(`Score: ${data.score}%`, boxX + 20, startY + 55);
  doc.text(`Issue Date: ${data.issueDate}`, boxX + 20, startY + 85);

  // Footer
  doc
    .fontSize(10)
    .fillColor('#6b7280')
    .text('Issued by Certiva', 0, startY + boxHeight + 60, { align: 'center' });

  doc.end();
};
