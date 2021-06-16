import React from "react";

import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function Course(props) {
    return (
        <div>
            {props.courses.map((course) => {
                return (
                    <div key={course.id}>
                        <Header name={course.name} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                );
            })}
        </div>
    );
}

export default Course;
