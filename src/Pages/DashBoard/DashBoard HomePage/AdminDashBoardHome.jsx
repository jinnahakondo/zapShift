import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

const AdminDashBoardHome = () => {

    const axiosSecure = useAxiosSecure();

    const { data = [] } = useQuery({
        queryKey: ['delivery-status-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/delivery-status/stats');
            return res.data;

        }
    })

    const getPiChart = data => {
        return data.map(item => { return { name: item.status, value: item.count } })
    }
    console.log(getPiChart(data));
    console.log(data);
    return (
        <div className='w-11/12 mx-auto'>
            <div className="stats shadow">
                {data.map(stat => <div className="stat" key={stat._id}>
                    <div className="stat-figure text-secondary">
                    </div>
                    <div className="stat-title">{stat._id}</div>
                    <div className="stat-value">{stat.count}</div>

                </div>)}


            </div>

            <div className='w-full h-[500px] mt-10'>
                <BarChart
                    style={{ width: '100%', maxWidth: '400px', maxHeight: '100px', aspectRatio: 1.618 }}
                    responsive
                    data={getPiChart(data)}
                >
                    <Bar dataKey="value" data={getPiChart(data)} fill="#8884d8" />
                    <XAxis />
                    <YAxis  />
                    <Tooltip />
                </BarChart>
            </div>
        </div>
    );
};

export default AdminDashBoardHome;