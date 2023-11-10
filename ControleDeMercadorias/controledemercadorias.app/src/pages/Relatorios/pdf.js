import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFGeneratorButton = ({ contentId }) => {
    const generatePDF = () => {
        const content = document.getElementById(contentId);

        if (!content) {
            console.error(`Element with ID '${contentId}' not found.`);
            return;
        }

        // Criar um novo objeto jsPDF
        const pdf = new jsPDF('p', 'pt', 'letter');

        // Converter a div em uma imagem
        html2canvas(content).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 40, 40, 500, 300);

            // Salvar o PDF e abrir em uma nova aba
            pdf.save('relatorio.pdf');
        });
    };

    return (
        <button onClick={generatePDF} style={{ backgroundColor: 'red', color: 'white' }}>
            Gerar PDF
        </button>
    );
};

export default PDFGeneratorButton;


