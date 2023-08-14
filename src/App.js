import { useState } from "react";
import PdfViewerComponent from "./components/PdfViewerComponent";
import axios from "axios";
import { SERVICE_ENDPOINT } from "./constants";
import { convertBufferToArrayBuffer } from "./utils";

function App() {
  const [document, setDocument] = useState(null);
  const [instance, setInstance] = useState(null);

  const onLoadHandler = async () => {
    try {
      const blob = await axios.get(SERVICE_ENDPOINT);
      setDocument(convertBufferToArrayBuffer(blob.data.data));
    } catch (e) {
      console.error("Error fetching the document from the database", e);
    }
  };

  const onSaveHandler = async () => {
    const arrayBuffer = await instance.exportPDF();
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });
    const formData = new FormData();
    formData.append("file", blob);
    try {
      axios.post(SERVICE_ENDPOINT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (e) {
      console.error("Unable to save changes to the database", e);
    }
  };

  return (
    <div className="App">
      <div className="buttons-container">
        <button onClick={onLoadHandler} disabled={document !== null}>
          Load PDF
        </button>
        <button onClick={onSaveHandler} disabled={document === null}>
          Save PDF
        </button>
      </div>
      {document ? (
        <div className="PDF-viewer">
          <PdfViewerComponent document={document} setInstance={setInstance} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
