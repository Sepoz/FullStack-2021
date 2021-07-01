import React from "react";
import blogsServices from "../services/blogsServices";

const BlogForm = (props) => {
    // prettier-ignore
    const { title, author, url, blogs, setTitle, setAuthor, setUrl, setBlogs } = props;

    const handleSubmitBlog = async (event) => {
        event.preventDefault();

        const newBlogObject = {
            title,
            author,
            url,
            likes: 0,
        };

        const response = await blogsServices.create(newBlogObject);
        setTitle("");
        setAuthor("");
        setUrl("");

        const updatedBlogs = blogs.concat(response);
        setBlogs(updatedBlogs);
    };

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
