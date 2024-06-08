import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";

function Timelayout({ time }) {
  let currentime;
  const date = parseISO(time);
  const timeago = formatDistanceToNow(date);
  currentime = timeago;
  return (
    <span className="mt-2">
      <p>Posted at {timeago} ago</p>
    </span>
  );
}

export default Timelayout;
