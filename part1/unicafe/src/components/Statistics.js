import React from "react";

function Statistics(props) {
    const { good, neutral, bad } = props;
    return (
        <div>
            <h1>Statistics</h1>
            <p>good: {good}</p>
            <p>neutral: {neutral}</p>
            <p>bad: {bad}</p>
            <p>total: {good + bad + neutral}</p>
            <p>average: {(good - bad) / (good + bad + neutral)}</p>
            <p>positive: {(good / (good + bad + neutral)) * 100}%</p>
        </div>
    );
}

export default Statistics;
