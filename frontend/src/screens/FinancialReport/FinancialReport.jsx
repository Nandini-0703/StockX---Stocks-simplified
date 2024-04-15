import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import useLoading from "../../components/hooks/loading-hook";
import CircularIndeterminate from "../../components/SmallLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "../FinancialReport/FinancialReport.css";

const FinancialReport = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [resultM, setResultM] = useState([]);
  const [resultS, setResultS] = useState([]);
  const [loading, setLoad, unsetLoad] = useLoading(true);
  const [clicked, setClicked] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "text/plain, application/json , image/* , application/pdf",
    maxSize: 20971520,
    multiple: false,
    onDrop: (files) => {
      setAcceptedFiles(files);
    },
  });
  const handleRemoveFile = (removedFile) => {
    const updatedFiles = acceptedFiles.filter((file) => file !== removedFile);
    setAcceptedFiles(updatedFiles);
    setClicked(false);
  };

  const handleReportAnalysis = () => {
    setLoad();
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    axios
      .post("http://localhost:5555/analysereport", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (res) {
        setClicked(true);
        console.log(res.data);
        const answer = res.data.sentiment.magnitude;

        setResultM(answer.toFixed(2));
        setResultS(res.data.sentiment.score);
        unsetLoad();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar />
      <div className="financialreportcontainer">
        <h1>
          Click to select a Financial Report in Pdf format upto : 10 Mb or
          10,485,760 bytes.
        </h1>
        <div {...getRootProps()} style={dropzoneStyle} className="dropzonearea">
          {acceptedFiles.length === 0 ? (
            <button>
              <input {...getInputProps()} />
              ADD
            </button>
          ) : null}

          {acceptedFiles.map((file) => (
            <div>
              <p key={file.path}>
                {file.path} - {file.size} bytes
              </p>
              {file.type.startsWith("image/") ? (
                <img
                  src="image-icon.png"
                  alt={file.path}
                  width="80"
                  height="80"
                />
              ) : file.type === "application/pdf" ? (
                <img
                  src="pdf-upload.png"
                  type="application/pdf"
                  width="90"
                  height="90"
                />
              ) : null}

              <button
                className="removebutton"
                onClick={() => handleRemoveFile(file)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          className="analyzebutton"
          onClick={() => handleReportAnalysis(acceptedFiles)}
        >
          ANALYSE
        </button>
        {loading && acceptedFiles.length != 0 ? (
          <CircularIndeterminate className="analysisloader" />
        ) : clicked ? (
          <div>
            <p className="analysisresult">
              StockX Smart Analysis claims that stock of the above company will{" "}
              {resultS > 0 ? (
                <FontAwesomeIcon icon={faArrowUp} style={{ color: "green" }} />
              ) : (
                <FontAwesomeIcon icon={faArrowDown} style={{ color: "red" }} />
              )}{" "}
              with an accuracy of <span>{resultM} %</span>
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};

const dropzoneStyle = {
  border: "2px dashed #eee",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
};

export default FinancialReport;
