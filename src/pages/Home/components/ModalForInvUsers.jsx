import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import SingleUser from './SingleUser';

const ModalForInvUsers = ({ isOpenForInvite, closeModalForInvite, usersData, group }) => {
    return (
        <>
            <Transition appear show={isOpenForInvite} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalForInvite}>
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
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 mb-5"
                                    >
                                        Invite users for group
                                    </Dialog.Title>
                                    {
                                        usersData.map(user => <SingleUser key={user.id} user={user} group={group} />)
                                    }
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalForInvUsers;