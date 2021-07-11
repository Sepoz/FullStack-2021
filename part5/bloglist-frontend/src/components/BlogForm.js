import React, { useState } from "react";

const BlogForm = (props) => {
    const { addBlog } = props;

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmitBlog = async (event) => {
        event.preventDefault();

        const newBlogObject = {
            title,
            author,
            url,
            likes: 0,
        };

        await addBlog(newBlogObject);
        setTitle("");
        setAuthor("");
        setUrl("");
    };

    return (
        <div>
            <form onSubmit={handleSubmitBlog}>
                <div>
                    title:
                    <input
                        id="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        id="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>

                <div>
                    url:
                    <input
                        id="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default BlogForm;
