// import React from "react";
// import ChatMessage from "./ChatMessage";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addMessage } from "../utils/chatSlice";
// import { generateRandomName, makeRandomMessage } from "../utils/helper";


// const LiveChat = () => {
//     const [liveMessage, setLiveMessage] = useState("");
//     const dispatch = useDispatch();
//     const chatMessages = useSelector((store) => store.chat.messages);

//     useEffect(() => {
//         const i = setInterval(() => {
//           // API Polling
    
//           dispatch(
//             addMessage({
//              name: generateRandomName(),
//               message: makeRandomMessage(20) + " 🚀",
           
//             })
//           );
//         }, 2000);

//         return () => clearInterval(i);
//     }, []);

//   return (
//     <>
//       <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
//       <div>
//           {
//             // Disclaimer: Don't use indexes as keys
//             chatMessages.map((c, i) => (
//               <ChatMessage key={i} name={c.name} message={c.message} />
//             ))
//           }
//         </div>
//       </div>
//       <form
//         className="w-full p-2 ml-2 border border-black"
//         onSubmit={(e) => {
//           e.preventDefault();

//           dispatch(
//             addMessage({
//               name: "Madhavi Singh",
//               message: liveMessage,
//             })
//           );
//           setLiveMessage("");
//         }}
//       >
//         <input
//           className="px-2 w-96"
//           type="text"
//           value={liveMessage}
//           onChange={(e) => {
//             setLiveMessage(e.target.value);
//           }}
//         />
//         <button className="px-2 mx-2 bg-green-100">Send</button>
//       </form>
//     </>
//   );
// };

// export default LiveChat;


import React, { useEffect, useState } from "react";
import ChatMessages from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomComment, generateRandomName } from "../utils/helper";
import { toggleChatBox } from "../utils/appSlice";

const LiveChat = () => {
  const { isChatBoxOpen } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const { chatMessages } = useSelector((store) => store.chat);
  const [inputMessage, setInputMessage] = useState("");

  const handleWriteChat = (e) => {
    e.preventDefault();

    dispatch(
      addMessage({
        name: "user",
        message: inputMessage,
      })
    );
    setInputMessage("");
  };

  useEffect(() => {
    // API Polling
    const interval = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomComment(),
        })
      );
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <div className=" w-[20rem] xl:w-[25rem]">
      <div
        className={`${
          isChatBoxOpen ? "block" : "hidden"
        } relative top-[5rem] border border-gray-300 w-[20rem] xl:w-[25rem] h-[32rem] rounded-t-lg pt-4 flex flex-col-reverse overflow-x-scroll z-0`}
      >
        <div>
          {chatMessages.map((chat, index) => (
            <ChatMessages key={index} name={chat.name} message={chat.message} />
          ))}
        </div>
      </div>
      <form
        className={`${
          isChatBoxOpen ? "block" : "hidden"
        } border border-gray-300 flex justify-center relative items-center  py-2 cursor-pointer z-20 bg-white`}
      >
        <input
          type="text"
          placeholder="Chat..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className=" bg-gray-200 w-[90%] p-1 px-4 rounded-3xl border-none outline-none"
        />
        <button onClick={(e) => handleWriteChat(e)} className="hidden"></button>
      </form>
      <div className=" border border-gray-300 rounded-b-lg flex justify-center relative items-center hover:bg-gray-200 py-2 cursor-pointer z-20 bg-white">
        <p onClick={() => dispatch(toggleChatBox())}>Hide Chat</p>
      </div>
    </div>
  );
};

export default LiveChat;