import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import React from "react";

const Header = ({setRefresh}) => {
  const [task, setTask] = useState("");
  const navigate = useNavigate()

  // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
  const addTodo = () => 
  {
	
    const newTodo = {task, complete: false}

        
    fetch('http://localhost:8000/todos', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo)
            }).then(() => 
            {
                
    // ketika sukses menambah data, reset form dengan mengeset state task menjadi empty string 
                
            setTask("")
            setRefresh(true)
            setTimeout(() => {
                Swal.fire(
                    'Selamat!',
                    'Anda Telah Berhasil Menambah Task',
                    'success'
                  )
                }, 500)
            });
    } 
    return (
        <div id="todo-header" className="header">
        <h2>TodoInput</h2>
            <input className="input-add" type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add Todo"/>
            <span className="two-btn" onClick={addTodo}>Add</span>
            <span className="two-btn" onClick={()=> navigate("/")}>Back</span>
        </div>
    );
};

export default Header;

