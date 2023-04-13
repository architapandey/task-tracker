import {
  RhImage,
  RhButton,
  RhDivider,
  RhLabel,
  RhInput,
  RhFormGroup,
  RhFormGroupItem,
} from "@rhythm-ui/react";
import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "./firebase";

const Login = () => {
  // var auth = getAuth(firebase);

  const LOGO_URL =
    "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg";
  //   const COVER_URL =
  //     "https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80";
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleFormSubmit = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // User sign up successful, handle logged in user
        const user = userCredential.user;
        console.log("User signed up:", user);
      })
      .catch((error) => {
        // Handle sign up error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up:", errorCode, errorMessage);
      });
  };
  return (
    <div className="h-[80vh] flex flex-nowrap flex-1 ">
      <div className="px-4 flex-[100%] xl:flex-[40%] ">
        <div className="w-full h-full mx-auto justify-center items-center flex flex-wrap ">
          <div className="mt-8">
            <RhImage
              alt="Image-description"
              aspectRatio="auto"
              height="65px"
              src={LOGO_URL}
              width="65px"
              className="dark:bg-inherit"
            />
            <h2 className="text-3xl font-semibold mt-6">
              Sign in to your account
            </h2>
            <h4 className="mb-8 space-x-1">
              <span>Or</span>
              <a className=" text-primary-500 font-semibold">
                start your 14-day free trial
              </a>
            </h4>

            <p className="text-sm my-1 hidden xl:flex">Sign in with</p>

            <div className="hidden xl:flex flex-nowrap gap-2">
              <div className="md:flex-[33.33333%-0.5rem]">
                <RhButton
                  block
                  variant="white"
                  size="xl"
                  iconLeft="bi:facebook"
                >
                  Facebook
                </RhButton>
              </div>

              <div className="md:flex-[33.33333%-0.5rem]">
                <RhButton block variant="white" size="xl" iconLeft="bi:twitter">
                  Twitter
                </RhButton>
              </div>

              <div className="md:flex-[33.33333%-0.5rem]">
                <RhButton block variant="white" size="xl" iconLeft="bi:github">
                  Github
                </RhButton>
              </div>
            </div>

            <div className="w-full mt-4 hidden xl:block">
              <RhDivider componentCenter="Or continue with" />
            </div>
            <div className="mt-1 flex flex-wrap flex-col gap-2">
              <div className="space-y-2">
                <RhLabel label="Input Label" labelFor="label-for-input">
                  Email address
                </RhLabel>
                <RhInput
                  id="email"
                  type="email"
                  block
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <RhLabel label="Input Label" labelFor="label-for-input">
                  Password
                </RhLabel>{" "}
                <RhInput
                  id="password"
                  type="password"
                  block
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
              </div>

              <div className="p-2 my-2  flex justify-between items-center 2">
                <div>
                  <RhFormGroup>
                    <RhFormGroupItem
                      control={<RhInput type="checkbox" />}
                      label={<div className="strem">Remember me</div>}
                    />
                  </RhFormGroup>
                </div>
                <div>
                  <a className="text-primary-500 font-semibold cursor-pointer">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <RhButton
                block
                variant="primary"
                onClick={(e) => handleFormSubmit(e)}
              >
                Sign in
              </RhButton>
              <div>
                <div className="w-full mt-4 block xl:hidden">
                  <RhDivider componentCenter="Or continue with" />
                </div>
                <div className="flex xl:hidden flex-nowrap mt-4  gap-2">
                  <div className="md:flex-[33.33333%-0.5rem]">
                    <RhButton
                      block
                      variant="white"
                      size="xl"
                      iconLeft="bi:facebook"
                    >
                      Facebook
                    </RhButton>
                  </div>

                  <div className="md:flex-[33.33333%-0.5rem]">
                    <RhButton
                      block
                      variant="white"
                      size="xl"
                      iconLeft="bi:twitter"
                    >
                      Twitter
                    </RhButton>
                  </div>

                  <div className="md:flex-[33.33333%-0.5rem]">
                    <RhButton
                      block
                      variant="white"
                      size="xl"
                      iconLeft="bi:github"
                    >
                      Github
                    </RhButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="hidden xl:block xl:flex-[50%] min-w-0 h-full bg-red-200">
        <RhImage
          className="hidden w-full max-w-none lg:block h-full m-0"
          src={COVER_URL}
          alt="bg"
        />
      </div> */}
    </div>
  );
};

export default Login;
