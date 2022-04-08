import React, { useEffect, useState } from 'react';
// import GetTeamsId from '../GetTeamsId/GetTeamsId';
import { useNavigate } from 'react-router-dom';
import classes from './getteams.module.scss'

const GetTeams = () => {
     
    const [teamsData, setTeamsData] = useState();
    const [loaded, setLoaded] = useState(false);
    const [idLoad, setIdLoad] = useState();

    const getTeamsData = async () => {
        const res = await fetch('http://localhost:8000/api/teams')
            .then((res) => res.json());
            console.log(res)
            setTeamsData(res)
            setLoaded(true)
    };


    useEffect(() => {
        getTeamsData()
    }, [setTeamsData])

    // getTeamsData();

    let history = useNavigate();

    const handleClick = (id) => {
        history(`/teams/${id}`)
    }


    return (
        <div className={classes.cardAllPosts}>
            <div className='card'>
                {!loaded &&
                    <p>Loading...</p>
                }
                {loaded && teamsData.map(team => {
                    return(
                        <div key={team._id}>
                            <h2>Nom de la team : {team.name}</h2>
                            <p>Createur de la team :{team.user_creator.name}</p>
                            <p>Créée le : {team.date.slice(0, 10)}</p>
                            <button onClick={() => handleClick(team._id)}>Voir</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default GetTeams;



  