"use client";

import CardItem from "./CardItem";
import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { database } from "../firebase";
import { ref as dbRef, onValue, set } from "firebase/database";

function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const KanbanBoard = ({ projectID }) => {
  const [columns, setColumns] = useState({
    toDo: {
      name: "To Do",
      items: [],
    },
    inProgress: {
      name: "In Progress",
      items: [],
    },
    done: {
      name: "Done",
      items: [],
    },
  });

  useEffect(() => {
    const tasksRef = dbRef(
      database,
      `users/Elissa/projects/${projectID}/tasks`
    );
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const tasksData = snapshot.val() || {
        toDo: [],
        inProgress: [],
        done: [],
      };
      setColumns({
        toDo: { name: "To Do", items: tasksData.toDo || [] },
        inProgress: { name: "In Progress", items: tasksData.inProgress || [] },
        done: { name: "Done", items: tasksData.done || [] },
      });
    });

    return () => unsubscribe();
  }, [projectID]);

  const [selectedColumn, setSelectedColumn] = useState("");
  const [ready, setReady] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setReady(true);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newColumns = { ...columns };
    const { source, destination } = result;
    const draggedItem = newColumns[source.droppableId].items[source.index];
    newColumns[source.droppableId].items.splice(source.index, 1);
    newColumns[destination.droppableId].items.splice(
      destination.index,
      0,
      draggedItem
    );

    setColumns(newColumns);
    const tasksRef = dbRef(
      database,
      `users/Elissa/projects/${projectID}/tasks`
    );
    set(tasksRef, columns);
  };

  const onTextAreaKeyPress = (e) => {
    if (e.key === "Enter") {
      const val = e.target.value;
      if (val.length === 0 || !selectedColumn || !columns[selectedColumn]) {
        setShowForm(false);
        return;
      }

      const item = {
        id: createGuidId(),
        title: currentTitle,
        date: currentDate,
      };

      const newColumns = { ...columns };
      newColumns[selectedColumn].items.push(item);

      setColumns(newColumns);
      setShowForm(false);
      setCurrentTitle("");
      setCurrentDate("");
      console.log("Saving to database:", item);

      const tasksRef = dbRef(
        database,
        `users/Elissa/projects/${projectID}/tasks/${selectedColumn}`
      );
      set(tasksRef, newColumns[selectedColumn].items);
      e.target.value = "";
    }
  };

  const onDateInputKeyPress = (e) => {
    if (e.key === "Enter") {
      const val = e.target.value;
      setCurrentDate(val);
    }
  };

  return (
    <div className="p-10">
      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-3">
            {Object.keys(columns).map((columnName) => {
              const column = columns[columnName];
              return (
                <div key={columnName} className="col-span-1">
                  <Droppable droppableId={columnName} key={columnName}>
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div
                          className={`rounded-md
                            flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && "bg-green-100"}`}
                        >
                          <span
                            className="w-full h-1 bg-gradient-to-r
                              absolute inset-x-0 top-0"
                          ></span>
                          <h4 className="p-3 flex justify-center items-center mb-2">
                            <span className="text-sm text-gray-400">
                              {column.name}
                            </span>
                          </h4>
                          <div
                            className="overflow-y-auto overflow-x-hidden h-auto"
                            style={{ maxHeight: "calc(100vh - 290px)" }}
                          >
                            {column.items.length > 0 &&
                              column.items.map((item, iIndex) => {
                                return (
                                  <CardItem
                                    key={item.id}
                                    data={item}
                                    index={iIndex}
                                    columnName={columnName}
                                    projectID={projectID}
                                    className="m-3"
                                  />
                                );
                              })}
                            {provided.placeholder}
                          </div>
                          {showForm && selectedColumn === columnName ? (
                            <div className="p-3">
                              <textarea
                                className="border-gray-300 rounded focus:ring-purple-400 w-full text-sm"
                                placeholder="Task info"
                                data-id={columnName}
                                style={{
                                  color: "black",
                                  outline: "none",
                                  borderStyle: "none",
                                }}
                                value={currentTitle}
                                onChange={(e) =>
                                  setCurrentTitle(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    onTextAreaKeyPress(e);
                                  }
                                }}
                              />
                              <input
                                autoFocus
                                type="text"
                                placeholder="Task date"
                                className="border-gray-300 rounded focus:ring-purple-400 w-full p-1 mt-2 text-xs text-gray-400"
                                value={currentDate}
                                onChange={(e) => setCurrentDate(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    onDateInputKeyPress(e);
                                  }
                                }}
                              />
                            </div>
                          ) : (
                            <button
                              className="flex justify-center items-center my-3 space-x-2 text-lg"
                              onClick={() => {
                                setSelectedColumn(columnName);
                                setShowForm(true);
                              }}
                            >
                              <PlusCircleIcon className="w-5 h-5 text-black" />
                              <span className="text-gray-400 text-sm">
                                Add task...
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default KanbanBoard;
