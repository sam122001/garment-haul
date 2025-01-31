import "../styles/navbar.css"
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart, AiFillCloseCircle } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Badge, Button, Dialog, DialogActions, DialogContent, Menu, MenuItem, Slide, Tooltip, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { handleLogOut, handleClose, handleClickOpen, Transition} from "../constants/Constants";
import UserContext from '../context/UserContext';
function AdminNav() {
    const [openAlert, setOpenAlert] = useState(false);
    const navigate = useNavigate()
    let authToken = localStorage.getItem('Authorization');
    let setProceed = authToken !== null ? true : false
  return (
    <>
      <nav className='nav'>
        <div className="logo">
          <Link to='/adminHome'>
            <span >Garment haul</span>
          </Link>
        </div>
        <div className="nav-items">
          <ul className="nav-items">
            <li className="nav-links">
              <NavLink to='/addProducts'>
                <span className='nav-icon-span'>Add products</span>
              </NavLink>
            </li>
            <li className="nav-links">
              <NavLink to='/admincustomer'>
                <span className='nav-icon-span'>Customer support</span>
              </NavLink>
            </li>

            {/* <li className="nav-links">
              <Tooltip title='Cart'>
                <NavLink to="/orders">
                  <span className='nav-icon-span'>Orders    </span>
                </NavLink>
              </Tooltip>
            </li> */}

            {
              setProceed ?
                <>
                  {/* <li className="nav-links">
                    <Tooltip title='Profile'>
                      <NavLink to='/update'>
                        <span className='nav-icon-span'>  <CgProfile style={{ fontSize: 29, marginTop: 7,marginRight:10 }} /></span>
                      </NavLink>
                    </Tooltip>
                  </li> */}
                  <li style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }} onClick={() => handleClickOpen(setOpenAlert)}>
                    <Button variant='contained' className='nav-icon-span' sx={{ marginBottom: 1 }} endIcon={<FiLogOut />}>
                      <Typography variant='button'> Logout</Typography>
                    </Button>
                  </li>
                </>
                :
                <li className="nav-links">
                  <Tooltip title='Login'>
                    <NavLink to='/login'>
                      <span className='nav-icon-span'>   <CgProfile style={{ fontSize: 29, marginTop: 7 }} /></span>
                    </NavLink>
                  </Tooltip>
                </li>
            }
          </ul>
        </div>
      </nav >
      <Dialog
        open={openAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 }, display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h6'>  Do You Want To Logout?</Typography>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Link to="/">
            <Button variant='contained' endIcon={<FiLogOut />} color='primary' onClick={() => handleLogOut(setProceed, toast, navigate, setOpenAlert)}>Logout</Button></Link>
          <Button variant='contained' color='error' endIcon={<AiFillCloseCircle />} onClick={() => handleClose(setOpenAlert)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AdminNav