import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2'

const AssignedDelivery = () => {

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'assigned-to-rider'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/riders?riderEmail=${user.email}&delevaryStatus=assigned-to-rider`)
            return res.data;
        }
    })


    // accept parcel for delivery 
    const handelAccept = async (parcel, status) => {
        const deliveryInfo = {
            status,
            riderId: parcel.riderId,
            trackingId: parcel.trackingId
        }

        const message = `Parcel Is ${status}`
        const res = await axiosSecure.patch(`/parcels/${parcel._id}/status`, deliveryInfo)
        if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
                text: message,
                icon: "success"
            });
        }
    }

    return (
        <div className='mx-auto max-w-7xl mt-20'>
            <h3 className='text-2xl font-bold my-6'>Pending parcels for pickup: {parcels.length}</h3>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Parcel Name</th>
                            <th>Confirmation </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) => <tr>
                                <th>{i + 1}</th>
                                <td>{parcel.ParcelName}</td>
                                <td >
                                    {
                                        parcel.delevaryStatus === "assigned-to-rider" &&
                                        <>
                                            <button
                                                onClick={() => handelAccept(parcel, "rider_arriving")}
                                                className='btn btn-primary text-black mr-5'>Accept</button>
                                            <button className='btn btn-warning  '>Reject</button>
                                        </>
                                    }
                                    {
                                        parcel.delevaryStatus === 'rider_arriving' &&
                                        <>
                                        </>
                                    }
                                    {
                                        parcel.delevaryStatus === 'rider_arriving' &&
                                        <>
                                            Accepted
                                            <button
                                                onClick={() => handelAccept(parcel, "parcel_pickedUp")}
                                                className='btn btn-primary text-black mr-5 mx-5'>Mark As PickedUp</button>
                                        </>

                                    }
                                    {
                                        parcel.delevaryStatus === 'parcel_pickedUp' &&
                                        <button
                                            onClick={() => handelAccept(parcel, "parcel_delivred")}
                                            className='btn btn-primary text-black mr-5 mx-5'>Mark As delivred</button>
                                    }
                                </td>

                                <td>
                                    {parcel.delevaryStatus}
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDelivery;