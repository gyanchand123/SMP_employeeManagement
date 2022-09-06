import React,{useState} from 'react';

export const PopUpContext = React.createContext({
    popUpState: false,
    togglePopUp: () => {}     
});

const PopUpContextProvider = (props)=> {

    const [popUp,setPopUp] = useState(false);
    const togglePopUp = () => setPopUp(prevState => !prevState);

    const initialValue = {
        popUpState:popUp,
        togglePopUp
    }
    return  <PopUpContext.Provider value = {initialValue}>{props.children}</PopUpContext.Provider>;
};

export default PopUpContextProvider;






