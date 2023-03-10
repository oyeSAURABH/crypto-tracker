import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";
import bannerURL from "./banner.jpg";

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          {/* heading */}
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Roboto",
              color: "#89CFF0",
            }}
          >
            Crypto Tracker
          </Typography>
          {/* subheading */}
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              fontFamily: "Roboto",
            }}
          >
            Get all the information related to your favourite Crypto at one
            place!
          </Typography>
        </div>
        {/* calling carousel component */}
        <Carousel />
      </Container>
    </div>
  );
};
export default Banner;

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(${bannerURL})`,
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));
