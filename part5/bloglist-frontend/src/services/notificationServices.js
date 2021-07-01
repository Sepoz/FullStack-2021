const showNotification = (text, setNotification) => {
    setNotification(text);
    setTimeout(() => {
        setNotification("");
    }, 3000);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { showNotification };
