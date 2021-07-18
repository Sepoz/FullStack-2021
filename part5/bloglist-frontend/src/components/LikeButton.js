import React from "react";
import blogsServices from "../services/blogsServices";

const LikeButton = (props) => {
    const { blog } = props;
    console.log(blog);

    const handleLikeButton = async () => {
        const newBlogObject = {
            author: blog.author,
            title: blog.title,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id,
        };

        await blogsServices.update(blog.id, newBlogObject);
    };

    return (
        <div>
            <button onClick={handleLikeButton}>like</button>
        </div>
    );
};

export default LikeButton;
