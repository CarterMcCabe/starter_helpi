import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './App.css';
import './HomePage.css';
import BasicQuestions from './BasicQuestions';
import DetailedQuestions from './DetailedQuestions';
import Report from './Report';
import BasicResults from './basicResults';
import AboutUs from './AboutUs';

const saveKeyData = "MYKEY";
let keyData = "";
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const HomePage: React.FC = () => {
  return (
    <div className="HomePage">
      <h1>Career Quest</h1>
      <div className="content">
        <div className="question">
          <h2>Basic Questions</h2>
          <p>Are you unsure about your career path? Click below to take our 
            quick career quiz to gain insight into your professional goals 
            and strength. Discover potential career paths that align with your
            interest, skills, and values. 
          </p>
          <Link to="/basic-questions">
            <button>Start Basic Quiz</button>
          </Link>
        </div>
        <div className="question">
          <h2>Detailed Questions</h2>
          <p>Looking for a comprehensive assessment of your career interests and strengths?
            Our detailed career quiz dives deep into your personality. preferences, and skills
            to provide recommendations for your professional journey. Click below to explore a variety of career options
            and gain valuable advice to make decisions about your future.
          </p>
          <Link to="/detailed-questions">
            <button className="detailed-quiz">Start Detailed Quiz</button>
          </Link>
        </div>
      </div>
      {/* <div className="login-section">
        <LoginForm />
      </div> */}
      <div className="footer">
        <Link to="/about-us">About Us</Link> {/* Add the About Us link */}
        {/* <Link to="/about-us">
          <button className="about-us-button">About Us</button>
        </Link> */}
      </div>
    </div>
  );
}

// Login form component
// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [loggedIn, setLoggedIn] = useState<boolean>(false);

  // Handle form submission
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); // Prevent default form submission
  //   // Perform login validation (dummy validation for demonstration)
  //   if (email && password) {
  //     setLoggedIn(true);
  //   }
  // };

  // Handle logout
  // const handleLogout = () => {
  //   setLoggedIn(false);
  //   // Clear user data from local storage or perform any other necessary logout tasks
  // };

//   return (
//     <>
//       {loggedIn ? (
//         // Display user email and logout link if logged in
//         <div>
//           <p>Logged in as: {email}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         // Display login form if not logged in
//         <form className="login-form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="button-container">
//             <button className="create-account-button">New Account</button>
//             <button className="login-button" type="submit">Login</button>
//           </div>
//         </form>
//       )}
//     </>
//   );
// };

function App() {
  const [key, setKey] = useState<string>(keyData);

  // Function to handle API key submission
  const handleSubmit = () => {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  };

  // Function to handle API key change
  const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/basic-questions" element={<BasicQuestions />} />
          <Route path="/detailed-questions" element={<DetailedQuestions />} />
          <Route path="/report" element={<Report />} />
          <Route path="/basicResults" element={<BasicResults />} />
          <Route path="/about-us" element={<AboutUs />} /> {/* Add route for About Us */}
        </Routes>
      </div>
      <div className="api-key-section">
        <Form>
          <Form.Label>API Key:</Form.Label>
          <div className="api-key-input">
            <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey} />
            <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
          </div>
        </Form>
      </div>
    </Router>
  );
}

export default App;
