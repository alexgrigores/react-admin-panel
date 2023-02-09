import React from 'react';
import './UserItem.css';

function UserItem(props) {
    const {id, name, email, isGoldClient, salary, imgUrl} = props;

    return (
        <div className='containerUser'>
            <h3>{ name }</h3>
            <p>{ email }</p>
            <p>{ salary }</p>
            <img src={ imgUrl } alt="User test"/>
            { isGoldClient
                ? <h3>Client GOLD</h3>
                : null
            }
            <div>
                <button onClick={(event) => props.deleteUser(event, id)}>Sterge user</button>
            </div>
        </div>
    );
}

export default UserItem;