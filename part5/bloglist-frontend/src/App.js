import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import getAll from "./services/blogs";
import LoginForm from "./components/LoginForm";

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

    return (
        <div>
            {user === null ? (
                <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setUser={setUser}
                />
            ) : (
                <Blogs blogs={blogs} />
            )}
        </div>
    );
};

export default App;
