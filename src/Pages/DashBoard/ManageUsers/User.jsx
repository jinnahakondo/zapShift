import React from 'react';

const User = ({ user, i }) => {
    console.log(user);
    return (
        <div>
            <tr >
                <th>{i + 1}</th>
                <td>{user?.displayName}</td>
                <td>{user?.email}</td>
                <td><img src={user?.photoURL} alt="" /></td>
                <td>{user?.role}</td>
                <td><button className='btn'>View</button></td>
            </tr>
        </div>
    );
};

export default User;