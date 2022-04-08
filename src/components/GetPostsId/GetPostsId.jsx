import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from "./getpostsid.module.scss"
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';

const GetPostsId = () => {

    const navigate = useNavigate();
    
    const [postData, setPostData] = useState();
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();

    const getPostsData = async () => {
        const res = await fetch(`http://localhost:8000/api/posts/${id}`)
            .then((res) => res.json());
            console.log(res.posts)
            setPostData(res.posts)
            setLoaded(true)
    };


    useEffect(() => {
        getPostsData()
    }, [setPostData])
 

    if(loaded){
        return(
            <div>
                <AiOutlineArrowLeft className={classes.arrowBack} onClick={() => navigate(-1)}/>
                <div className={classes.container}>
                    <h1>Titre : {postData.title}</h1>
                    <h3>Description :</h3>
                    <p>{postData.description}</p>
                    <p>Par : {postData.author}</p>
                    <p>Posté le : {postData.date.slice(0, 10)}</p>
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

export default GetPostsId;


