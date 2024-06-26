// import React from 'react';
// import { truncateText } from "./TruncateText";
// import NumberFormatter from "./NumberFormatter";
// import moment from "moment";

// const VideosCard = ({ info }) => {
//     // const { snippet, statistics } = info;
//     // const { title, channelTitle, thumbnails } = snippet;
//     // const { viewCount, likeCount, commentCount } = statistics;
//       const { snippet, statistics } = info;
//   const { title, thumbnails, channelTitle, publishedAt } = snippet;
//   const { viewCount } = statistics;

//     return (
//         <div className="p-2 m-2 w-72 shadow-lg">
//             <img className="w-full rounded-xl mb-2" alt="thumbnail" src={thumbnails.medium.url} />
//             {/* <ul>
//                 <li className="font-bold py-2">{title}</li>
//                 <li>{channelTitle}</li>
//                 <li>Views: {viewCount}</li>
//                 <li>Likes: {likeCount}</li>
//                 <li>Comments: {commentCount}</li>
//             </ul> */}
//              <h3 className="whitespace-normal break-words text-[15px] font-medium">
//           {truncateText(title, 90)}
//          </h3>
//          <p className=" text-[14px] text-[#606060]">{channelTitle}</p>
//          <div className="flex">
//            <p className=" text-[14px] text-[#606060] mr-1">
//              <NumberFormatter number={viewCount} />
//              views
//            </p>
//            <p className="text-[#606060]"> &#8226; </p>
//            <p className=" text-[14px] text-[#606060] ml-1">
//              {moment(publishedAt).fromNow()}
//            </p>
//          </div>
//         </div>
//     );
// };

// export default VideosCard;


import React from "react";
import { truncateText } from "./TruncateText";
import NumberFormatter from "./NumberFormatter";
import moment from "moment";


const VideoCards = ({ info }) => {
  const { snippet, statistics } = info;
  const { title, thumbnails, channelTitle, publishedAt } = snippet;
  const { viewCount } = statistics;

  return (
    <>
      <div className="w-[95%] h-[100%] flex flex-col pl-2 ">
        <img
          className="w-full rounded-xl mb-2"
          src={thumbnails.medium.url}
          alt="thumbnail"
        />
        <h3 className="whitespace-normal break-words text-[15px] font-medium">
          {truncateText(title, 90)}
        </h3>
        <p className=" text-[14px] text-[#606060]">{channelTitle}</p>
        <div className="flex">
          <p className=" text-[14px] text-[#606060] mr-1">
            <NumberFormatter number={viewCount} />
            views
          </p>
          <p className="text-[#606060]"> &#8226; </p>
          <p className=" text-[14px] text-[#606060] ml-1">
            {moment(publishedAt).fromNow()}
          </p>
        </div>
      </div>
    </>
  );
};

export default VideoCards;



