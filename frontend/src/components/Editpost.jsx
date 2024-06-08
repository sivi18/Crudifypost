import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { UpdatePost, selectById } from "../slices/CrudifSlice";

function Editpost() {
  const { id } = useParams();
  const TargetPost = useSelector((state) => selectById(state, id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");

  useEffect(() => {
    if (TargetPost) {
      setPostTitle(TargetPost.title);
      setPostDesc(TargetPost.body);
    }
  }, [TargetPost]);

  const editpost = async (event) => {
    event.preventDefault();
    if (save) {
      try {
        await dispatch(
          UpdatePost({ id: TargetPost.id, title: postTitle, body: postDesc })
        ).unwrap();
        toast.success("Updated");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const save = [postTitle, postDesc].every(Boolean);

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center mt-2 ml-2 h-fit w-full">
        <div className="relative top-48 bg-hover/15 p-4 flex flex-col gap-5 h-[300px] w-[350px] rounded-xl">
          <h1 className="text-4xl text-blue-400 text-center">Edit Post</h1>
          <form onSubmit={editpost}>
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
              Edit Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Editpost;
