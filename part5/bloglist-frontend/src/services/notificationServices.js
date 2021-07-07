const showNotification = (text, setNotification) => {
    setNotification(text);
    setTimeout(() => {
        setNotification("");
    }, 3000);
};

export default { showNotification };
