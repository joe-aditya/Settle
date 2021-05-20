import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
} from "react-native";
import * as userAct from "../../Redux/Actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
const validationSchema = yup.object().shape({
  email: yup.string().label("Email").email().required(),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(6, "Seems a bit short..."),
  username: yup.string().label("Username"),
});

const AuthScreen = () => {
  console.log("RENDERING AuthScreen");
  // console.log(useSelector((state) => state));
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);

  return (
    <SafeAreaView style={{ marginTop: 100 }}>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={async (values, actions) => {
          let action;
          if (isSignup) {
            action = userAct.signup(
              values.email,
              values.password,
              values.username
            );
          } else {
            action = userAct.login(values.email, values.password);
          }

          try {
            await dispatch(action);
          } catch (err) {
            console.log(err);
            actions.setFieldError("general", err.message);
            actions.setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <React.Fragment>
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text>Email</Text>
              <TextInput
                placeholder="example@example.com"
                style={styles.textinputstyle}
                onChangeText={formikProps.handleChange("email")}
                onBlur={formikProps.handleBlur("email")}
                autoFocus
              />
              <Text style={{ color: "red" }}>
                {formikProps.touched.email && formikProps.errors.email}
              </Text>
            </View>
            {isSignup && (
              <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                <Text>Username</Text>
                <TextInput
                  placeholder="Enter a unique username"
                  style={styles.textinputstyle}
                  onChangeText={formikProps.handleChange("username")}
                  onBlur={formikProps.handleBlur("username")}
                />
                <Text style={{ color: "red" }}>
                  {formikProps.touched.username && formikProps.errors.username}
                </Text>
              </View>
            )}
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text>Password</Text>

              <TextInput
                placeholder="password"
                style={styles.textinputstyle}
                onChangeText={formikProps.handleChange("password")}
                onBlur={formikProps.handleBlur("password")}
                secureTextEntry
              />

              <Text style={{ color: "red" }}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>
            </View>

            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <React.Fragment>
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  onPress={formikProps.handleSubmit}
                />
                <Button
                  title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                  onPress={() => {
                    setIsSignup((prevState) => !prevState);
                  }}
                />
                <Text style={{ color: "red", textAlign: "center" }}>
                  {formikProps.errors.general}
                </Text>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textinputstyle: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 3,
  },
});
export default AuthScreen;
