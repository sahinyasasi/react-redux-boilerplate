import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Link,
} from "@material-ui/core";
import Page from "../layouts/Page";
import FormInput from "../layouts/FormInput";
import { validationService } from "../../services/validationService";
import Password from "../layouts/PassWord";
import CustomButton from "../layouts/CustomButton";
import { userActions } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "75%",
    marginLeft: "15%",
  },

  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
  cardContent: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    minHeight: 400,
  },
}));
const valObj = { value: "", error: false, errorText: "" };
const mandatoryText = "field cannot be empty";
const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loginDetails, setLoginDetails] = useState({
    email: valObj,
    password: valObj,
  });
  const handleChange = (key, data) => {
    let userDetails = "";
    if (data && data.value) {
      userDetails = validationService.updateValObjWithVal(data);
    } else {
      userDetails = validationService.updateValObjWithError(
        `${key} ${mandatoryText}!`
      );
    }

    setLoginDetails({
      ...loginDetails,
      [key]: userDetails,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("(handleSubmit)========================== ", loginDetails);
    let validationResult =
      validationService.validateLoginUserDetails(loginDetails);
    if (validationResult.isValid) {
      console.log("Success Validation Ready to Login");
      let userObj = Object.assign(
        {},
        ...Object.entries(loginDetails).map(([k, v]) => ({ [k]: v.value }))
      );
      console.log("(userObj)==========================userObj ", userObj);
      dispatch(userActions.login({ ...userObj }, "/postad"));
    } else {
      console.log(" register failed Validation!!!!!!!!!!!!!");
      setLoginDetails(validationResult.loginErrorVals);
      console.log(validationResult.loginErrorVals);
    }
  };

  return (
    <Page className={classes.root} title="Login">
      <Container className={classes.cardContainer} maxWidth="sm">
        <Box mb={2} display="flex" justifyContent="center">
          <Typography color="textPrimary" gutterBottom variant="h4">
            A2Z Kars Portal
          </Typography>
        </Box>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Box flexGrow={1} mt={2}>
              <form onSubmit={handleSubmit} noValidate>
                <FormInput
                  id="email"
                  label="Email"
                  value={loginDetails.email.value}
                  error={loginDetails.email.error}
                  helperText={loginDetails.email.errorText}
                  fullWidth
                  required
                  onChange={(e) => {
                    handleChange("email", { value: e.target.value });
                  }}
                />
                <Password
                  value={loginDetails.password.value}
                  onChange={(e) =>
                    handleChange("password", { value: e.target.value })
                  }
                  error={loginDetails.password.error}
                  helperText={loginDetails.password.errorText}
                />
                <Box mt={6}>
                  <CustomButton
                    fullWidth
                    size="small"
                    type="submit"
                    title="Login"
                  />
                </Box>
              </form>
            </Box>
            <Box mt={2}>
              <Typography>
                Forgot Paaword?
                <Link href="/reset_password">{"  "}Reset Password</Link>
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography>
                New User ? <Link href="/register">Create An Account</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};
export default Login;
