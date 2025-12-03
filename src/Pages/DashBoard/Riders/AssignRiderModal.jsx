import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRiderModal = ({ modalRef, riders, selectedParcel, refetch }) => {

    const axiosSecure = useAxiosSecure()

    const handelAsignRider = async rider => {
        const riderInfo = {
            riderId: rider._id,
            riderEmail: rider.email,
            riderName: rider.name,
            trackingId: selectedParcel.trackingId
        }
        const res = await axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderInfo)

        if (res.data.modifiedCount) {
            modalRef.current.close();
            refetch();
            Swal.fire({
                title: "Good job!",
                text: "rider has been assigned ",
                icon: "success"
            });
        }

    }
    return (
        <dialog
            ref={modalRef}
            className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">available riders for delevery: {riders?.length}</h3>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                riders.map((rider, i) => <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>
                                        <button
                                            onClick={() => handelAsignRider(rider)}
                                            className='btn btn-sm btn-success'>Assign</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

    );
};

export default AssignRiderModal;