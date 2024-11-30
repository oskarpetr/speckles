"use client";

import PDF from "./PDF";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

export default function Pdf() {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    // Generate the PDF and create a Blob URL
    const generatePdf = async () => {
      const blob = await pdf(<PDF />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    generatePdf();

    // Clean up the URL object when the component unmounts
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, []);

  return (
    <div>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          style={{ width: "100%", height: "80vh", border: "none" }}
        ></iframe>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
}
