// @flow
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '../../../src';
const aaa = () => {


  const [t0, set0] = useState(['t1111', 't2222']);
  const [t1, set1] = useState([
    {
      id: 1,
      title: '111111',
    },
    {
      id: 2,
      title: '222222',
    },
  ]);
  const [t2, set2] = useState([
    {
      id: 3,
      title: '333333'
    },
    {
      id: 4,
      title: '444444'
    },
  ]);
  const fn = (t) => t === 't1' ? t1 : t2
  const onDragEnd = (a) => {
    console.log(a);
    const { destination, type, source} = a;
    if (!destination) return;
    if (type === 'COLUMN') {
      const result = [...t0];
      const [removed] = result.splice(source.index, 1);
      result.splice(destination.index, 0, removed);
      set0(result)
      return;
    }
    if (type === 'AAAA') {
      const tt1 = [...t1];
      const tt2 = [...t2];
      const remove = source.droppableId === 't1' ? tt1 : tt2;
      const add = destination.droppableId === 't1' ? tt1 : tt2;
      const [removed] = remove.splice(source.index, 1);
      add.splice(destination.index, 0, removed);
      set1(tt1);
      set2(tt2);
    }
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal" 
        >
          {(provided) => (
            <div style={{display:'flex', padding:50}} ref={provided.innerRef} {...provided.droppableProps}>
              {t0.map((key, index) => (
                <div key={key}>
                  <Draggable key={key} draggableId={key} index={index}>
                    {
                      (provided) => (
                        <div
                        // style={{padding: 20}}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                          <div>{key}</div>
                          <Droppable
                            droppableId={`t${index+1}`}
                            type="AAAA"
                          >
                            {
                              (provided) => (
                                <div
                                  ref={provided.innerRef} {...provided.droppableProps}
                                  style={{
                                    minHeight: 50
                                  }}
                                >
                                  {
                                    (key === 't1111' ? t1 : t2).map((ee, ii) => (
                                      <Draggable key={ee.id} draggableId={ee.title} index={ii}>
                                        {
                                          (provided) => (
                                            <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            >
                                              {ee.title}
                                            </div>
                                          )
                                        }
                                      </Draggable>
                                    ))
                                  }
                                </div>
                              )
                            }
                          </Droppable>
                        </div>
                      )
                    }
                  </Draggable>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
    </div>
  );
}


export default aaa;
