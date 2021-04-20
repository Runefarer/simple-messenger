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
  InputAdornment,
  Link,
} from "@material-ui/core";
import { StyledButton, Welcome } from "./components";
import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  heading: {
    fontWeight: "bold",
  },
  forgot: {
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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
              <Typography color="secondary">Don't have an account?</Typography>
            </Box>
            <StyledButton
              color="primary"
              size="large"
              px="3rem"
              py="0.5rem"
              boxShadow={1}
              onClick={() => history.push("/register")}
            >
              Create Account
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
                Welcome Back!
              </Typography>
              <form onSubmit={handleLogin}>
                <Grid container item direction="column" justify="center">
                  <Box py={1.5}>
                    <FormControl fullWidth={true}>
                      <TextField
                        aria-label="username"
                        label="Username"
                        name="username"
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box py={1.5}>
                    <FormControl fullWidth={true}>
                      <TextField
                        aria-label="password"
                        label="Password"
                        type="password"
                        name="password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Link color="primary" underline="none" className={classes.forgot}>
                                Forgot?
                              </Link>
                            </InputAdornment>
                          )
                        }}
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
                      Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
