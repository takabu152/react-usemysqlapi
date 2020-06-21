import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <>
    <header>
      <div className="container">
        <div className="header-left">
          <p>TodoList</p> 
        </div>
      </div>
    </header>
    <TodoList />
    <footer>
      <div className="container"></div>
    </footer>
    </>
  );
}

export default App;
