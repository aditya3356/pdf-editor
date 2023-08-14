import { useEffect, useRef } from "react";

export default function PdfViewerComponent({ document, setInstance }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current; // This `useRef` instance will render the PDF.

    let PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");

      PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

      setInstance(
        await PSPDFKit.load({
          // Container where PSPDFKit should be mounted.
          container,
          // The document to open.
          document,
          // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        })
      );

      URL.revokeObjectURL(document);
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [document, setInstance]);

  // This div element will render the document to the DOM.
  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}
