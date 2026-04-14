/**
 * Extracts raw text from a PDF File or Blob object.
 * This implementation uses dynamic imports to avoid SSR issues with pdfjs-dist 
 * (which depends on browser-only APIs like DOMMatrix).
 * 
 * @param {Blob|File} file - The PDF file/blob to parse.
 * @returns {Promise<string>} - The concatenated text content of the PDF.
 */
export async function extractTextFromPDF(file) {
  if (typeof window === "undefined") return "";

  try {
    // Dynamically import pdfjs-dist to ensure it's only loaded on the client
    const pdfjs = await import("pdfjs-dist");
    
    // Set worker source
    const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      fullText += pageText + "\n";
    }

    return fullText;
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    throw new Error("Failed to parse resume PDF. Please ensure it's a valid document.");
  }
}
