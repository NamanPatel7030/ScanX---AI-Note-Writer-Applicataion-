import React from "react";

function PdfViewer({ fileUrl }) {
  return (
    <div className="h-[calc(100vh-49px)] bg-gray-100 dark:bg-[#0a0a12]">
      <div className="h-full overflow-hidden">
        <iframe
          src={fileUrl + "#toolbar=0"}
          width="100%"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default PdfViewer;
