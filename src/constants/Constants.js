import { Slide } from "@mui/material";
import { forwardRef } from "react";

const handleLogOut = (setProceed, toast, navigate, setOpenAlert) => {
    console.log('called');
    if (setProceed) {
        localStorage.removeItem('Authorization')
        toast.success("Logout Successfully", { autoClose: 500, theme: 'colored' })
        navigate('/')
        setOpenAlert(false)
    }
    else {
        toast.error("User is already logged of", { autoClose: 500, theme: 'colored' })
    }
}

const handleClose = (setOpenAlert) => {
    setOpenAlert(false);
};
const handleClickOpen = (setOpenAlert) => {
    setOpenAlert(true);
};


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export {handleLogOut, handleClose, handleClickOpen, Transition}