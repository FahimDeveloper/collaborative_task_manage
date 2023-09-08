export const addUser = (data) => {
    const users = getUsersArr();
    const findUser = users.find(user => user.id === data.id);
    if (!findUser) {
        const newUsersArr = [...users, data];
        localStorage.setItem("users", JSON.stringify(newUsersArr))
    }
}

export const addTask = (data) => {
    const tasks = getTasksArr();
    const newTasksArr = [...tasks, data];
    localStorage.setItem("tasks", JSON.stringify(newTasksArr));
}

export const createGroup = (data) => {
    const groups = getGroupsArr();
    const newGroupsArr = [...groups, data];
    localStorage.setItem("groups", JSON.stringify(newGroupsArr));
}

export const addUserInGroup = (id, user) => {
    const groups = getGroupsArr();
    const findGroup = groups.find(group => group.id === id);
    findGroup.users.push(user)
    const filterGroup = groups.filter(group => group.id !== id);
    const newGroupArr = [...filterGroup, findGroup];
    localStorage.setItem("groups", JSON.stringify(newGroupArr))
}

export const addMessageInGroup = (id, message) => {
    const groups = getGroupsArr();
    groups.map(group => {
        if (group.id === id) {
            return group.message.push(message)
        }
        return group
    });
    localStorage.setItem("groups", JSON.stringify(groups))
}

export const changeTaskStatus = (id, status) => {
    const tasks = getTasksArr();
    tasks.map(group => {
        if (group.id === id) {
            return group.status = status
        }
        return group
    });
    localStorage.setItem("tasks", JSON.stringify(tasks))
}


// get from local storage
export const getUsersArr = () => {
    let getUsers = [];
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
        getUsers = JSON.parse(storedUsers);
    }
    return getUsers;
}
export const getTasksArr = () => {
    let getTasks = [];
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        getTasks = JSON.parse(storedTasks);
    }
    return getTasks;
}
export const getGroupsArr = () => {
    let getGroups = [];
    const storedGroups = localStorage.getItem("groups");
    if (storedGroups) {
        getGroups = JSON.parse(storedGroups);
    }
    return getGroups;
}