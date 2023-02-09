import React from 'react';
import UserItem from './UserItem';

function UserList(props) {
    const { users } = props;

    return (
        <div>
            <h2>Lista utilizatorilor:</h2>
            { users.map((user, index) => {
                return <UserItem
                    id={ user.id }
                    name={ user.name }
                    email={ user.email }
                    isGoldClient={ user.isGoldClient }
                    salary= { user.salary }
                    imgUrl= { user.imgUrl }
                    key={ index }
                    deleteUser={ props.deleteUser }
                />
            })}
        </div>
    );
}

export default UserList;