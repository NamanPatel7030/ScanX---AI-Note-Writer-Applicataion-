import React from "react";
import Script from "next/script";

function Analytics() {
  return (
    <head>
      <Script
        src={"https://www.googletagmanager.com/gtag/js?id=G-Z9CC4M2YDL"}
      />

      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z9CC4M2YDL');
  `}
      </Script>
    </head>
  );
}

export default Analytics;
