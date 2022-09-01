import {configureStore} from "@reduxjs/toolkit";
import ProfileSlice from "./reducers/ProfileSlice";
import skillsSlice from "./reducers/SkillsSlice";
import projectsSlice from "./reducers/ProjectSlice";


const store = configureStore({
    reducer: {
        profile: ProfileSlice.reducer,
        project: projectsSlice.reducer,
        skills:skillsSlice.reducer
    }
});

export default store;