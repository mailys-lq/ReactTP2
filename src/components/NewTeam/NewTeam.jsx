import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userError } from '../../redux/stateUser/userAction';
import classes from './newteam.module.scss'
import { useNavigate } from 'react-router-dom';


const NewTeam = () => {

    const [name, setName] = useState('');
    const [user_creator, setUserCreator] = useState('');
    const userState = useSelector(state => state)
    const navigate = useNavigate();


    const dispatch = useDispatch();


    const userCookie = Cookies.get('token')


    const data = {
        name: name,
        user_creator: user_creator
      };
      
    const createTeamFetchRequest = () => {
        fetch('http://localhost:8000/api/teams/new', {
            method: 'team',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userCookie}`
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.error) {
                console.log(response.message[0].messages[0].message);
                dispatch(userError(response.message[0].messages[0].message));
                console.log(userError)
            } else {
                console.log(response)
            //   navigate(`/teams/${response._id}`)
            }
        })

    }

    return (
    <div className={classes.main}>
        <form action="team">
            <label htmlFor="name">Name :</label>
            <input type="text" value={title} onChange={(e) => setName(e.target.value)} id='name' />
            <button type="button" onClick={() => createTeamFetchRequest()}>Create post</button>        
        </form>
    </div>

    );
};

export default NewTeam;