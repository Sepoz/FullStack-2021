import React from "react";

import Statistic from "./Statistic";

function Statistics(props) {
    const { good, neutral, bad } = props;

    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>no feedback given</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <Statistic text="good" value={good} />
                    <Statistic text="neutral" value={neutral} />
                    <Statistic text="bad" value={bad} />
                    <Statistic text="total" value={good + bad + neutral} />
                    <Statistic
                        text="average"
                        value={(good - bad) / (good + bad + neutral)}
                    />
                    <Statistic
                        text="positive"
                        value={(good / (good + bad + neutral)) * 100}
                    />
                </tbody>
            </table>
        </div>
    );
}

export default Statistics;
