let activeUser;


function getUser() {
    return activeUser;
}

function setUser(user) {
    activeUser = user;
}


module.exports = {getUser, setUser};