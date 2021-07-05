import React, { useState } from "react";

const Blog = (props) => {
    const { title, author, url, likes } = props.blog;

    const [showInfo, setShowInfo] = useState(false);

    const styleBlog = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    const handleShowInfo = () => {
        setShowInfo(!showInfo);
    };

    if (showInfo === false) {
        return (
            <div style={styleBlog}>
                <p>
                    {title} {author}
                </p>
                <button onClick={handleShowInfo}>show</button>
            </div>
        );
    } else {
        return (
            <div style={styleBlog}>
                <p>
                    {title} {author}
                </p>
                <p>{url}</p>
                <p>{likes}</p>
                <button>like</button>
                <button onClick={handleShowInfo}>hide</button>
            </div>
        );
    }
};

export default Blog;
