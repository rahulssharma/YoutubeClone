import axios from 'axios';
import React from 'react'
import styled from 'styled-components';
import Card from './Card';
import { useState,useEffect } from 'react';

const Container=styled.div` 
    flex:2;
`;

const Recommendation = ({tags}) => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
      const fetchVideos= async()=>{
        const res=await axios.get(`/video/tags?tags=${tags}`);
        setVideos(res.data);

      };
      fetchVideos();

    }, [tags])
    

  return (
    <Container>
        {videos.map((video)=>(
            <Card type="sm" key={video._id} video={video}/>
        ))}
    </Container>
  )
}

export default Recommendation