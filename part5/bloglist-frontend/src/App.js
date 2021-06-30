import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import getAll from "./services/blogs";
import UserLogin from "./components/UserLogin";
import UserLogout from "./components/UserLogout";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getAllBlogs() {
            const blogs = await getAll();
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
                    <Blogs blogs={blogs} />
                </div>
            )}
        </div>
    );
};

export default App;
