import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ref as dbRef, set } from "firebase/database";
import { database } from "../firebase";

function CardItem({ data, index, columnName, projectID, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(); // Call the onDelete function passed as a prop
  };
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-1 m-1 mt-0 last:mb-0 text-black border border-gray-300 relative"
        >
          <div className="mb-1 pb-2">
            <div
              className={`w-full p-1 text-sm border-none outline-none resize-none`}
              style={{ minHeight: "30px", whiteSpace: "pre-line" }}
            >
              {data.title}
            </div>

            <div className="w-full p-1 text-xs text-gray-400">{data.date}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center text-black">
                <span>{data.chat}</span>
              </span>
              <span className="flex space-x-1 items-center text-black">
                <span>{data.attachment}</span>
              </span>
            </div>
            <button
              className="text-red-500 text-xs cursor-pointer"
              onClick={(e) => handleDelete(e)}
            >
              x
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;
