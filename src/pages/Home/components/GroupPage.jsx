/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import ModalForCrTask from "./ModalForCrTask";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import { BsCameraVideo } from 'react-icons/bs';
import ModalForInvUsers from "./ModalForInvUsers";
import { catchUsers } from "../../../fetures/users/usersSlice";
import useAuth from "../../../hooks/useAuth";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { changePriority, changeStatus } from "../../../fetures/taksFilters/taskFiltersSlice";
import { taskStatusChanged } from "../../../fetures/groupTasks/groupTasksSlice";


const GroupPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { groupId } = useParams();
    const { groups } = useSelector(state => state.groupTasks);
    const { users } = useSelector(state => state.usersData);
    const { status, priority } = useSelector(state => state.filters)
    const filterData = users.filter(everyUser => everyUser.email !== user?.email)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(catchUsers())
    }, [dispatch])
    const group = groups.find(group => group.id === groupId) || {}
    const { id, groupAdmin, groupName, message } = group;
    const myTask = message?.filter(message => message.taskFor === user?.email);
    let [isOpenForTask, setIsOpenForTask] = useState(false)
    let [isOpenForInvite, setIsOpenForInvite] = useState(false)
    function closeModalForTask() {
        setIsOpenForTask(false)
    }
    function openModalForTask() {
        setIsOpenForTask(true)
    }
    function closeModalForInvite() {
        setIsOpenForInvite(false)
    }
    function openModalForInvite() {
        setIsOpenForInvite(true)
    }
    if (!groupName) {
        return navigate("/")
    }
    const handleStatusChange = (status) => {
        dispatch(changeStatus(status))
    }
    const handlePriorityChange = (priority) => {
        dispatch(changePriority(priority))
    }
    const statusFilter = (message) => {
        switch (status) {
            case "pending":
                return message.status === "pending"
            case "progress":
                return message.status === "progress"
            case "completed":
                return message.status === "completed"
            default:
                return message
        }
    }
    const priorityFilter = (message) => {
        switch (priority) {
            case "Most Priority":
                return message.priority === "Most Priority"
            case "High Priority":
                return message.priority === "High Priority"
            case "Top Priority":
                return message.priority === "Top Priority"
            default:
                return message
        }
    }
    const handleTaskStatusChanged = (groupId, messageId, status) => {
        dispatch(taskStatusChanged({ groupId, messageId, status }))
    }
    return (
        <div className="container mx-auto">
            <nav className="absolute top-20 w-full left-0 px-5">
                <div className="flex justify-between items-center border rounded-xl p-1">
                    <h3 className="text-2xl font-bold italic">{groupName}</h3>
                    <div className="flex items-center gap-5">
                        <FiPhoneCall className="text-2xl" />
                        <BsCameraVideo className="text-2xl" />
                        {groupAdmin === user?.email && <button onClick={openModalForTask} className="btn btn-primary">add task</button>}
                        <button onClick={openModalForInvite} className="btn btn-primary"><AiOutlineUsergroupAdd />Invite users</button>
                    </div>
                </div>
            </nav>
            <div className="w-full absolute top-36 left-0 px-5">
                <Tabs>
                    <TabList className={`react-tabs__tab-list text-center`}>
                        <Tab>All Task</Tab>
                        <Tab>My Task</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto relative">
                            <div className="text-end">
                                <p>Filter By</p>
                                <select onChange={(e) => handleStatusChange(e.target.value)} className='select select-bordered w-52'>
                                    <option value="defult">Default</option>
                                    <option value="progress">Progress</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            {message.length > 0 ?
                                message.filter(statusFilter).map((message, index) => {
                                    return (
                                        <div key={index} className={`p-5 border ${groupAdmin === user?.email ? "ml-auto" : "mr-auto"} rounded-xl 2xl:w-2/5 xl:w-1/2 sm:w-3/5 w-4/5 bg-lime-50`}>
                                            <p className="text-lg font-medium">Task name : {message.task}</p>
                                            <p className="text-lg font-medium">Taks Priority : {message.priority}</p>
                                            <p className="text-lg font-medium">Task For : {message.taskFor}</p>
                                            <p className="text-lg font-medium">Task Status : <span className={`bg-warning px-2 py-1 rounded`}>{message.status}</span></p>
                                        </div>
                                    )
                                })
                                : <p className="flex justify-center items-center text-2xl font-semibold">This Chanel haven't any task</p>
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                            <div className="text-start">
                                <p>Filter By</p>
                                <select onChange={(e) => handlePriorityChange(e.target.value)} className='select select-bordered w-52'>
                                    <option value="defult">Default</option>
                                    <option value="Most Priority">Most Priority</option>
                                    <option value="High Priority">High Priority</option>
                                    <option value="Top Priority">Top Priority</option>
                                </select>
                            </div>
                            {myTask.length > 0 ?
                                myTask.filter(priorityFilter).map((message, index) => {
                                    return (
                                        <div key={index} className={`p-5 border flex justify-between ${groupAdmin === user?.email ? "ml-auto" : "mr-auto"} rounded-xl 2xl:w-2/5 xl:w-1/2 sm:w-3/5 w-4/5  bg-lime-50`}>
                                            <div>
                                                <p className="text-lg font-medium">Task name : {message.task}</p>
                                                <p className="text-lg font-medium">Taks Priority : {message.priority}</p>
                                                <p className="text-lg font-medium">Task For : {message.taskFor}</p>
                                            </div>
                                            <select onChange={(e) => handleTaskStatusChanged(id, message.messageId, e.target.value)} defaultValue={message.status} disabled={message.status === "completed"} className='select select-bordered max-w-md'>
                                                <option value="progress">Progress</option>
                                                <option value="pending">Pending</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                    )
                                })
                                : <p className="flex justify-center items-center text-2xl font-semibold">This Chanel haven't any task for you</p>
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <ModalForInvUsers isOpenForInvite={isOpenForInvite} closeModalForInvite={closeModalForInvite} group={group} usersData={filterData} />
            <ModalForCrTask isOpenForTask={isOpenForTask} closeModalForTask={closeModalForTask} group={group} />
        </div>
    );
};

export default GroupPage;