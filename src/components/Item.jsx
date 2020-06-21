import React from 'react';

const Item = ({ key,todo,index, getTodosFromMySQL }) => {


  return (
    <li key={index} id={todo.id}>
      <p>{todo.name}</p>
    </li>
  )
};


export default Item;