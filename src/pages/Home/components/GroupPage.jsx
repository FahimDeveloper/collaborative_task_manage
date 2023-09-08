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


const GroupPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { groupId } = useParams();
    const { groups } = useSelector(state => state.groupTasks);
    const { users } = useSelector(state => state.usersData);
    const filterData = users.filter(everyUser => everyUser.email !== user?.email)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(catchUsers())
    }, [dispatch])
    const group = groups.find(group => group.id === groupId) || {}
    const { groupName } = group
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
    return (
        <div className="container mx-auto">
            <nav className="absolute top-20 w-full left-0 px-5">
                <div className="flex justify-between items-center border rounded-xl p-1">
                    <h3 className="text-2xl font-bold italic">{groupName}</h3>
                    <div className="flex items-center gap-5">
                        <FiPhoneCall className="text-2xl" />
                        <BsCameraVideo className="text-2xl" />
                        <button onClick={openModalForInvite} className="btn btn-primary"><AiOutlineUsergroupAdd />Invite users</button>
                        <button onClick={openModalForTask} className="btn btn-primary">add task</button>
                    </div>
                </div>
            </nav>
            <div>
            </div>
            <form className="flex absolute bottom-2 w-full left-0 px-5">
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                <button className="btn btn-primary px-10">send</button>
            </form>
            <ModalForInvUsers isOpenForInvite={isOpenForInvite} closeModalForInvite={closeModalForInvite} group={group} usersData={filterData} />
            <ModalForCrTask isOpenForTask={isOpenForTask} closeModalForTask={closeModalForTask} />
        </div>
    );
};

export default GroupPage;