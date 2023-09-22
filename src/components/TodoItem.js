import { useState } from "react";

const TodoItem = ({ todo, setRefresh }) => {
  const [Edit, setEdit] = useState(false)
  const [newTask, setNewTask] = useState(todo.task)
  
  const updateTodo = () => {
    todo.complete = !todo.complete

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    }).then(() => {
      console.log('todo updated.')
      setRefresh(true)
    })
  }

  const deleteTodo = () => {
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "DELETE",
    }).then(() => {
      console.log('todo deleted.')
      setRefresh(true);
    });
  };

  const editTodo = () => {
    const editedTodo ={
      ...todo,
      task: newTask,
    }

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedTodo)
    }).then(() => {
      console.log('todo updated.')
      setRefresh(true)
      setEdit(false)
    })
  }

   const handleTaskChange = (e) => {
    setNewTask(e.target.value)
   };
   const handleEditButtonClick = () =>{
    setEdit(true)
   };

  return (
    <li className={`${todo.complete ? "checked" : ""}`}>
      <div onClick={updateTodo}>{todo.task} </div>
      {Edit ? (
        <form className="editform">
          <input className="editinput" type="text" value={newTask} onChange={handleTaskChange} />

          <button className="buttonedit" onClick={editTodo}>Submit</button>
        </form>
      ) : (
        <span className="edit" onClick={handleEditButtonClick}>✏️</span>
      )}
      <span className="close" onClick={deleteTodo}>🗑️</span>
    </li>
  )
}

export default TodoItem;