import React, { useContext, useEffect, useState } from "react";
import { ContextFunction } from "../../context/Context";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Container,
  CssBaseline,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillCloseCircle, AiOutlineLogin } from "react-icons/ai";
import CartCard from "../../components/CartCard/CartCard";
import "../../styles/Cart.css";
import OrderSummary from "./OrderSummary";
import { EmptyCart } from "../../assets/category/images";
import { Transition } from "../../constants/Constants";

const Cart = () => {
  const { cart, setCart } = useContext(ContextFunction);
  const [total, setTotal] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  let shippingCoast = 100;

  const navigate = useNavigate();
  let authToken = localStorage.getItem("Authorization");
  let setProceed = authToken ? true : false;

  useEffect(() => {
    if (setProceed) {
      getCart();
    } else {
      setOpenAlert(true);
    }
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (setProceed) {
      setTotal(
        cart.reduce(
          (acc, curr) =>
            acc + (curr.productId?.price * curr.quantity + shippingCoast),
          0
        )
      );
    }
  }, [cart]);

  const getCart = async () => {
    if (setProceed) {
      const { data } = await axios.get(
        `http://localhost:3001/api/cart/fetchcart`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setCart(data);
    }
  };
  const handleClose = () => {
    setOpenAlert(false);
    navigate("/");
  };
  const handleToLogin = () => {
    navigate("/login");
  };

  const removeFromCart = async (product) => {
    if (setProceed) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/cart/deletecart/${product._id}`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        toast.success("Removed From Cart", {
          autoClose: 500,
          theme: "colored",
        });
        setCart(cart.filter((c) => c.productId._id !== product.productId._id));
      } catch (error) {
        toast.error("Something went wrong", {
          autoClose: 500,
          theme: "colored",
        });
      }
    }
  };
  const proceedToCheckout = async () => {
    if (cart.length <= 0) {
      toast.error("Please add items in cart to proceed", {
        autoClose: 500,
        theme: "colored",
      });
    } else {
      sessionStorage.setItem("totalAmount", total);
      navigate("/checkout");
    }
  };

  return (
    <div style={{ marginTop: "10%" }}>
      <CssBaseline />
      <Container fixed maxWidth>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            marginTop: 10,
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          Cart
        </Typography>
        {setProceed && cart.length <= 0 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="main-card">
              <img
                src={EmptyCart}
                alt="Empty_cart"
                className="empty-cart-img"
              />
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                Your Cart is Empty
              </Typography>
            </div>
          </Box>
        )}
        <Container sx={{ display: "flex", flexDirection: "column", mb: 10 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {cart.length > 0 &&
              cart.map((product) => (
                <CartCard
                  product={product}
                  removeFromCart={removeFromCart}
                  key={product._id}
                />
              ))}
          </Box>

          {cart.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <OrderSummary
                proceedToCheckout={proceedToCheckout}
                total={total}
                shippingCoast={shippingCoast}
              />
            </Box>
          )}
        </Container>
      </Container>
      <Dialog
        open={openAlert}
        keepMounted
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          sx={{
            width: { xs: 280, md: 350, xl: 400 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5"> Please Login To Proceed</Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            onClick={handleToLogin}
            endIcon={<AiOutlineLogin />}
            color="primary"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<AiFillCloseCircle />}
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
