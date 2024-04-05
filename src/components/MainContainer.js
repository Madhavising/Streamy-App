import React from 'react'
//import ButtonList from './ButtonList'
import VideoContainer from "./VideoContainer"
import Tags from "./Tags";

const MainContainer = () => {
  return (
    <div className=" flex-1 bg-white dark:bg-zinc-900 transition-all duration-500 ">
        {/* <ButtonList/> */}
        <div className='flex gap-1 mb-2'>
        <Tags/>
        </div>
        
        <VideoContainer/>
    </div>
  )
}

export default MainContainer