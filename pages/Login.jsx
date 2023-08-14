import { RhImage, RhButton, RhLabel, RhInput } from "@rhythm-ui/react";
import React, { useContext } from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { AppContext } from "'@/store/context'";
import { auth } from "'@/Configs/firebase'";
import home from "../assets/login.svg";
import Image from "next/image";

const login = () => {
  const { dispatch } = useContext(AppContext);

  const router = useRouter();
  // const COVER_URL =
  //   "https://images.unsplash.com/photo-1557683304-673a23048d34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=282&q=80";

  const LOGO_URL =
    "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg";
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (event, isSignUp = false) => {
    event.preventDefault();

    if (values.email && values.password) {
      (isSignUp ? createUserWithEmailAndPassword : signInWithEmailAndPassword)(
        auth,
        values.email,
        values.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch({
            type: "SET_USER_DETAILS",
            data: user,
          });
          localStorage.setItem("token", user.uid);
          router.push({
            pathname: "/",
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          alert(errorCode);
        });
    }
  };
  return (
    <div className="h-[80vh] flex flex-nowrap flex-1 ">
      <div className="px-4 flex-[100%] xl:flex-[50%] ">
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
            <h2 className="text-3xl font-semibold mt-6 text-white">
              Sign-in to your account
            </h2>
            <div className="mt-1 flex flex-wrap flex-col gap-2">
              <div className="space-y-2 ">
                <RhLabel
                  label="Input Label"
                  labelFor="label-for-input"
                  className="text-white"
                >
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
                <RhLabel
                  label="Input Label"
                  labelFor="label-for-input"
                  className="text-white"
                >
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
                  <a className="text-primary-500 font-semibold cursor-pointer">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="flex gap-2">
                <RhButton
                  block
                  variant="primary"
                  onClick={(e) => handleLogin(e)}
                >
                  Log in
                </RhButton>
                <RhButton
                  block
                  variant="primary"
                  onClick={(e) => handleLogin(e, true)}
                >
                  Sign-up
                </RhButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-center xl:flex-[50%]  bg-[#6366F1] h-screen">
        <Image
          className="transform translate-y-8"
          src={home}
          // alt="bg"
        />
      </div>
    </div>
  );
};

export default login;
