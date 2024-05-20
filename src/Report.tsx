import React, { useState, useEffect } from 'react';
import { generateDetailed } from './ChatGPT';
import { Link } from 'react-router-dom';
import './Report.css'; 

interface ReportItem {
  title: string;
  url: string;
}

const Report: React.FC = () => {
  const [reportData, setReportData] = useState<ReportItem[]>([]);

  useEffect(() => {
    const fetchReportData = async () => {
      const detailedAnswers = ["Answer 1", "Answer 2", "Answer 3"]; 

      const detailedReport = await generateDetailed(detailedAnswers);
      console.log("Detailed Report:", detailedReport);
      setReportData(detailedReport);
    };

    fetchReportData();
  }, []); 

  return (
    <div className="container-wrapper">
      <div className="report-container">
        <h1 className="report-title">ChatGPT API Report</h1>
        {reportData.length > 0 ? (
          <ul className="report-list">
            {reportData.map((item, index) => (
              <li key={index} className="report-item">
                <div className="job-container">
                  <div>{item.title}</div>
                  <div className="job-link"><a href={item.url} target="_blank" rel="noopener noreferrer">View Job</a></div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="loading-text">Loading report...</p>
        )}
      </div>
      <div className="buttons-container">
        <div className="button-wrapper">
          <Link to='/'>
            <button>Return to Home Page</button>
          </Link>
        </div>
        <div className="button-wrapper">
          <Link to='/detailed-questions'>
            <button>Take Quiz Again</button>
          </Link>
        </div>
        <div className="button-wrapper">
          <Link to='/basic-questions'>
            <button>Take Basic Quiz</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Report;
