import React, { useState, useEffect } from 'react';
import Item from './Item';
import Button from '@material-ui/core/Button';

function TodoList() {

  const [todoList , setTodoList] = useState(null);
  const [todoName,setTodoName]=useState("");

  const getTodosFromMySQL = async () => {
    const url = "http://localhost:3001/api/index";
    let response = await fetch(url);

    if (response.ok) { // HTTP ステータスが 200-299 の場合
      // レスポンスの本文を取得(後述)
      let results = await response.json();
      console.log(results);
      //stateにつめる。
      setTodoList(results.items);
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  const createTodosFromMySQL = async () => {
    const url = 'http://localhost:3001/api/create';
    console.log(todoName);
    const data = {itemName: todoName};
    console.log(JSON.stringify(data));

    let response = await fetch(url,{
      method: 'POST', // or 'PUT'
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    console.log(response);
    console.log(response.json);

    if (response.ok) { // HTTP ステータスが 200-299 の場合
      // レスポンスの本文を取得(後述)
      let results = await response.json();
      console.log(results);
      //stateにつめる。
      setTodoList(results.items);
    } else {
      alert("HTTP-Error: " + response.status);
    }

    setTodoName("");

    // await fetch(url, {
    //   method: 'POST', // or 'PUT'
    //   headers:{
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: "{a:a}"
    // }).then((res) => {
    //   let results = res.json();
    //   setTodoList(results.items);
    // })
    // .then(response => console.log('Success:', JSON.stringify(response)))
    // .catch(error => console.error('Error:', error));
  };



    // useEffectを利用して初回の取得を行う
    useEffect(() => {
      const result = getTodosFromMySQL();
    }, [])

  const textOnChange = (event) => {
    console.log(event.target.value);
    setTodoName(event.target.value);
  };

  const btnOnClick = () =>{
    createTodosFromMySQL();
  }

  return (
    <>
    <input type="text" onChange={textOnChange}/>
    <Button variant="contained" color="primary" onClick = {btnOnClick}>追加</Button>
    <ul>
      {
        todoList?.map((x, index) => 
          <Item
          key = {x.id}
          todo={x}
          index={index}
          getTodosFromMySQL={getTodosFromMySQL}
        />
        )
  
      }
    </ul>
    </>
  );
}

export default TodoList;
