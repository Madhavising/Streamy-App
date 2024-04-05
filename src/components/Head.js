import React, {useState,useEffect, useContext} from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiSearch } from "react-icons/tfi";
// import { MdKeyboardVoice } from "react-icons/md";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
//import logo_light_theme from "../assests/logo_light_theme.webp";
import { useDispatch, useSelector } from "react-redux";
import {toggleMenu,toggleSideBar } from "../utils/appSlice"
import {YOUTUBE_SEARCH_API} from "../utils/constants"
import { cacheResults } from "../utils/searchSlice";
import ThemeContext from "../utils/ThemeContext";
import logo_light_theme from "../assests/logo_light_theme.webp";
import logo_dark_theme from "../assests/logo_dark_theme.webp";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
// import SuggestionDropDown from "./SuggestionDropDown";

const Head = () => {


  const [searchQuery, setSearchQuery] = useState("");
  const [ suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const isCurrentDark = theme === "dark";
    setTheme(isCurrentDark ? "light" : "dark");
    localStorage.setItem("theme", isCurrentDark ? "light" : "dark");
  };

 

  const searchCache = useSelector((store)=>store.search);
  const dispatch = useDispatch();
  useEffect(()=>{
   // API call 
   //make api call after every key press
   //but if the difference between 2 API calls is <200ms
   // decline the api call
   const timer = setTimeout(() => {
    if(searchCache[searchQuery]){
      setSuggestions(searchCache[searchQuery]);
    }else{
      getSearchSuggestions();
    }
    
  }, 200);
   
   return ()=>{   // it is type of component unMounted or refresh the component 
    clearTimeout(timer);
   }
  },[searchQuery]);

 
/**
 * 
 * key -i
 * - re-render the component
 * - useEffect();
 * - start timer => make api call after 200ms
 * 
 * 
 * key ip
 * - destroy the component(useEffect return method)
 * - render the component
 * - useEffect();
 * - start timer => make api call after 200ms
 *
 * 
 * setTimeout(200) = make an api call
 * 
 * /setTimeout(200) = clear the setup

 */

  const getSearchSuggestions = async ()=>{
    //console.log(searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API+ searchQuery);
    const json = await data.json();
    //console.log(json[1])
    setSuggestions(json[1]);

    // update cache
    dispatch(cacheResults({
      [searchQuery] : json[1]
    }))
  }
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  
  // const toggleSideBarHandler = () => {
  //   dispatch(toggleSideBar());
  // };
  
  return (
    <div className="px-4 py-2 flex justify-between items-center shadow-sm  w-full sticky top-0 z-10 bg-white h-[4.62rem] dark:bg-zinc-900 dark:text-white transition-all duration-500">
      <div className="left-items flex items-center">
        <button className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
          <RxHamburgerMenu
          onClick={()=> toggleMenuHandler()}
            size="1.5rem"
            title="hambergur menu"
            className="cursor-pointer"
          />
        </button>
        <div className="logo cursor-pointer flex items-center max-md:hidden">
          <a href="/">
            <img
              src={theme === "light" ? logo_light_theme : logo_dark_theme}
             // src={logo_light_theme}
              alt="logo"
              title="logo"
              className="w-52 pl-4 lg:w-36"
            />
          </a>
        </div>
      </div>
      <div className="center w-3/5 2xl:w-2/5 max-sm:ml-2 max-sm:mr-4 flex items-center ml-16 relative">
        <div className="searchbar dark:bg-zinc-800 flex-1 flex items-center ml-10 rounded-3xl border-2 dark:border dark:border-gray-500">
          
          <input
            type="text"
            placeholder="Search"
            className="rounded-full p-2 pl-8 focus:outline-none w-full dark:bg-zinc-800 text-gray-700 dark:text-white"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
           onBlur={() => 
            // Delay hiding suggestions to allow time for click events
            setShowSuggestions(false)}
          />
          <div className="p-3 cursor-pointer hover:bg-zinc-200 px-8 rounded-r-3xl bg-zinc-100 border-l-2 border-zinc-200 max-md:bg-white max-md:border-none max-md:px-4 max-lg:px-4 dark:bg-zinc-800 dark:border-l dark:border-gray-500 ">
            <button className="flex items-center">
              <TfiSearch size="1.2rem" className="" />
            </button>
            </div>
            {showSuggestions && (
            <div className="absolute z-50 bg-white top-10 sm:top-14 left-1/2 -translate-x-1/2 w-[8rem] xs:w-[12rem] sm:w-[17rem] md:w-[20rem] lg:w-[26rem] xl:w-[30rem] 2xl:w-[34rem] rounded-lg shadow-xl border-x border-gray-400">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
            )}
          </div>
          
        
      </div>

      <div className="right-menu flex  items-center sm:ml-4 lg:ml-16 gap-5 p-2">
      <div className="toggle-dark-mode-switch  flex items-center gap-2">
          <label
            htmlFor="check"
            className="bg-gray-100 dark:bg-zinc-700 relative top-0 w-20 h-8 rounded-full cursor-pointer flex items-center justify-around dark:text-black"
          >
            {" "}
            <BsFillSunFill className="text-amber-400" size="1.2rem" />
            <BsFillMoonFill className="text-zinc-700" size="1.2rem" />
            <input
              type="checkbox"
              id="check"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={handleThemeChange}
            />
            <span className="w-2/5 h-4/5 bg-amber-400 absolute rounded-full left-1 top-1 peer-checked:bg-white peer-checked:left-11 transition-all duration-500 "></span>
          </label>
        </div>
        <div className="p-2 max-sm:hidden  hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
          <RiVideoAddLine size="1.5rem" />
        </div>
        <div className="p-2 max-sm:hidden  hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
          <IoMdNotificationsOutline size="1.5rem" />
        </div>
        <div className="p-2 max-sm:hidden   hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
          <FaUserCircle size="1.5rem" />
        </div>
      </div>
    </div>
  );
};

