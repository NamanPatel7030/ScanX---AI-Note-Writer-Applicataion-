// import { console } from "inspector";
import React from "react";

function PdfViewer({ fileUrl }) {
  console.log(fileUrl);
  return (
    <div>
      <h1>
        <iframe
          src={fileUrl + "#toolbar=0"}
          height="90vh"
          width="100%"
          className="h-[88vh] rounded-2xl shadow-lg border mt-2"
          
          
        />
      </h1>
    </div>
  );
}

export default PdfViewer;
