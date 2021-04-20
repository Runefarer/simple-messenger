import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  TextField,
} from "@material-ui/core";
import { StyledButton, Welcome } from "./components";
import { register } from "./store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  heading: {
    fontWeight: "bold",
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Welcome>
      <Box p="2rem" width={1} display="flex">
        <Grid container item direction="column">
          <Grid container item justify="flex-end" alignItems="center" wrap="nowrap">
            <Box pr="2rem">
              <Typography color="secondary">Already have an account?</Typography>
            </Box>
            <StyledButton
              color="primary"
              size="large"
              px="3rem"
              py="0.5rem"
              boxShadow={1}
              onClick={() => history.push("/login")}
            >
              Login
            </StyledButton>
          </Grid>
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
          >
            <Grid container item direction="column" xs={12} sm={10} md={8} lg={6} xl={4}>
              <Typography variant="h4" paragraph className={classes.heading}>
                Create an account.
              </Typography>
              <form onSubmit={handleRegister}>
                <Grid container item direction="column" justify="center">
                  <Box py={1.5}>
                    <FormControl fullWidth={true}>
                      <TextField
                        aria-label="username"
                        label="Username"
                        name="username"
                        type="text"
                        InputLabelProps={{ required: false }}
                        required
                      />
                    </FormControl>
                  </Box>
                  <Box py={1.5}>
                    <FormControl fullWidth={true}>
                      <TextField
                        label="E-mail address"
                        aria-label="e-mail address"
                        type="email"
                        name="email"
                        InputLabelProps={{ required: false }}
                        required
                      />
                    </FormControl>
                  </Box>
                  <Box py={1.5}>
                    <FormControl fullWidth={true}>
                      <TextField
                        aria-label="password"
                        label="Password"
                        type="password"
                        inputProps={{ minLength: 6 }}
                        name="password"
                        InputLabelProps={{ required: false }}
                        required
                      />
                    </FormControl>
                  </Box>
                  <Box py={2} textAlign="center">
                    <StyledButton
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                      px="3rem"
                      py="1rem"
                    >
                      Create
                    </StyledButton>
                  </Box>
                </Grid>
              </form>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Welcome>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
