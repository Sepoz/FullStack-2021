import React, { useState } from "react";
import LikeButton from "./LikeButton";

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
            <div className="blog" style={styleBlog}>
                <p>
                    {title} {author}
                </p>
                <button onClick={handleShowInfo}>show</button>
            </div>
        );
    } else {
        return (
            <div className="blog-extended" style={styleBlog}>
                <p>
                    {title} {author}
                </p>
                <p>{url}</p>
                <p>{likes}</p>
                <LikeButton blog={props.blog} />
                <button onClick={handleShowInfo}>hide</button>
            </div>
        );
    }
};

export default Blog;
