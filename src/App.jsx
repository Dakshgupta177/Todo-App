import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./navbar";

function App() {
  const [Todos, setTodos] = useState([]);
  const [Todo, setTodo] = useState("");
  const [Finish, setFinish] = useState(true);
  let setTodostoLS = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  };
  let handleAdd = () => {
    setTodos([...Todos, { Todo, iscomp: false, id: uuidv4() }]);
    setTodo("");
    setTodostoLS();
  };
  let handleEdit = (id, todo) => {
    let newTodo = Todos.filter((item) => item.id !== id);
    setTodos(newTodo);
    setTodo(todo);
    setTodostoLS();
  };
  let handleDelete = (id) => {
    let newTodo = Todos.filter((item) => item.id !== id);
    setTodos(newTodo);
    setTodostoLS();
  };
  let handleChange = (e) => {
    setTodo(e.target.value);
  };
  let handleToggle = (e) => {
    let a = e.target.name;
    const newTodo = [...Todos];
    for (let i = 0; i < newTodo.length; i++) {
      if (a === newTodo[i].id) {
        newTodo[i] = { ...newTodo[i], iscomp: !newTodo[i].iscomp };
        setTodos(newTodo);
      }
    }
    setTodostoLS();
  };
  let handleFinish = () => {
    setFinish(!Finish);

    setTodostoLS();
  };

  useEffect(() => {
    let s = localStorage.getItem("Todos");
    if (s) {
      let Todose = JSON.parse(s);
      setTodos(Todose);
    }
  }, []);
  useEffect(() => {
    if (Todos.length > 0) {
      setTodostoLS();
    }
  }, [Todos]);
  return (
    <>
      <Navbar />
      <div className="bg-indigo-200 font-bold text-lg p-4 py-10 m-4 h-[80vh] rounded-lg w-[40vw] mx-auto max-md:w-full max-lg:w-[80vw]">
        <h1 className="mx-4">Add Todos</h1>
        <div className="flex w-full justify-between items-center max-sm:flex-col">
          <input
            type="text"
            onChange={handleChange}
            value={Todo}
            placeholder="Enter a todo"
            className="text-sm font-semibold mx-4 w-full bg-white rounded text-center"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 rounded text-xs p-1 font-bold text-white mx-4 h-6 max-sm:w-full max-sm:my-2 disabled:bg-green-400 flex justify-center items-center"
            disabled={Todo.length <= 2}
          >
            <IoMdAdd />
          </button>
        </div>
        <div className="flex items-center font-semibold text-base">
          <input
            type="checkbox"
            name={Todos.iscomp}
            id=""
            onChange={handleFinish}
            checked={Finish}
            className="m-4"
          />
          <p>Show Finished</p>
        </div>
        <div className="">
          <h1 className="mt-4 mx-4">Your Todos</h1>
          {Todos.map((e) => {
            return (
              (Finish || !e.iscomp) && (
                <div
                  key={uuidv4()}
                  className="todos flex items-center mb-2 justify-between"
                >
                  <div className="star flex items-center">
                    <input
                      type="checkbox"
                      onChange={handleToggle}
                      name={e.id}
                      checked={e.iscomp}
                      id=""
                      className="m-4"
                    />
                    <p
                      className={
                        e.iscomp
                          ? "line-through ,text-base,font-semibold"
                          : "text-base, font-semibold"
                      }
                    >
                      {e.Todo}
                    </p>
                  </div>
                  <div className="buttons flex">
                    <button
                      onClick={() => {
                        handleEdit(e.id, e.Todo);
                      }}
                      className="bg-green-500 rounded text-xs p-1 font-bold text-white mx-4 h-6"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(e.id);
                      }}
                      className="bg-green-500 rounded text-xs p-1 font-bold text-white mx-4 h-6"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
