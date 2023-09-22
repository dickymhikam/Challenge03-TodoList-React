import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const navigate = useNavigate() 

  useEffect(() => {
    // memanggil API untuk mengambil data todos
    if (isRefresh) {
      fetch("http://localhost:8000/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          // ketika Rest API sukses, simpan data dari response ke dalam state lokal
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  const searchHandler = () => {
		if (query.length === 0 ) {
			setQueryResults([]);
			return;
		}

		setQueryResults(
			todos.filter((todo) =>
				todo.task.toLowerCase().includes(query.toLowerCase())
			)
		);
	};

  const results = queryResults.length !== 0 ? queryResults : todos;

  const FilterTodo =
      filter === "all"
      ? results
      : filter === "done"
      ? results.filter((todo) => todo.complete === true)
      : filter === "todo" &&
        results.filter((todo) => todo.complete === false)

      console.log(queryResults);
  return (
    <>
    <div className="border border-4">
      <div className="header">
        <h2> Search </h2>
        <input className="input-search"type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Todo"/>
        <span className="add-button" onClick={searchHandler}>search</span>
      </div>
      <div className="add">
        <button className="btn-add" onClick={()=> navigate('/add')}>Add Todo</button>
      </div>
    </div>

      <div className="filterbutton">
        <h2> TodoList </h2>
          <button  className ="button"onClick={()=> setFilter("all")}>All</button>
          <button className ="button"onClick={()=> setFilter("done")}>Done</button>
          <button className ="button"onClick={()=> setFilter("todo")}>Todo</button>
      </div>

      <ul> 
        {FilterTodo.length === 0 ?(
          <h3 className="kata"> Data tidak ditemukan</h3>
        ): (
        FilterTodo.map((todo) => (
          <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
        )))}
      </ul>
    </>
  );
};

export default TodoList;
