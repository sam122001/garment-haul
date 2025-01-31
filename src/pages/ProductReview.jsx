import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import {
  MdSentimentSatisfiedAlt,
  MdSentimentDissatisfied,
  MdSentimentVeryDissatisfied,
  MdSentimentNeutral,
  MdSentimentVerySatisfied,
  MdStarRate,
  MdOutlineSentimentVeryDissatisfied,
  MdSend,
  MdOutlineFilterAlt,
} from "react-icons/md";
import "../styles/review.css";
import axios from "axios";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { toast } from 'react-toastify';

const labels = {
  0: <MdOutlineSentimentVeryDissatisfied style={{ color: "red" }} />,
  0.5: <MdOutlineSentimentVeryDissatisfied style={{ color: "red" }} />,
  1: <MdSentimentVeryDissatisfied style={{ color: "red" }} />,
  1.5: <MdSentimentVeryDissatisfied style={{ color: "red" }} />,
  2: <MdSentimentDissatisfied style={{ color: "orange" }} />,
  2.5: <MdSentimentDissatisfied style={{ color: "orange" }} />,
  3: <MdSentimentNeutral style={{ color: "gold" }} />,
  3.5: <MdSentimentNeutral style={{ color: "gold" }} />,
  4: <MdSentimentSatisfiedAlt style={{ color: "green" }} />,
  4.5: <MdSentimentSatisfiedAlt style={{ color: "green" }} />,
  5: <MdSentimentVerySatisfied style={{ color: "green" }} />,
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
function ProductReview({ authToken, setProceed, setOpenAlert, id }) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!comment && !value) {
        toast.error("Please Fill the all Fields", { theme: "colored", autoClose: 500, })
    }
    else if (comment.length <= 4) {
        toast.error("Please add more than 4 characters", { theme: "colored", autoClose: 500, })
    }
    else if (value <= 0) {
        toast.error("Please add rating", { theme: "colored", autoClose: 500, })
    }
    else if (comment.length >= 4 && value > 0) {
        try {
            if (setProceed) {
                const { data } = await axios.post(`${process.env.REACT_APP_ADD_REVIEW}`, { id: id, comment: comment, rating: value }, {
                    headers: {
                        'Authorization': authToken
                    }
                })
                toast.success(data.msg, { theme: "colored", autoClose: 500, })
                // fetchReviews()
            }
            else {
                setOpenAlert(true)
            }
            setComment('')
            setValue(null)
        }
        catch (error) {
            toast.error(error.response.data.msg, { theme: "colored", autoClose: 600, })
            setComment('')
            setValue('')
        }
    }
}

  return (
    <>
      <div className="form-container">
        <form className="form">
          <Box
            sx={{
              width: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              id="rating"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <MdStarRate style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box className="expression-icon" sx={{ ml: 2 }}>
                {labels[hover !== -1 ? hover : value]}
              </Box>
            )}
          </Box>

          <TextField
            id="filled-textarea"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            label="Add Review"
            placeholder="What did you like or dislike?"
            multiline
            className="comment"
            variant="outlined"
          />

          <Tooltip title="Send Review">
            <Button
              className="form-btn"
              variant="contained"
              type="submit"
              style={{marginLeft: '50px'}}
              endIcon={<MdSend />}
            >
              Send
            </Button>
          </Tooltip>
        </form>
      </div>
    </>
  );
}

export default ProductReview;
