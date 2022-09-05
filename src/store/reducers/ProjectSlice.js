import {createSlice} from '@reduxjs/toolkit';

const projectsSlice = createSlice({
    name:'projects',
    initialState:{
        allProjects:[],
        isfetchingStatus:false
    },
    reducers: {
        storeProjects(state,action){
            state.allProjects = action.payload;
        },
        fetchingProjectStatus(state,action){
            state.isfetchingStatus = action.payload
        }
    }
});


export const projectActions = projectsSlice.actions;
export default projectsSlice;
