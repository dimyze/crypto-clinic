"use client";

import { PT_Serif } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { createUser, redirectToSignIn } from "@/actions/clientActions";

const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });

export default function SignUp() {
  const [user, action] = useFormState(createUser, {
    privateKey: "NA",
    username: "NA",
  });
  const [state, setState] = useState<string>("idle");

  useEffect(() => {
    if (user.privateKey.length > 0 && user.privateKey !== "NA") {
      window.localStorage.setItem(user.username, JSON.stringify(user));
      setState("success");
    } else if (user.privateKey.length === 0) {
      setState("failure");
    } else if (user.privateKey === "NA") {
      setState("idle");
    }
  }, [user.privateKey]);

  let headingText: string = "Let's Get Started";
  let labelText1: string = "Username";
  let labelText2: string = "Password";
  let btnText: string = "Sign up";
  let subheadingJSX: JSX.Element = (
    <p className="text-[#999] text-sm">
      Create a username and password to continue
    </p>
  );
  let btnCSSClasses: string =
    "mt-4 text-center bg-[#290d6b] text-white font-medium rounded-2xl p-4 text-base w-[min(80%,_25rem)] hover:bg-[#5630ae] transition-all duration-300";
  let formAction = action;

  switch (state) {
    case "idle":
      headingText = "Let's Get Started";
      labelText1 = "Username";
      labelText2 = "Password";
      btnText = "Sign up";
      subheadingJSX = (
        <p className="text-[#999] text-sm">
          Create a username and password to continue
        </p>
      );
      btnCSSClasses =
        "mt-4 text-center bg-[#290d6b] text-white font-medium rounded-2xl p-4 text-base w-[min(80%,_25rem)] hover:bg-[#5630ae] transition-all duration-300";
      formAction = action;
      break;

    case "creating user":
      labelText1 = "Username";
      labelText2 = "Password";
      btnCSSClasses =
        "mt-4 text-center bg-[#7F7F81] text-white font-medium rounded-2xl p-4 text-base w-[min(80%,_25rem)] transition-all duration-300";
      btnText = "Please wait ...";
      break;

    case "success":
      headingText = "Sign Up Successful!";
      subheadingJSX = (
        <>
          <p className="text-[#999] text-sm mb-2">
            Here is your encrypted Private key.
          </p>
          <p className="text-[#1c782f] text-sm font-semibold">Keep it Safe!</p>
        </>
      );
      labelText1 = "Public Key";
      labelText2 = "Private Key";
      btnText = "Go back to Sign in";
      formAction = redirectToSignIn;
      break;

    case "failure":
      headingText = "Sign Up Failed!";
      subheadingJSX = (
        <p className="text-[#B52929] text-sm font-medium">
          User with the same username already exists
        </p>
      );
      labelText1 = "";
      labelText2 = "";
      btnText = "Go back to Sign in";
      formAction = redirectToSignIn;

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
          action={formAction}
          className="w-full flex flex-col items-center"
          onSubmit={() => {
            setState("creating user");
          }}
        >
          {state !== "success" && (
            <div className="flex flex-col gap-2 mb-6 w-[min(80%,_25rem)]">
              <label className="text-xs text-[#666]" htmlFor="username">
                {labelText1}
              </label>

              <input
                className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
                id="username"
                name="username"
                placeholder="Create a username (no spaces or special characters) ..."
                required
                disabled={state !== "idle"}
                autoComplete="username"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 mb-6 w-[min(80%,_25rem)]">
            <label className="text-xs text-[#666]" htmlFor="password">
              {labelText2}
            </label>
            {state !== "success" && (
              <input
                className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d]"
                id="password"
                name="password"
                placeholder="Create a strong password ..."
                type="password"
                required
                disabled={state !== "idle"}
                autoComplete="new-password"
              />
            )}
            {state === "success" && (
              <input
                className="bg-[#f8f8f5] rounded-2xl p-5 pl-5 pr-5 text-sm outline-[#190a3d] cursor-text"
                name="privateKey"
                disabled
                value={user.privateKey}
                autoComplete="off"
              />
            )}
          </div>
          <button
            className={btnCSSClasses}
            disabled={state === "creating user"}
          >
            {btnText}
          </button>
        </form>
      </div>
      <Link href="/auth/signin">
        <p className="">Go back to Sign in</p>
      </Link>
    </>
  );
}
