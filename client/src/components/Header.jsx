/* eslint-disable no-unused-vars */
import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa"

import "./Header.css"
export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link to="/" className="logo">
        <span className="logo-ah">Ahmad`s </span>
        Blog
      </Link>
      <form action="">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline search"
        />
      </form>
      <Button className="search-btn lg:hidden" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-1 md:order-2">
        <Button className="dark-light hidden sm:inline">
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>
            SIgn In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