export default Head;

// import React, { useState, useEffect, useRef, useContext } from "react";
// import { TfiSearch } from "react-icons/tfi";
// import { RiVideoAddLine } from "react-icons/ri";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { FaUserCircle } from "react-icons/fa";

// //import { toggleMenu, toggleSideBar } from "../utils/appSlice";
// import { useDispatch, useSelector } from "react-redux";
// //import { useLocation } from "react-router-dom";
// import SuggestionDropDown from "./SuggestionDropDown";
// import useClickOutside from "../utils/useClickOutside";
// import { cacheResults } from "../utils/searchSlice";
// import ThemeContext from "../utils/ThemeContext";
// import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
// import { changeCategory } from "../utils/categorySlice";
// import logo_light_theme from "../assests/logo_light_theme.webp";
// import logo_dark_theme from "../assests/logo_dark_theme.webp";
// import { YOUTUBE_SEARCH_API } from "../utils/constants";



// const Head = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [suggestions, setSuggestions] = useState([]);
//   const searchRef = useClickOutside(() => setLoading(true));
//   const inputRef = useRef(null);
//   const { theme, setTheme } = useContext(ThemeContext);
//   const searchCache = useSelector((store) => store.search.suggestions);
//   const category = useSelector((store) => store.videoCategory.category);

//   //const route = useLocation();
//   const dispatch = useDispatch();

//   const handleSetHomeVideoByKeyword = (searchQuery) => {
//     if (category !== searchQuery) {
//       dispatch(changeCategory(searchQuery));
//     }
//     setLoading(true);
//     setSuggestions([]);
//     setSearchQuery("");
//   };

//   // const toggleMenuHandler = () => {
//   //   dispatch(toggleMenu());
//   // };

//   // const toggleSideBarHandler = () => {
//   //   dispatch(toggleSideBar());
//   // };

//   const handleThemeChange = () => {
//     const isCurrentDark = theme === "dark";
//     setTheme(isCurrentDark ? "light" : "dark");
//     localStorage.setItem("theme", isCurrentDark ? "light" : "dark");
//   };

