import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const OPTIONS = [
  "Disagree",
  "Slightly Disagree",
  "Neutral",
  "Slightly Agree",
  "Agree"
]
const QUESTIONS = [1,2,3,4,5,6,7,8]
const BasicQuestions: React.FC = () => {
  const [chosenOption, setChosenOption] = useState<string[]>(Array(QUESTIONS.length).fill(OPTIONS[2]));

  function updateOption(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const newOptions = [...chosenOption];
    newOptions[index] = event.target.value;
    setChosenOption(newOptions);
  }
  return (
      <div>
        <h2>Basic Career Aptitude Test </h2>
        <p>
          Answer the following questions to the best of your ability. Then we will 
          then we will use your answers to determine possible career paths for you.
        </p>
        <div>
          {QUESTIONS.map((question, index) => (
            <div key={question}>
              <div>Question {question}</div>
              <div style={{ display: "flex" }}>
              {OPTIONS.join(', ').split(', ').map((option) => (
                <Form.Check
                    key={ option }
                    style={{ marginRight: "10px" }}
                    inline
                    type="radio"
                    name={ `option-${question}` }
                    onChange={ (e) => updateOption(e, index) }
                    id={ `option-select-${option}-${question}` }
                    label={ option }
                    value={ option }
                    checked={ chosenOption[index] === option }
                    />
              ))}
              </div>
            </div>
          ))}
        </div>
      <p>Thank you for taking the time to answer the above questions! Press the below button to see results</p>

      </div>
  );
}

export default BasicQuestions;
