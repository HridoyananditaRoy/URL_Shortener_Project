import {createSlice} from "@reduxjs/toolkit";

//initially user is -
//slice ka initial - pehle kya hone wala hai

// 1️⃣ Initial state of auth slice
const initialState = {
    user: null, 
    isAuthenticated: false,
};

//A function that accepts an initial state, an object full of reducer functions, and a "slice name",
// and automatically generates action creators 
// and action types that correspond to the reducers and state

//// 2️⃣ Create auth slice

//This creates ONE FEATURE of your app, Each feature = one slice

const authSlice = createSlice({

   //This defines -  how auth state looks BEFORE login
//    “When app loads for the first time,
//     what should auth look like?”
//----------------------------------------------------------->
//     user: null → nobody logged in
//     isAuthenticated: false → no access

    name:'auth', //slice name
    initialState, //by def pehla state
    reducers: {
        //Reducers = functions that CHANGE state
        //reducers has access to initialState
        //we cant access init state without reducers bahar kahi se
       
        //state → current auth state
        //action.payload → data sent from component

        login: (state, action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        logout: (state)=>{
            state.user = null;
            state.isAuthenticated = false;
        }

    },
});
//aur iss pure slice ko humne authReducer ke andar daala hai

// 3️⃣ Export actions
export const { login, logout } = authSlice.actions;

// 4️⃣ Export reducer
export default authSlice.reducer;