import React from "react";

function UserLogout(props) {
    const { user, setUser } = props;

    function handleLogout() {
        window.localStorage.removeItem("loggedBlogsAppUser");
        setUser(null);
    }

    return (
        <div>
            <p>{user.name} logged-in</p>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
}

export default UserLogout;
