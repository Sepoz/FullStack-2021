import React from "react";
import blogsServices from "../services/blogsServices";
import notificationServices from "../services/notificationServices";

const BlogForm = (props) => {
    // prettier-ignore
    const { title, author, url, blogs, setTitle, setAuthor, setUrl, setBlogs, setNotification } = props;

    const handleSubmitBlog = async (event) => {
        event.preventDefault();

        try {
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
            notificationServices.showNotification(
                `${response.title} by ${response.author} created`,
                setNotification
            );

            const updatedBlogs = blogs.concat(response);
            setBlogs(updatedBlogs);
        } catch (error) {
            notificationServices.showNotification(
                "unable to create blog",
                setNotification
            );
        }
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
