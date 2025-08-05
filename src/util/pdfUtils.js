import html2canvas from "html2canvas"
import jsPDF from "jspdf";

export const generatePdfFromElement = async(element, filenName="invoice.pdf", returnBlob = true) => {
    const canvas = await html2canvas (element, {
        scale:2,
        useCORS: true,
        backgroundColor: "#fff",
        scrollY:  -window.scrollY
    });

    const imageData = canvas.toDataURL("image/jpeg");
    const pdf = new jsPDF("p", "pt", "a4");
    const imageProperties = pdf.getImageProperties(imageData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imageProperties.height*pdfWidth)/imageProperties.width;
    pdf.addImage(imageData, "JPEG", 0,0, pdfWidth, pdfHeight);

    if(returnBlob){
        return pdf.output("blob");
    }
    else {
        pdf.save(filenName);
    }
}