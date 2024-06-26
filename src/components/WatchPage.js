import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
//import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import SideBarExpanded from "./SideBarExpanded";
import { GOOGLE_API_KEY } from "../utils/constants";
import { BASE_URL } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import Comments from "./Comments";
import VideoMetaData from "./VideoMetaData";
//import VideoSuggestions from "./VideoSuggestions";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("v"));
  const videoId = searchParams.get("v");

  //const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(toggleSideBar());
  // }, []);
  const dispatch = useDispatch();
  const isSideBarOpen = useSelector((store) => store.app.isSideBarOpen);

  useEffect(() => {
    if (isSideBarOpen) {
      dispatch(toggleSideBar());
    }
    // eslint-disable-next-line
  }, []);

  const getVideoDetail = async () => {
    const response = await fetch(
      BASE_URL +
        `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();
    return data.items[0];
  };

  const { data: videoDetails, isLoading } = useQuery({
    queryKey: ["watch-page", "video-details", videoId],
    queryFn: () => getVideoDetail(videoId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  // return (
  //   <div className="flex flex-col w-full">
  //     <SideBarExpanded />
  //     <div className="px-5 flex w-full">
  //       <div className=" ">
  //         <iframe
  //           width="1200"
  //           height="600"
  //           src={"https://www.youtube.com/embed/" + searchParams.get("v")}
  //           title="YouTube video player"
  //           frameBorder="0"
  //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  //           referrerPolicy="strict-origin-when-cross-origin"
  //           allowFullScreen
  //         ></iframe>
  //       </div>
  //       <div>
  //         <LiveChat />
  //       </div>
  //     </div>
  //     <Comments
  //           videoId={videoId}
  //           commentCount={videoDetails?.statistics?.commentCount}
  //         />
  //     {/* <CommentsContainer /> */}
  //   </div>
  // );

//   return isLoading ? null : (
//     <div className="block lg:flex">
//       <SideBarExpanded />
//       <div
//         className={`min-h-[calc(100vh-4.62rem)] dark:bg-zinc-900 dark:text-white grid grid-cols-12 md:gap-x-8 px-4 md:px-12 2xl:px-24 gap-y-4 pt-4 ${
//           isSideBarOpen && "h-[calc(100vh-4.62rem)] overflow-x-hidden"
//         }`}
//       >
//         <div className="col1 col-span-12 lg:col-span-8  ">
//           <div className="video mb-4 ">
//             <div className="player mb-4 h-[32vh] md:h-[50vh] lg:h-[50vh] 2xl:h-[70vh]">
//               <iframe
//                 width="100%"
//                 height="100%"
//                 src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
//                 title={videoDetails?.snippet?.title}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
//                 allowFullScreen
//               ></iframe>
//             </div>
          
//             {isLoading ? (
//               <div>loading....</div>
//             ) : (
//               <VideoMetaData
//                 videoDetails={videoDetails}
//                 channelId={videoDetails?.snippet?.channelId}
//               />
//             )}
//           </div>
        
//           <Comments
//             videoId={videoId}
//             commentCount={videoDetails?.statistics?.commentCount}
//           />
//         </div>
//         <div className="col2 col-span-12 lg:col-span-4  w-4/12 lg:block">
//               <LiveChat />
//             </div>
//         {/* <div className="col2 col-span-12 lg:col-span-4 ">
//           <VideoSuggestions videoId={videoId} videoTitle={videoDetails?.snippet?.title} />
//         </div> */}
//       </div>
//     </div>
//   );

return isLoading ? null : (
  <div className="block lg:flex">
    <SideBarExpanded />
    <div className={`min-h-[calc(100vh-4.62rem)] dark:bg-zinc-900 dark:text-white grid grid-cols-12 md:gap-x-8 px-4 md:px-12 2xl:px-24 gap-y-4 pt-4 ${isSideBarOpen && "h-[calc(100vh-4.62rem)] overflow-x-hidden"}`}>
      <div className="col1 col-span-12 lg:col-span-8">
        <div className="video mb-4">
          <div className="player mb-4 h-[32vh] md:h-[50vh] lg:h-[50vh] 2xl:h-[70vh]">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
              title={videoDetails?.snippet?.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <VideoMetaData videoDetails={videoDetails} channelId={videoDetails?.snippet?.channelId} />
        </div>
        <Comments videoId={videoId} commentCount={videoDetails?.statistics?.commentCount} />
      </div>
      <div className="col2 col-span-12 lg:col-span-4 w-4/12 lg:block mt-[2rem]">
        <LiveChat />
      </div>
      
    </div>
  </div>
);

 };

export default WatchPage;
