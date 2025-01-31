import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import AddToCartPopup from "./AddtoCartPopup"; // Import the popup component
import "../styles/productDetails.css";
import {
  Typography,
  Box,
  ButtonGroup,
  Button,
  Rating,
  Tooltip,
  Container,
  Select,
  MenuItem,
} from "@mui/material";
import { MdAddShoppingCart } from "react-icons/md";
import { ContextFunction } from "../context/Context";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { productId } = useParams(); // Get the productId from URL params
  const { product } = useContext(ProductContext);
  const { handleAddToCart } = useContext(ContextFunction);
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(""); // State for selected size
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup

  const increaseQuantity = () => {
    setProductQuantity((prev) => prev + 1);
    if (productQuantity >= 5) {
      setProductQuantity(5);
    }
  };
  const decreaseQuantity = () => {
    setProductQuantity((prev) => prev - 1);
    if (productQuantity <= 1) {
      setProductQuantity(1);
    }
  };

  // Find the product with the matching ID
  const selectedProduct = product.find((item) => item._id === productId);
  if (!selectedProduct) {
    return <div className="product-not-found">Product not found</div>;
  }

  // Filter similar products based on selected product's category
  const similarProducts = product
    .filter(
      (item) =>
        item.category === selectedProduct.category && item._id !== productId
    )
    .slice(0, 6); // Limit to 6 products

  const addToCart = () => {
    handleAddToCart({
      ...selectedProduct,
      quantity: productQuantity,
    });
    setShowPopup(true); // Show the popup
  };

  return (
    <Container maxWidth="xl">
      <main className="main-content">
        {/* Product Image Section */}
        <div className="product-image">
          <div className="detail-img-box">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="detail-img"
            />
            <br />
          </div>
        </div>

        {/* Product Details Section */}
        <section className="product-details">
          <Typography variant="h4">{selectedProduct.name}</Typography>
          <Typography>{selectedProduct.description}</Typography>
          <Typography variant="h6" color="dark">
            ₹{selectedProduct.price}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // background: 'red',
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant="outlined"  aria-label="outlined button group">
              <Button onClick={increaseQuantity}>+</Button>
              <Button>{productQuantity}</Button>
              <Button onClick={decreaseQuantity}>-</Button>
            </ButtonGroup>
          </Box>
          {/* Dropdown for size selection */}
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            <Typography
              variant="subtitle1"
              style={{ fontSize: "16px", marginBottom: "5px" }}
            >
              Select Size
            </Typography>
            <Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              style={{
                width: "150px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "14px",
              }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Size
              </MenuItem>
              <MenuItem value="S" style={{ fontSize: "14px" }}>
                Small (S)
              </MenuItem>
              <MenuItem value="M" style={{ fontSize: "14px" }}>
                Medium (M)
              </MenuItem>
              <MenuItem value="L" style={{ fontSize: "14px" }}>
                Large (L)
              </MenuItem>
            </Select>
          </div>

          {/* Product Rating */}
          <div>
            <Rating
              name="half-rating-read"
              defaultValue={Math.round(selectedProduct.rating)}
              precision={0.5}
              readOnly
              style={{ verticalAlign: "middle" }}
            />
            <span
              className="ratingText"
              style={{ verticalAlign: "middle", marginLeft: "5px" }}
            >
              {selectedProduct.rating}
            </span>
          </div>

          {/* Add to Cart Button */}
          <div style={{ display: "flex" }}>
            <Tooltip title="Add To Cart">
              <Button
                variant="contained"
                className="all-btn"
                onClick={addToCart}
                startIcon={<MdAddShoppingCart />}
                style={{ backgroundColor: "black" }}
              >
                Buy
              </Button>
            </Tooltip>
          </div>
        </section>
      </main>

      {/* Similar Products Section */}
      <div class="main-content">
        <div class="similar-products-heading">
          <Typography variant="h5">Similar Products</Typography>
        </div>
        <div class="product-items">
          {similarProducts.map((data) => (
            <div key={data._id} className="menuItem">
              <Link
                to={`/productcat/${data._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="imageContainer"
                  style={{ backgroundImage: `url(${data.image})` }}
                ></div>
              </Link>

              <h1 style={{ marginTop: "10%" }}>{data.name}</h1>
              <div className="ratingContainer" style={{ textAlign: "center" }}>
                <Rating
                  name="half-rating-read"
                  defaultValue={Math.round(data.rating)}
                  precision={0.5}
                  readOnly
                  style={{ verticalAlign: "middle" }}
                />
                <span
                  className="ratingText"
                  style={{ verticalAlign: "middle", marginLeft: "5px" }}
                >
                  {data.rating}
                </span>
                <p>₹{data.price}</p>
                <div style={{ marginTop: "5%" }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add to Cart Popup */}
      {showPopup && (
        <AddToCartPopup
          onClose={() => setShowPopup(false)} // Pass a function to close the popup
        />
      )}
    </Container>
  );
}

export default ProductDetails;
