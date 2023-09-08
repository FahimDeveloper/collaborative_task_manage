import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addMessage, createTask } from '../../../fetures/groupTasks/groupTasksSlice';

const ModalForCrTask = ({ isOpenForTask, closeModalForTask, group }) => {
    const { id, groupName, groupAdmin, users } = group;
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        data.id = crypto.randomUUID();
        data.state = "pending";
        data.groupName = groupName;
        data.groupAdmin = groupAdmin;
        dispatch(createTask(data))
        closeModalForTask();
        reset();
        const message = {
            task: data.taskName,
            date: data.date,
            priority: data.taskPriority,
            taskFor: data.taskFor,
            status: "pending"
        }
        dispatch(addMessage({ id, message }))
    };

    return (
        <>
            <Transition appear show={isOpenForTask} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalForTask}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 mb-5"
                                    >
                                        Create task for group
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                                        <div>
                                            <label htmlFor="taskName">Task name</label>
                                            <input
                                                className="input input-bordered w-full"
                                                type="text"
                                                id="taskName"
                                                {...register('taskName', { required: true })}
                                            />
                                            {errors.taskName && <span className='text-red-500'>This field is required</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="taskFor">TaskFor</label>
                                            <select className='select select-bordered w-full' id="taskFor" {...register('taskFor', { required: true })}>
                                                <option value="">Select task for</option>
                                                {
                                                    users.map((user, index) => <option key={index} value={user.email}>{user.name}</option>)
                                                }
                                            </select>
                                            {errors.taskFor && <span className='text-red-500'>This field is required</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="date">Task date</label>
                                            <input
                                                type="date"
                                                id="date"
                                                className="input input-bordered w-full"
                                                {...register('date', { required: true })}
                                            />
                                            {errors.date && <span className='text-red-500'>This field is required</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="taskPriority">Task priority</label>
                                            <select className='select select-bordered w-full' id="taskPriority" {...register('taskPriority', { required: true })}>
                                                <option value="">Select task priority</option>
                                                <option value="Most Critical">Most Critical</option>
                                                <option value="High Priority">High Priority</option>
                                                <option value="Top Priority">Top Priority</option>
                                            </select>
                                            {errors.taskPriority && <span className='text-red-500'>This field is required</span>}
                                        </div>
                                        <button className='btn btn-primary px-10' type="submit">create</button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalForCrTask;