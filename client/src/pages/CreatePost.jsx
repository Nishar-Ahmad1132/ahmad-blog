/* eslint-disable no-unused-vars */
import React from 'react'
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";



export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1 "
          />
          <Select>
            <option value={"uncategarized"}>Select a category</option>
            <option value={"javascript"}>Javascript</option>
            <option value={"reactjs"}>React.js</option>
            <option value={"nextjs"}>Next.js</option>
          </Select>
        </div>
        <div
          className="flex gap-4 items-center justify-between border-4 border-teal-600
        border-dotted p-3"
        >
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone={"purpleToBlue"}
            size={"sm"}
            outline
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill theme="snow" placeholder='Write a post....'className='h-72 mb-12 ' required/>
        <Button type='submit' gradientDuoTone={'purpleToPink'} >Publish</Button>
      </form>
    </div>
  );
}
