import React from "react";
import notificationServices from "../services/notificationServices";

const UserLogout = (props) => {
    const { user, setUser, setNotification } = props;

    const handleLogout = () => {
        try {
            window.localStorage.removeItem("loggedBlogsAppUser");
            notificationServices.showNotification(
                `${user.username} logged-out`,
                setNotification
            );
            setUser(null);
        } catch (error) {
            notificationServices.showNotification(
                "unable to logout",
                setNotification
            );
        }
    };

    return (
        <div>
            <p>{user.username} logged-in</p>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default UserLogout;
