import {createSlice} from "@reduxjs/toolkit"

const appSlice = createSlice({
    name: "app",
    initialState:{
        isMenuOpen:true,
        isSideBarOpen: false,
    },
    reducers:{
        toggleMenu: (state) =>{
          state.isMenuOpen = !state.isMenuOpen;  
        },
        toggleSideBar:(state)=>{
          state.isMenuOpen=false;
        },
        toggleSlideBar:(state) => {
            state.isSideBarOpen = !state.isSideBarOpen;
        },toggleChatBox: (state) => {
          state.isChatBoxOpen = !state.isChatBoxOpen;
        },
    }
})


export const {toggleMenu, toggleSideBar,toggleChatBox} = appSlice.actions;
export default appSlice.reducer;