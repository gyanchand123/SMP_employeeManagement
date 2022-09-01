import {createSlice} from '@reduxjs/toolkit';


const projectsSlice = createSlice({
    name:'projects',
    initialState:{
        allProjects:[]
    },
    reducers: {
        storeProjects(state,action){
            state.allProjects = action.payload;
        }
    }
});


export const projectActions = projectsSlice.actions;
export default projectsSlice;
