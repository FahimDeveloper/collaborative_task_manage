import { useDispatch } from "react-redux";
import { addMembarInGroup } from "../../../fetures/groupTasks/groupTasksSlice";
import { AiOutlineUsergroupAdd } from "react-icons/ai";


const SingleUser = ({ user, group }) => {
    const { id, users } = group
    const findUser = users.find(everyUser => everyUser.id === user.id)
    const dispatch = useDispatch();
    const inviteUsers = (groupId, user) => {
        dispatch(addMembarInGroup({ groupId, user }));
    }
    return (
        <>
            {
                <p className='border rounded p-1 flex items-center justify-between' key={user.id}>
                    <img src={user.photo} className='w-14 h-14 rounded-full object-cover' alt="userImage" /> {user.name}
                    <button onClick={() => inviteUsers(id, user)} disabled={findUser ? true : false} className="btn btn-primary"><AiOutlineUsergroupAdd />{findUser ? "Already invited" : "Invite"}</button>
                </p>
            }
        </>
    );
};

export default SingleUser;