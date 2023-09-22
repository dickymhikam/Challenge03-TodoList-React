import { useState } from "react";
import React from "react";
import TodoList from "../components/TodoList";

const Home = () => {
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  };
  return (
    <div className="App">
      <div className="content">
        <div className="card">
          <div className="card-body">
            <TodoList setRefresh={setRefresh} isRefresh={isRefresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
