/* eslint-disable no-unused-vars */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignIn() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="mt-20">
      <div className="sign-up-sec ">
        <div className="left">
          <Link to="/" className="sign-up-logo dark:text-white">
            <span className="sign-up-logo-ah">Ahmad`s</span>
            Blog
          </Link>
          <p className="su-left-para">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="right">
          <form className="sign-up-form" >
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                // onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                // onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="is-log-in">
            <span>Create new account.</span>
            <Link to="/sign-up" className="text-blue-400">
              Sign Up
            </Link>
          </div>
          {/* {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )} */}
        </div>
      </div>
    </div>
  );
}
