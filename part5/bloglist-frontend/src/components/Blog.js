import React from "react";

const Blog = (props) => {
    const { title, author } = props.blog;

    return (
        <div>
            {title} {author}
        </div>
    );
};

export default Blog;
