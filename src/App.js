import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import { useState, useRef, useEffect } from "react";



function App(props) {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const listHeadingRef = useRef(null);
  let [editCount, setEditCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/Todo/all").then((res) => {
      return res.json()
    }).then((value) => {
      setTasks(value)
    })
  }, [editCount])

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);


  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));



  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  function toggleTaskCompleted(id) {
    const updateTask=tasks.filter((task)=>task.id==id)[0];
    fetch("http://localhost:8080/Todo/complete?id=" + id + "&complete=" +  !updateTask.completed, { method: "post" }).then((res) => {
      console.log(res.text());
      setEditCount(++editCount);
    })
  }


  function addTask(name) {
    fetch("http://localhost:8080/Todo/add?name=" + name + "&isCompleted=false", { method: "post" }).then((res) => {
      console.log(res.text());
      setEditCount(++editCount);
    })
  }

  function deleteTask(id) {
    fetch("http://localhost:8080/Todo/delete?id=" + id, { method: "post" }).then((res) => {
      console.log(res.text());
      setEditCount(++editCount);
    })
  }

  function editTask(id, newName) {
    fetch("http://localhost:8080/Todo/update?id=" + id + "&name=" + newName , { method: "post" }).then((res) => {
      console.log(res.text());
      setEditCount(++editCount);
    })
  }


  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}


      </ul>
    </div>
  );
}


export default App;
