import React from "react";
import login from "../services/login";

function LoginForm(props) {
    const { username, password, setUsername, setPassword, setUser } = props;

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const user = await login({ username, password });
            // REMOVE LOG
            console.log(user.token);
            setUser(user.token);
            setUsername("");
            setPassword("");
        } catch (exception) {
            // ADD ERROR MESSAGE
            console.log("login error", exception);
        }
    }

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
}

export default LoginForm;
