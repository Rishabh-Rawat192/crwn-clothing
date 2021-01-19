import React, { useState } from "react";
import { connect } from "react-redux";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
    googleSignInStart,
    emailSignInStart,
} from "../../redux/user/user.actions";

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: "",
    });

    const { email, password } = userCredentials;

    const handleSubmit = (event) => {
        event.preventDefault();

        emailSignInStart(email, password);
    };

    const handleChange = (event) => {
        const { value, name } = event.target;

        setUserCredentials({
            ...userCredentials,
            [name]: value,
        });
    };

    return (
        <div className="sign-in">
            <h2 className="title">I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form action="" onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    required
                    handleChange={handleChange}
                    label="Email"
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    required
                    handleChange={handleChange}
                    label="Password"
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign in</CustomButton>
                    <CustomButton
                        onClick={googleSignInStart}
                        type="button"
                        isGoogleSignIn
                    >
                        Sign in with google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
