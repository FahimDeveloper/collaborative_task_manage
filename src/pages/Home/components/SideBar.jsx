/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ModalForCrGroup from './ModalForCrGroup';
import { useDispatch, useSelector } from 'react-redux';
import { catchGroups } from '../../../fetures/groupTasks/groupTasksSlice';
import useAuth from '../../../hooks/useAuth';
import { AiOutlinePlus } from 'react-icons/ai';


const SideBar = () => {
    const { user } = useAuth();
    let [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    const { groups } = useSelector(state => state.groupTasks);
    const myGroups = groups.filter(group => group.groupAdmin === user?.email);
    const invitedGroups = groups.filter(group => group.users.find(everyuser => everyuser.email === user?.email))
    useEffect(() => {
        dispatch(catchGroups())
    }, [dispatch])
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col relative">
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className="menu p-4 w-80 min-h-full bg-base-200 space-y-5">
                    {/* Sidebar content here */}
                    <button onClick={openModal} className="btn btn-outline btn-secondary mt-16"><AiOutlinePlus className='text-2xl' /> Create groups</button>
                    <div className="flex flex-col gap-3">
                        <p className="text-xl">Your Groups</p>
                        {
                            myGroups.length > 0
                                ? myGroups
                                    ?.map(group =>
                                        <Link
                                            key={group.id}
                                            to={`/groups/${group.id}`}
                                            className="text-base outline outline-2 rounded-md py-1 px-5 outline-secondary flex gap-2 items-center"
                                        ><img src={group.groupImage} className='w-12 h-12 object-cover rounded-full' alt="" />{group.groupName}</Link>
                                    )
                                : <p>You haven't any groups</p>
                        }
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-xl">Other Groups</p>
                        {
                            invitedGroups.length > 0
                                ? invitedGroups
                                    ?.map(group =>
                                        <Link
                                            key={group.id}
                                            to={`/groups/${group.id}`}
                                            className="text-base outline outline-2 rounded-md py-1 px-5 outline-secondary flex gap-2 items-center"
                                        ><img src={group.groupImage} className='w-12 h-12 object-cover rounded-full' alt="" />{group.groupName}</Link>
                                    )
                                : <p>You are not joined any groups</p>
                        }
                    </div>
                </div>
                <ModalForCrGroup isOpen={isOpen} closeModal={closeModal} />
            </div>
        </div >
    );
};

export default SideBar;