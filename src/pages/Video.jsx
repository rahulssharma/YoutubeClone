import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Comments from '../components/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { fetchSuccess,like,dislike } from '../redux/videoSlice';
import { subscription } from '../redux/userSlice';
import {format} from 'timeago.js';
import Recommendation from '../components/Recommendation';
const Container= styled.div`
    display: flex;
    gap: 24px;
`;
const Content= styled.div`
    flex:5;
`;

const VideoWrapper= styled.div`
    
`;

const Details= styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Info= styled.span` 
    color: ${({theme})=> theme.text};

`;
const Buttons= styled.div`
    display: flex;
    gap: 20px;
    color: ${({theme})=> theme.text};

`;
const Button= styled.div` 
    display: flex;
    align-items: center;
    gap:5px;
    cursor:pointer;
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme})=> theme.soft} ;
`;

const Channel=styled.div`
    display:flex;
    justify-content: space-between;
`;
const ChannelInfo=styled.div`
    display: flex;
    gap: 20px;
`;

const Subscribe=styled.button`
    background-color:#cc1a00;
    font-weight: 500;
    color:white;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`;

const Image=styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;
const ChannelDetail=styled.div`
    display: flex;
    flex-direction: column;
    color: ${({theme})=> theme.text};
`;
const ChannelName=styled.span`
    font-weight: 500;
`;
const ChannelCounter=styled.span`
    margin-top: 5px;
    margin-bottom: 20px;
    color: ${({theme})=> theme.textSoft};
    font-size: 12px;
`;
const Description=styled.p`
    font-size: 14px;
`;

const VideoFrame= styled.video`
    max-height: 720px;
    width: 100%;
    object-fit: cover;
`


const Video = () => {

    const {currentUser}= useSelector((state)=>state.user);
    const {currentVideo}= useSelector((state)=>state.video);
    const dispatch=useDispatch();
    const [channel,setChannel]=useState({});
    const path=useLocation().pathname.split("/")[2];

    const handleLike=async()=>{
        await axios.put(`/users/like/${currentVideo._id}`);
        dispatch(like(currentUser._id))
    }

    const handleDislike=async()=>{
        await axios.put(`/users/dislike/${currentVideo._id}`)
        dispatch(dislike(currentUser._id))

    }

    const handleSub=async()=>{
        currentUser.subscribedUsers.includes(channel._id) ? 
        await axios.put(`/users/unsub/${channel._id}`) :
        await axios.put(`/users/sub/${channel._id}`)
        dispatch(subscription(channel._id))

    }


    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const videoRes=await axios.get(`/video/find/${path}`)
                const channelRes=await axios.get(`/users/find/${videoRes.data.userId}`);
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data))  
            
            } catch (error) {
                 console.log(error)
            }
            }
                fetchData();
            },[path,dispatch])
        
          
  return (
    <Container>
      <Content>
        <VideoWrapper>
            <VideoFrame src={currentVideo.videoUrl} controls/>
          {/* <iframe width="100%"
           height='520' 
           src={videos} 
           title='Youtube video Player' 
           frameBorder='0' 
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
           allowFullScreen>
           </iframe> */}
        </VideoWrapper>
      
    <Details>
          <Info>{currentVideo.views} views . {format(currentVideo.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
               {currentVideo.likes?.includes(currentUser._id) ?<ThumbUpIcon/>: <ThumbUpOffAltIcon/>}{currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
                {currentVideo.dislikes?.includes(currentUser._id) ?<ThumbDownIcon/>: <ThumbDownOffAltIcon/>} Dislike
            </Button>
            <Button>
                <ReplyIcon/> Share
            </Button>
            <Button>
                <AddTaskOutlinedIcon/> Save
            </Button>
          </Buttons>
        </Details>        
          <Hr/>
        <Channel>
          <ChannelInfo>
              <Image src={channel.img}/>
              <ChannelDetail>
                  <ChannelName>{channel.name}</ChannelName>
                  <ChannelCounter>{channel.subcribers} subscribers</ChannelCounter>
                  <Description>{currentVideo.desc}</Description>
              </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>{currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED": "SUBSCRIBE"}</Subscribe>
        </Channel>
        <Comments videoId={currentVideo._id}/>
      </Content>
           <Recommendation tags={currentVideo.tags}/>
    </Container>
  ) 
}

export default Video