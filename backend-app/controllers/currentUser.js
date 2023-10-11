let activeUser;


async function getUser() {
    return activeUser;
}

async function setUser(user) {
    activeUser = user;
}


module.exports = {getUser, setUser};