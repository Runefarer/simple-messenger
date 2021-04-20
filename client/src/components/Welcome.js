import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  SvgIcon,
} from "@material-ui/core";
import backgroundImage from "../images/bg-img.png";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
  },
  banner: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
  },
  wrapper: {
    position: "relative",
    zIndex: 1,
    color: "#FFF",
    "&::before": {
      content: "\"\"",
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      opacity: "0.8",
      zIndex: "-1",
      backgroundImage: "linear-gradient(#3A8DFF, #86B9FF)",
    }
  },
  icon: {
    fontSize: "5rem",
    padding: "2.5rem",
  },
}));

const Welcome = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid container item xs={12} sm={4} className={classes.banner}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.wrapper}
        >
          <Box
            p="6vw"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <SvgIcon viewBox="0 0 67 67" className={classes.icon}>
              <g id="chat">
                <path d="M57.1688 9.66977C50.8366 3.43256 42.4361 0 33.4832 0C24.5302 0 16.1298 3.43256 9.79755 9.66977C-2.44191 21.7256 -3.29187 41.0233 7.68681 54.0419C6.61019 56.1767 4.88194 58.6605 2.31788 59.9023C1.08544 60.5023 0.391302 61.8 0.603792 63.1395C0.816283 64.4791 1.86457 65.5256 3.22451 65.7349C3.86198 65.8326 4.76861 65.9302 5.87356 65.9302C8.83426 65.9302 13.1974 65.2465 17.6597 62.0791C22.632 64.7163 28.0717 66 33.469 66C42.1386 66 50.7232 62.693 57.1829 56.3302C63.5152 50.093 67 41.8186 67 33C67 24.1814 63.501 15.907 57.1688 9.66977ZM54.4631 53.6651C44.901 63.0837 30.0975 64.9535 18.453 58.214C17.688 57.7674 16.7389 57.907 16.1298 58.507C16.0731 58.5349 16.0164 58.5767 15.9739 58.6186C12.1349 61.5488 8.36678 62.1628 5.87356 62.1628L5.85939 62.1628C8.7351 60.0977 10.5483 57.0279 11.6108 54.6419C11.7808 54.2372 11.8091 53.8186 11.71 53.4279C11.6675 53.0512 11.5116 52.6744 11.2425 52.3674C0.872947 40.8279 1.41126 23.2465 12.4891 12.3349C24.0627 0.934884 42.8894 0.934884 54.4489 12.3349C66.0367 23.7349 66.0367 42.2651 54.4631 53.6651Z" transform="translate(0 0.5)" id="Shape" fill="#FFFFFF" stroke="none"/>
                <path d="M2.5 5C3.88071 5 5 3.88071 5 2.5C5 1.11929 3.88071 0 2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.88071 1.11929 5 2.5 5Z" transform="translate(31 31.5)" id="Oval" fill="#FFFFFF" stroke="none"/>
                <path d="M2.5 5C3.88071 5 5 3.88071 5 2.5C5 1.11929 3.88071 0 2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.88071 1.11929 5 2.5 5Z" transform="translate(43 31.5)" id="Oval" fill="#FFFFFF" stroke="none"/>
                <path d="M2.5 5C3.88071 5 5 3.88071 5 2.5C5 1.11929 3.88071 0 2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.88071 1.11929 5 2.5 5Z" transform="translate(19 31.5)" id="Oval" fill="#FFFFFF" stroke="none"/>
              </g>
            </SvgIcon>
            <Typography variant="h4" align="center">
              Converse with anyone with any language
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item justify="center" xs={12} sm={8}>
        { children }
      </Grid>
    </Grid>
  );
};

export default Welcome;
