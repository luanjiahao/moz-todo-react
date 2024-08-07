import FileButton from "./components/FileButton";
import Form from "./components/Form";
import Todo from "./components/Todo";

function App(props) {
  const taskList = props.tasks?.map((task) => <Todo key={task.id} name={task.name} id={task.id} completed={task.completed} />);
  const btList = props.bts?.map((bt)=> <FileButton key={bt.name} name={bt.name} pressed={bt.pressed} />);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
      <div className="filters btn-group stack-exception">
        {btList}
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
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
