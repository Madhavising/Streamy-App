import React, {useEffect,useState} from 'react';
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideosCard from "./VideosCard"
import { Link } from "react-router-dom";
import ShimmerHome from "./ShimmerHome"
//import { BASE_URL } from "./../utils/constants";

   const VideoContainer = () => {
    const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

    const getVideos = async () => {
      try {
    
       const data = await fetch(YOUTUBE_VIDEOS_API);

        if (!data.ok) {
          throw new Error('Failed to fetch data');
        }

        const json = await data.json();
       // console.log(json.items)
        setVideos(json.items);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
      }
    };



  return (
    
    <div className='grid justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(310px,_1fr))] max-xl:grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-[2rem_1rem] pt-6 px-8 overflow-x-hidden border-r dark:border-none flex-col 2-[15rem] h-[calc(100vh-4.635rem)] overflow-y-scroll min-w-fit bg-white dark:bg-zinc-900 dark:text-white transition-all duration-500'
    style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
   {videos.map(video =>( 
   <Link key={video.id} to={"/watch?v=" + video.id}>
    <VideosCard info={video} />
    </Link>
   ))}
      {/* {videos.length > 0 && (
        <VideosCard info={videos[0]} 
        /> */}
     <ShimmerHome /> 
    </div>
  );
};

export default VideoContainer
