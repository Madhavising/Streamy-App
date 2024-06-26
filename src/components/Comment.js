// import React from "react";

// const Comment = ({ data }) => {
//   const { username, comment } = data;
//   return (
//     <div className="flex items-start p-2 bg-gray-200 rounded-xl mb-1">
//       <div className="m-2">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//           className="w-10 h-10"
//         >
//           <path
//             fillRule="evenodd"
//             d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </div>
//       <div className=" py-2">
//         <p className=" text-sm font-medium">{username}</p>
//         <p>{comment}</p>
//       </div>
//     </div>
//   );
// };

// export default Comment;


import React, { useState } from 'react';
import moment from 'moment';

import { BiCaretDown, BiCaretUp, BiDislike, BiLike } from 'react-icons/bi';

const Comment = ({ commentData }) => {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <div className='comment_wrapper mb-6'>
      <div
        className={`topLevelComment_wrapper flex gap-4 items-center text-sm `}
      >
        <img
          className='w-10 flex-none  object-contain rounded-full'
          src={
            commentData?.snippet?.topLevelComment?.snippet
              ?.authorProfileImageUrl ??
            commentData?.snippet?.authorProfileImageUrl
          }
          onError={(e) => {
            e.target.src =
              'https://yt3.ggpht.com/ytc/AL5GRJXYMUyYVz1EPxe9KqJYg2Ga5rYfgnSPdzGKfw=s48-c-k-c0x00ffffff-no-rj';
          }}
          alt='user'
        />
        <div className='comment_details'>
          <div className='flex gap-4 pb-1'>
            <div className='username font-bold text-xs '>
              {commentData?.snippet?.topLevelComment?.snippet
                ?.authorDisplayName ?? commentData.snippet.authorDisplayName}
            </div>
            <div className='comment_time'>
              {moment(
                commentData?.snippet?.topLevelComment?.snippet?.publishedAt ??
                  commentData?.snippet?.publishedAt
              ).fromNow()}
            </div>
          </div>
          <div className='comment'>
            {commentData?.snippet?.topLevelComment?.snippet?.textDisplay ??
              commentData.snippet.textDisplay}
          </div>
          <div className='like_dislike flex gap-4 pt-2'>
            <button className='like  cursor-pointer flex gap-1 items-center  '>
              <div className='like_icon hover:bg-zinc-200 p-2 rounded-full'>
                <BiLike size='1.2rem' className='text-gray-600 dark:text-white' />
              </div>
              <div className='like_count '>
                {Intl.NumberFormat('en', { notation: 'compact' }).format(
                  commentData?.snippet?.topLevelComment?.snippet?.likeCount ??
                    commentData.snippet.likeCount
                )}
              </div>
            </button>
            <button className='cursor-pointer flex gap-1 items-center hover:bg-zinc-200 p-2 rounded-full'>
              <div className=''>
                <BiDislike size='1.2rem' className='text-gray-600 dark:text-white' />
              </div>
            </button>
            <span className='font-semibold cursor-pointer text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 py-2 px-4 rounded-2xl'>
              Reply
            </span>
          </div>
        </div>
      </div>
      <div className='replies'>
        {commentData?.replies && (
          <div className=' ml-4 pl-10'>
            <div
              className='reply_toggle cursor-pointer text-blue-700 dark:text-blue-300 flex font-bold text-sm items-center mb-2'
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? (
                <BiCaretUp size='1.5rem' />
              ) : (
                <BiCaretDown size='1.5rem' />
              )}
              <span className='cursor-pointer'>
                {commentData.replies.comments.length} replies
              </span>
            </div>
            {showReplies && (
              <div>
                {commentData.replies.comments.map((reply) => (
                  <Comment key={reply.id} commentData={reply} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
