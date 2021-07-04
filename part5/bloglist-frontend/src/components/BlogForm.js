import React from "react";

const BlogForm = (props) => {
    const {
        title,
        author,
        url,
        setTitle,
        setAuthor,
        setUrl,
        handleSubmitBlog,
    } = props;

    return (
        <div>
            <form onSubmit={handleSubmitBlog}>
                <div>
                    title:
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>

                <div>
                    url:
                    <input
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
