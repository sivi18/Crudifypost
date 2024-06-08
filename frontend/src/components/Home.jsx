import React from "react";
import { useSelector } from "react-redux";
import { PostStatus, selectAll } from "../slices/CrudifSlice";
import Timelayout from "./Time";
import { Link } from "react-router-dom";

function Home() {
  const allPost = useSelector(selectAll);
  const postStatus = useSelector(PostStatus);

  if (postStatus === "pending") {
    return <div className="mt-2 text-2xl">Loading...</div>;
  }

  return (
    <>
      <div className="mr-5 mt-20 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4">
          {allPost &&
            allPost.map((item) => (
              <div
                key={item.id}
                className="bg-blue-200 h-full w-full rounded ml-2 p-2  hover:scale-105 transition-transform"
              >
                <h2 className="text-2xl mb-2">
                  {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                </h2>
                <p className="mb-2">{item.body}</p>
                <Link to={`/viewpost/${item.id}`} className=" underline">
                  View Post
                </Link>
                <br />
                <Timelayout time={item.date} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
