import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AddnewPost } from "../slices/CrudifSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
function NewPost() {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const save = [postTitle, postDesc].every(Boolean);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Addpost = async (e) => {
    e.preventDefault();
    if (save) {
      try {
        await dispatch(
          AddnewPost({ id: nanoid(), title: postTitle, body: postDesc })
        ).unwrap();
        toast.success("Post Added");
        setPostTitle("");
        setPostDesc("");
        navigate("/");
      } catch (error) {
        toast.error(error.message || "Failed to create post");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center mt-2 ml-2 h-fit w-full">
        <div className="relative top-48 bg-hover/15 p-4 flex flex-col gap-5 h-[300px] w-[350px] rounded-xl">
          <h1 className="text-4xl text-blue-400 text-center">
            Create New Post
          </h1>
          <form onSubmit={Addpost}>
            <div className="flex justify-around mt-5 items-center">
              <label htmlFor="posttitle" className="text-1xl font-mono">
                Title
              </label>
              <input
                className="ml-5 bg-transparent border-b-2 border-blue-400 outline-none font-mono"
                type="text"
                placeholder="Post Title"
                name="posttitle"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>
            <div className="flex mt-10 justify-around">
              <label htmlFor="postdesc" className="text-1xl font-mono">
                Body
              </label>
              <input
                type="text"
                placeholder="Post Description"
                name="postdesc"
                value={postDesc}
                className="bg-transparent ml-5 border-b-2 border-blue-400 outline-none font-mono"
                onChange={(e) => setPostDesc(e.target.value)}
              />
            </div>
            <button
              className="absolute left-32 bottom-10 p-2 bg-blue-400 rounded-lg mt-5 hover:text-blue-700 hover:bg-white disabled:bg-zinc-300"
              disabled={!save}
              type="submit"
            >
              Submit Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPost;
