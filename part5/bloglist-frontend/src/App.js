import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import blogsServices from "./services/blogsServices";
import UserLogin from "./components/UserLogin";
import UserLogout from "./components/UserLogout";
import BlogForm from "./components/BlogForm";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

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

    return (
        <div>
            {user === null ? (
                <UserLogin
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setUser={setUser}
                />
            ) : (
                <div>
                    <UserLogout user={user} setUser={setUser} />
                    <BlogForm
                        title={title}
                        author={author}
                        url={url}
                        blogs={blogs}
                        setTitle={setTitle}
                        setAuthor={setAuthor}
                        setUrl={setUrl}
                        setBlogs={setBlogs}
                    />
                    <Blogs blogs={blogs} />
                </div>
            )}
        </div>
    );
};

export default App;