//   useEffect(() => {
//     const getAutocompletion = async (searchQuery) => {
//       const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
//       const data = await response.json();
//       dispatch(cacheResults({ [searchQuery]: data[1] }));
//       setSuggestions(data[1]);
//       setLoading(false);
//     };

//     if (searchQuery.length > 2) {
//       if (searchCache[searchQuery]) {
//         setSuggestions(searchCache[searchQuery]);
//         setLoading(false);
//       } else {
//         getAutocompletion(searchQuery);
//       }
//     }
//   }, [searchQuery, searchCache, dispatch]);

//   return (
//     <div className="px-4 py-2 flex justify-between items-center shadow-sm  w-full sticky top-0 z-10 bg-white h-[4.62rem] dark:bg-zinc-900 dark:text-white transition-all duration-500">
//       <div className="left-items flex items-center">
//         <div className="logo cursor-pointer flex items-center max-md:hidden">
//           <a href="/">
//             <img
//               src={theme === "light" ? logo_light_theme : logo_dark_theme}
//               alt="logo"
//               title="logo"
//               className="w-52 pl-4 lg:w-36"
//             />
//           </a>
//         </div>
//       </div>
//       <div className="center w-3/5 2xl:w-2/5 max-sm:w-4/5 max-sm:ml-2 max-sm:mr-4 flex items-center ml-16 relative">
//         <div ref={searchRef} className="searchbar  dark:bg-zinc-800 flex-1 flex items-center ml-10 rounded-3xl border-2 dark:border dark:border-gray-500">
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder="Search"
//             value={searchQuery}
//             className="rounded-l-3xl p-2 pl-8 focus:outline-none w-full dark:bg-zinc-800"
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onFocus={(e) => setLoading(false)}
//             onKeyDown={(e) => {
//               if (e.keyCode === 13) {
//                 handleSetHomeVideoByKeyword(e.target.value);
//               }
//             }}
//           />
//           <div className="p-3 cursor-pointer hover:bg-zinc-200 px-8 rounded-r-3xl bg-zinc-100 border-l-2 border-zinc-200 max-md:bg-white max-md:border-none max-md:px-4 max-lg:px-4 dark:bg-zinc-800 dark:border-l dark:border-gray-500 " onClick={() => setSearchQuery(inputRef.current.value)}>
//             <button className="flex items-center" onClick={() => handleSetHomeVideoByKeyword(searchQuery)}>
//               <TfiSearch size="1.2rem" className="" />
//             </button>
//           </div>
//         </div>
//         {!loading && <SuggestionDropDown suggestions={suggestions} setLoading={setLoading} setSuggestions={setSuggestions} setSearchQuery={setSearchQuery} />}
//       </div>
//       <div className="right-menu flex  items-center sm:ml-4 lg:ml-16 gap-5 p-2">
//         <div className="toggle-dark-mode-switch  flex items-center gap-2">
//           <label htmlFor="check" className="bg-gray-100 dark:bg-zinc-700 relative top-0 w-20 h-8 rounded-full cursor-pointer flex items-center justify-around dark:text-black">
//             <BsFillSunFill className="text-amber-400" size="1.2rem" />
//             <BsFillMoonFill className="text-zinc-700" size="1.2rem" />
//             <input type="checkbox" id="check" className="sr-only peer" checked={theme === "dark"} onChange={handleThemeChange} />
//             <span className="w-2/5 h-4/5 bg-amber-400 absolute rounded-full left-1 top-1 peer-checked:bg-white peer-checked:left-11 transition-all duration-500 "></span>
//           </label>
//         </div>
//         <div className="p-2 max-sm:hidden  hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
//           <RiVideoAddLine size="1.5rem" />
//         </div>
//         <div className="p-2 max-sm:hidden  hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
//           <IoMdNotificationsOutline size="1.5rem" />
//         </div>
//         <div className="p-2 max-sm:hidden   hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
//           <FaUserCircle size="1.5rem" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Head;

