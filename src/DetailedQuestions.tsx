import React, { useState } from 'react';
import { ProgressBar, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
// import './DetailedQuestions.css'

const DetailedQuestions: React.FC = () => {
  const [questions] = useState([
    {
      id: 1,
      question: "How do you approach solving complex problems?",
      options: [
        "Analyzing data and facts systematically",
        "Brainstorming creative solutions",
        "Seeking advice from mentors or colleagues",
        "Experimenting with different strategies until a solution is found"
      ]
    },
    {
      id: 2,
      question: "How would you describe your communication style in a professional setting?",
      options: [
        "Concise and to the point",
        "Persuasive and influential",
        "Empathetic and understanding",
        "Collaborative and inclusive"
      ]
    },
    {
      id: 3,
      question: "What type of work environment do you thrive in?",
      options: [
        "Dynamic and fast-paced",
        "Structured and organized",
        "Innovative and entrepreneurial",
        "Supportive and team-oriented"
      ]
    },
    {
      id: 4,
      question: "How do you make decisions when faced with multiple options?",
      options: [
        "Rely on logical reasoning and analysis",
        "Trust your intuition and gut feeling",
        "Consult with others and gather opinions",
        "Experiment with different options before deciding"
      ]
    },
    {
      id: 5,
      question: "If given the opportunity, how would you lead a team?",
      options: [
        "Provide clear direction and guidance",
        "Inspire and motivate team members",
        "Delegate tasks and empower team members",
        "Foster creativity and innovation within the team"
      ]
    },
    {
      id: 6,
      question: "How do you respond to unexpected changes or challenges in the workplace?",
      options: [
        "Remain calm and assess the situation rationally",
        "Embrace change and view it as an opportunity for growth",
        "Seek support from others and collaborate on finding solutions",
        "Take initiative to address the issue proactively"
      ]
    },
    {
      id: 7,
      question: "What are your long-term career aspirations?",
      options: [
        "Climbing the corporate ladder within a specific industry",
        "Pursuing entrepreneurial ventures and starting your own business",
        "Making a positive impact on society or the environment",
        "Continuous learning and personal development in various fields"
      ]
    },
  ]);

  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [detailedAnswers, setDetailedAnswers] = useState<string[]>([]);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const navigate = useNavigate();


  const handleOptionSelect = (questionId: number, option: string) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [questionId]: option
    }));

    setDetailedAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionId - 1] = option;
      return updatedAnswers;
    });

    const answeredQuestions = Object.keys(selectedOptions).length + 1;
    setAllQuestionsAnswered(answeredQuestions === questions.length);
  };

  const handleGetResults = () => {
    if (allQuestionsAnswered) {
      // Pass detailedAnswers to the parent component or navigate to the results page
      console.log("Detailed Answers:", detailedAnswers);
      navigate('/report');
    } else {
      console.log("Please answer all questions before getting results.");
    }
  };

  const progress = (Object.keys(selectedOptions).length / questions.length) * 100;

  return (
    <div className="detailed-questions">
      <div className="progress-bar-container">
        <ProgressBar now={progress} label={`${progress.toFixed(0)}%`} />
      </div>
      <div className = "questions.container">
        <h2 className = "detailed-questions-title">Detailed Questions</h2>
        {questions.map(question => (
          //style={{ backgroundColor: 'rgba(139, 0, 0, 0.8)', padding: '10px', borderRadius: '10px', border: '2px solid #8b0000', margin: '0 200px 20px 200px' }}
          <div key={question.id} className = "question-container">
            <h3>{question.question}</h3>
            <Form>
              {question.options.map(option => (
                <div key={option} className = "option-container">
                  <Form.Check
                    type="radio"
                    id={`${question.id}-${option}`}
                    label={option}
                    checked={selectedOptions[question.id] === option}
                    onChange={() => handleOptionSelect(question.id, option)}
                    style={{ display: 'none' }} // Hide the radio button
                  />
                  <label htmlFor={`${question.id}-${option}`} style={{ cursor: 'pointer', backgroundColor: selectedOptions[question.id] === option ? 'rgba(0, 0, 0, 0.4)' : 'transparent', padding: '5px', borderRadius: '5px' }}>{option}</label>
                </div>
              ))}
            </Form>
          </div>
        ))}
        <button
  onClick={handleGetResults}
  disabled={!allQuestionsAnswered}
  style={{ opacity: allQuestionsAnswered ? 1 : 0.5, cursor: allQuestionsAnswered ? 'pointer' : 'not-allowed' }}
>
  Get Results
</button>

      </div>
      <div>
             <Link to = '/'>
               <button>Return to Home Page</button>
             </Link>
          </div>
    </div>
  );
};

export default DetailedQuestions;
