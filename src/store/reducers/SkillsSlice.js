import {createSlice} from '@reduxjs/toolkit';


const skillsSlice = createSlice({
    name:'skills',
    initialState: {
        allSkills: [],
        isfetchingStatus:false
    },
    reducers:{
        storeSkills(state,action){
            state.allSkills = action.payload;
        },
        fetchingStatusUpdate(state,action){
            state.isfetchingStatus = action.payload
        }

    }
});

export const skillsActions = skillsSlice.actions;
export default skillsSlice;