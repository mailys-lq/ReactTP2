import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from "./getteamsid.module.scss"
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Cookies from 'js-cookie';

const GetTeamsId = () => {

    const navigate = useNavigate();
    
    const [teamData, setTeamData] = useState();
    const [loaded, setLoaded] = useState();
    const { id } = useParams();
    

    let userConnectedId = Cookies.get('id');

    const getTeamsData = async () => {
        const res = await fetch(`http://localhost:8000/api/teams/${id}`)
            .then((res) => res.json());
           console.log(res)
            setTeamData(res.teams)
            setLoaded(true)
    };
    const joinTeam = async () => {
        const res = await fetch(`http://localhost:8000/api/teams/join/${id}`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        console.log(res)
    };

    
    const leaveTeam = async () => {

        const res = await fetch(`http://localhost:8000/api/teams/leave/${id}`)
            .then((res) => res.json());
    };


    useEffect(() => {
        getTeamsData()
    }, [setTeamData])
 

    if(loaded){
        return(
            <div>
                <button onClick={() => joinTeam()}>Rejoindre cette team</button>
               
                 {/* {!teamData.users.all_users.includes(userConnectedId) &&
                   <button onClick={() => joinTeam()}>Rejoindre cette team</button>
                }  */}
                {/* {teamData.users.all_users.includes(userConnectedId) &&
                 <button onClick={() => leaveTeam()}>Quitter cette team</button>
                } */}
                <AiOutlineArrowLeft className={classes.arrowBack} onClick={() => navigate(-1)}/>
                <div className={classes.container}>
            
                        <h2>Nom de la team : {teamData.name}</h2>
                        <p>Createur de la team :{teamData.user_creator.name}</p>
                        <p>Créée le : {teamData.date.slice(0, 10)}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
};

export default GetTeamsId;


