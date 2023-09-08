import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { newGroup } from '../../../fetures/groupTasks/groupTasksSlice';

const ModalForCrGroup = ({ isOpen, closeModal }) => {
    const dispatch = useDispatch();
    const { user } = useAuth()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        data.id = crypto.randomUUID();
        data.message = [];
        data.users = [];
        dispatch(newGroup(data))
        closeModal();
        reset();
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        Create your group
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                                        <div>
                                            <label htmlFor="groupName">Group Name</label>
                                            <input
                                                className="input input-bordered w-full"
                                                type="text"
                                                id="groupName"
                                                {...register('groupName', { required: true })}
                                            />
                                            {errors.groupName && <span className='text-red-500'>This field is required</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="groupAdmin">Group Admin</label>
                                            <input
                                                className="input input-bordered w-full"
                                                type="email"
                                                value={user?.email}
                                                id="groupAdmin"
                                                {...register('groupAdmin', { required: true })}
                                            />
                                            {errors.groupAdmin && <span className='text-red-500'>This field is required</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="groupImage">Group Image URL</label>
                                            <input
                                                type="url"
                                                id="groupImage"
                                                className="input input-bordered w-full"
                                                {...register('groupImage', { required: true })}
                                            />
                                            {errors.groupImage && <span className='text-red-500'>This field is required</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="purpose">Purpose</label>
                                            <select className='select select-bordered w-full' id="purpose" {...register('purpose', { required: true })}>
                                                <option value="">Select Purpose</option>
                                                <option value="For web development">For web development</option>
                                                <option value="For UI/UX">For UI/UX</option>
                                                <option value="For marketing">For marketing</option>
                                            </select>
                                            {errors.purpose && <span className='text-red-500'>This field is required</span>}
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

export default ModalForCrGroup;