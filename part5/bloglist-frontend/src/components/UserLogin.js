import React from "react";
import loginServices from "../services/loginServices";
import blogsServices from "../services/blogsServices";
import notificationServices from "../services/notificationServices";

const UserLogin = (props) => {
    const {
        username,
        password,
        setUsername,
        setPassword,
        setUser,
        setNotification,
    } = props;

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginServices.login({ username, password });

            window.localStorage.setItem(
                "loggedBlogsAppUser",
                JSON.stringify(user)
            );
            blogsServices.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
            notificationServices.showNotification(
                `${user.username} logged-in`,
                setNotification
            );
        } catch (error) {
            notificationServices.showNotification(
                "wrong username or password",
                setNotification
            );
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );
};

export default UserLogin;
