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