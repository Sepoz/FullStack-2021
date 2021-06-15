import React, { useState } from "react";

import Statistics from "./components/Statistics";
import Button from "./components/Button";

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

            <Button text="good" handler={handleFeedback(setGood)} />
            <Button text="neutral" handler={handleFeedback(setNeutral)} />
            <Button text="bad" handler={handleFeedback(setBad)} />

            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
