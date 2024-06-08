import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeletePost, selectById } from "../slices/CrudifSlice";
import Timelayout from "./Time";

function Singlepost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedPost = useSelector((state) => selectById(state, id));
  const Deleteposts = async () => {
    try {
      await dispatch(DeletePost({ id })).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-full w-full mt-20">
      {selectedPost && (
        <div
          key={selectedPost.id}
          className="bg-blue-200 p-10 rounded-lg shadow-md mt-2"
        >
          <h2 className="text-2xl mb-2">
            {selectedPost.title.charAt(0).toUpperCase() +
              selectedPost.title.slice(1)}
          </h2>
          <p className="mb-2">{selectedPost.body}</p>
          <div className="flex items-center justify-start gap-5">
            <Link
              to={`/Editpost/${selectedPost.id}`}
              className="underline hover:scale-105"
            >
              Edit Post
            </Link>
            <Link
              onClick={Deleteposts}
              className="underline text-red-900 hover:scale-105 transition-transform"
            >
              Delete Post
            </Link>
          </div>
          <Timelayout time={selectedPost.date} />
        </div>
      )}
    </div>
  );
}

export default Singlepost;
