import React, { useState, useEffect } from 'react';
import { generateBasicGPT } from './basicGPT.mjs';
import { Link } from 'react-router-dom';
import './BasicResults.css'

const BasicResults: React.FC = () => {
    const [reportData, setData] = useState<any>(null);
    
    useEffect(() => {
        const fetchReportData = async () => {
            const basicReport = await generateBasicGPT();
            const hold = basicReport.content;
            if(hold !== null) {
                const parsed = JSON.parse(hold)
                setData(parsed)
            }
        }
        fetchReportData();
    }, []);



    return (
        <div className="basicResults-container">
            <h1 className = "basicResults-title">Career Report for Basic Career Quiz</h1>
            { reportData !== null ? (
                <ul className="basicResults-list">
                    <li className="basicResults-Job1">
                        <h2 className="jobTitle1">{reportData.job1}</h2>
                        <div>{reportData.description1}</div>
                    </li>
                    <li className="basicResults-Job2">
                        <h3 className="jobTitle2">{reportData.job2}</h3>
                        <div>{reportData.description2}</div>
                    </li>
                    <li className="basicResults-Job3">
                        <h4 className="jobTitle3">{reportData.job3}</h4>                            <div>{reportData.description3}</div>
                    </li>    
                
                    <Link to = '/'>
                        <button>Return to Home Page</button>
                    </Link>
                    <div>Click the above button to go back to the home page and take our Detailed Career Quiz, or retake this Basic Career Quiz again.</div>
                </ul>
            ) : (
                <p className="loading-test">Loading Report...</p>
            )}
            
            
        </div>
    )
}
export default BasicResults