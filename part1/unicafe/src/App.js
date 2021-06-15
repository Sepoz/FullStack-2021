import React, { useState } from "react";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    function handleFeedback(reviewType) {
        return function () {
            reviewType((prevState) => prevState + 1);
        };
    }

    return (
        <div>
            <h1>Give Feedback</h1>

            <button onClick={handleFeedback(setGood)}>good</button>
            <button onClick={handleFeedback(setNeutral)}>neutral</button>
            <button onClick={handleFeedback(setBad)}>bad</button>

            <h1>Statistics</h1>
            <p>good: {good}</p>
            <p>neutral: {neutral}</p>
            <p>bad: {bad}</p>
            <p>total: {good + bad + neutral}</p>
            <p>average: {(good - bad) / (good + neutral + bad)}</p>
            <p>positive: {(good / (bad + neutral + good)) * 100}%</p>
        </div>
    );
};

export default App;
