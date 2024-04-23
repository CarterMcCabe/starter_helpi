// TEST PUSH/MERGE BY CARTER
// import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
// import { Button, Form } from 'react-bootstrap';

// Components for new pages 
import BasicQuestions from './BasicQuestions';
import DetailedQuestions from './DetailedQuestions';


// Local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
// let keyData = "";
// const saveKeyData = "MYKEY";
// const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
// if (prevKey !== null) {
//   keyData = JSON.parse(prevKey);
// }

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Career Quiz Home Page</h1>
      <div>
        <h3>Basic Questions</h3>
        <p>Click the button below if you want to take a more concise version of the career quiz</p>
        <Link to="/basic-questions">
          <button>Start Basic Quiz</button>
        </Link>
      </div>
      <div>
        <h3>Detailed Questions</h3>
        <p>Click the button below if you want to take a more detailed version of the career quiz</p>
        <Link to="/detailed-questions">
          <button>Start Detailed Quiz</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/basic-questions" element={<BasicQuestions />} />
          <Route path="/detailed-questions" element={<DetailedQuestions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

