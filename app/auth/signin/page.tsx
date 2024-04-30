"use client";

import { PT_Serif } from "next/font/google";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { signInUser } from "@/actions/clientActions";

const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });

export default function SignIn() {
  const [serverState, formAction] = useFormState(signInUser, "idle");
  const [clientState, setClientState] = useState("idle");

  useEffect(() => {
    switch (serverState) {
      case "unregistered":
      case "incorrect-password":
      case "incorrect-private-key":
        setClientState(serverState);
        break;
      default:
        break;
    }
    if (serverState.slice(0, 7) === "success") {
      const usernameFromServerState = serverState.slice(8);
      redirect(`/users/${usernameFromServerState}`);
    }
  }, [serverState, clientState]);

  let headingText: string = "Welcome Back!";
  let subheadingJSX: JSX.Element = (
    <p className="text-[#999] text-sm">
      Enter your username and password to continue
    </p>
  );
  let btnCSSClasses: string =
    "text-center bg-[#290d6b] text-white font-medium `rounded-2xl` p-4 text-base w-[min(80%,_25rem)] hover:bg-[#5630ae] transition-all duration-300 mt-4";
  let btnText: string = "Sign in";

  switch (clientState) {
    case "idle":
      headingText = "Welcome Back!";
      subheadingJSX = (
        <p className="text-[#999] text-sm">
          Enter your username and password to continue
        </p>
      );
      btnCSSClasses =
        "text-center bg-[#290d6b] text-white font-medium rounded-2xl p-4 text-base w-[min(80%,_25rem)] hover:bg-[#5630ae] transition-all duration-300 mt-4";
      btnText = "Sign in";
      break;

    case "signing-in":
      btnCSSClasses =
        "mt-4 text-center bg-[#7F7F81] text-white font-medium rounded-2xl p-4 text-base w-[min(80%,_25rem)] transition-all duration-300";
      btnText = "Please wait ...";
      break;

    case "unregistered":
      headingText = "Sign In Failed!";
      subheadingJSX = (
        <p className="text-[#b13535] text-sm leading-relaxed font-medium">
          You have entered an unregistered username.
          <br />
          If already signed up, please enter your private key
        </p>
      );
      btnCSSClasses =
        "text-center bg-[#290d6b] text-white font-medium rounded-2xl p-4 text-base w-[min(80%,_25rem)] hover:bg-[#5630ae] transition-all duration-300 mt-4";
      btnText = "Sign in";
      break;

    case "incorrect-password":
      headingText = "Sign In Failed!";
      subheadingJSX = (
        <p className="text-[#b13535] text-sm leading-relaxed font-medium">
          Incorrect password
        </p>
      );
      btnCSSClasses =
        "text-center bg-[#290d6b] text-white font-medium rounded-2xl p-4 text-base w-[min(80%,_25rem)] hover:bg-[#5630ae] transition-all duration-300 mt-4";
      btnText = "Sign in";
      break;

    case "incorrect-private-key":
      headingText = "Sign In Failed!";
      subheadingJSX = (
        <p className="text-[#b13535] text-sm leading-relaxed font-medium">
          Incorrect private key. Please enter your private key
        </p>
      );
      btnCSSClasses =
        "text-center bg-[#290d6b] text-white font-medium rounded-2xl p-4 text-base w-[min(80%,_25rem)] hover:bg-[#5630ae] transition-all duration-300 mt-4";
      btnText = "Sign in";
      break;

    case "success":
      headingText = "Sign In Successful!";
      subheadingJSX = (
        <p className="text-[#999] text-sm">Redirecting you to dashboard ...</p>
      );
      btnCSSClasses =
        "text-center bg-[#290d6b] text-white font-medium rounded-2xl p-4 text-base w-[min(80%,_25rem)] hover:bg-[#5630ae] transition-all duration-300 mt-4";
      btnText = "Sign in";
      break;

    default:
      break;
  }

  return (
    <>
      <p className="text-center font-medium">Crypto Clinic</p>
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-8">
          <h2 className={`${ptSerif.className} font-normal text-4xl mb-6`}>
            {headingText}
          </h2>
          {subheadingJSX}
        </div>
        <form
          className="w-full flex flex-col items-center"
          action={formAction}
          onSubmit={() => {
            setClientState("signing-in");
          }}
        >
          <div className="flex flex-col gap-2 mb-6 w-[min(80%,_25rem)]">
            <label className="text-xs text-[#666]" htmlFor="username">
              Username
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="username"
              name="username"
              placeholder="Enter your username ..."
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col gap-2 mb-6 w-[min(80%,_25rem)]">
            <label className="text-xs text-[#666]" htmlFor="password">
              Password
            </label>
            <input
              className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
              id="password"
              name="password"
              placeholder="Enter your password ..."
              type="password"
              autoComplete="current-password"
            />
          </div>
          {(clientState === "unregistered" ||
            clientState === "incorrect-private-key") && (
            <div className="flex flex-col gap-2 mb-6 w-[min(80%,_25rem)]">
              <label className="text-sm text-[#666]" htmlFor="privateKey">
                Private Key
              </label>
              <input
                className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
                id="privateKey"
                name="privateKey"
                placeholder="Enter your private key ..."
              />
            </div>
          )}
          <button
            className={btnCSSClasses}
            disabled={clientState === "signing-in" ? true : false}
          >
            {btnText}
          </button>
        </form>
      </div>
      <Link href="/auth/signup">
        <p className="">Create new account</p>
      </Link>
    </>
  );
}
