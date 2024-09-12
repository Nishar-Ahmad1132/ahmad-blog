/* eslint-disable no-unused-vars */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      // setLoading(false);
      else {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <div className="mt-20 min-h-screen">
      <div className="sign-up-sec ">
        <div className="left">
          <Link to="/" className="sign-up-logo dark:text-white">
            <span className="sign-up-logo-ah">Nishar Ahmad`s</span>
            Blog
          </Link>
          <p className="su-left-para">
            Share your story with the world. Stand out with a
            professionally-designed blog website that can be customized to fit
            your brand. Build, manage, and promote your blog with Squarespace’s
            built-in suite of design and marketing tools.
          </p>
        </div>
        <div className="right">
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <div>
              <Label value="Your name" />
              <TextInput
                type="text"
                placeholder="Nishar Ahmad"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your usename" />
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
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
            <OAuth />
          </form>
          <div className="is-log-in">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-400">
              Sign-In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
