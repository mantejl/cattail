// CardItem.js
import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

function CardItem({ data, index }) {
    const [title, setTitle] = useState(data.title);
    const [date, setDate] = useState(data.date || '');
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleDateChange = (e) => {
      setDate(e.target.value);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        data.date = date;
      }
    };
  
    return (
      <Draggable index={index} draggableId={data.id.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='bg-white rounded-md p-1 m-1 mt-0 last:mb-0 text-black border border-gray-300' // Apply the border class
          >
            <div className="mb-1 pb-2">
              <textarea
                type='text'
                placeholder='Task title'
                value={title}
                onChange={handleTitleChange}
                className='w-full p-1 text-sm border-none outline-none resize-none'
                style={{ height: '30px' }}
              />
  
              <input
                type='text'
                placeholder='Task date'
                value={date}
                onChange={handleDateChange}
                onKeyPress={handleKeyPress}
                className='w-full p-1 text-xs text-gray-400 border-none outline-none resize-none'
              />
            </div>
            <div className='flex justify-between'>
              <div className='flex space-x-2 items-center'>
                <span className='flex space-x-1 items-center text-black'>
                  <span>{data.chat}</span>
                </span>
                <span className='flex space-x-1 items-center text-black'>
                  <span>{data.attachment}</span>
                </span>
              </div>
  
              {/* Edit the style attribute for both buttons */}
              <div className='flex space-x-2'>
                <button
                  className='text-white bg-orange-500 px-2 py-1 rounded-md'
                  style={{ backgroundColor: '#C3500F' }}
                >
                  Edit
                </button>
                <button
                  className='text-white bg-orange-500 px-2 py-1 rounded-md'
                  style={{ backgroundColor: '#C3500F' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
  
  export default CardItem;  