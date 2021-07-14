import React from "react";
import PropTypes from "prop-types";
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
            <div id="username-input">
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div id="password-input">
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="button-login" type="submit">
                login
            </button>
        </form>
    );
};

UserLogin.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
};

export default UserLogin;
