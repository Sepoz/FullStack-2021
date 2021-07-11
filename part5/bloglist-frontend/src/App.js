import React, { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import blogsServices from "./services/blogsServices";
import notificationServices from "./services/notificationServices";
import UserLogin from "./components/UserLogin";
import UserLogout from "./components/UserLogout";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState("");

    const blogFormRef = useRef();

    useEffect(() => {
        async function getAllBlogs() {
            const blogs = await blogsServices.getAll();
            setBlogs(blogs);
        }
        getAllBlogs();
    }, []);

    useEffect(() => {
        const loggedUserJSON =
            window.localStorage.getItem("loggedBlogsAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogsServices.setToken(user.token);
        }
    }, []);

    const addBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility();

            const response = await blogsServices.create(blogObject);

            const updatedBlogs = blogs.concat(response);
            setBlogs(updatedBlogs);

            notificationServices.showNotification(
                `${response.title} by ${response.author} created`,
                setNotification
            );

            return response;
        } catch (error) {
            notificationServices.showNotification(
                "unable to create blog",
                setNotification
            );
        }
    };

    return (
        <div>
            {notification && <Notification notification={notification} />}

            {user === null ? (
                <UserLogin
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setUser={setUser}
                    setNotification={setNotification}
                />
            ) : (
                <div>
                    <UserLogout
                        user={user}
                        setUser={setUser}
                        setNotification={setNotification}
                    />

                    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                        <BlogForm addBlog={addBlog} />
                    </Togglable>
                    <Blogs blogs={blogs} />
                </div>
            )}
        </div>
    );
};

export default App;
