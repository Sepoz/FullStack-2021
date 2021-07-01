import React from "react";

const UserLogout = (props) => {
    const { user, setUser } = props;

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogsAppUser");
        setUser(null);
    };

    return (
        <div>
            <p>{user.name} logged-in</p>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default UserLogout;
