//Humari puri app ki state management ki dukaan
//React app can access global state anywhere

import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice.js"

 const store = configureStore({
    reducer:{
        auth: authReducer,
    },
});

export default store;
//📌 auth key = slice name in store


//1️⃣ What is store?
// Login → Navbar → Dashboard → Profile
//becomes messy (props drilling)Problem React has 👇
// State works only inside components
// Passing data from:

//Solution: Redux Store

// A central place to store global data:
// Logged-in user, Auth token, Theme, Cart items, Jobs list (for your job portal)
// This central place is called the STORE