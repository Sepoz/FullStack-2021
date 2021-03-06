import React from "react";

import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function Course(props) {
    return (
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    );
}

export default Course;
