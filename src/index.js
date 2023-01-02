import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: Array(),
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const newTask = event.target[0].value
    if (!newTask) {
      return;
    }
    const tasks = this.state.tasks.slice();
    tasks.push(newTask);
    this.setState({
      tasks: tasks,
    });
    event.target[0].value = null;
    event.target[0].focus();
  }

  handleDelete(i) {
    console.log(i, this.state.tasks[i]);
    const tasks = this.state.tasks.slice()
    tasks.splice(i, 1);
    this.setState({
      tasks: tasks,
    })
  }

  handleChange(event) {
    event.target.parentElement.style.textDecoration = "line-through"
    console.log(event)
  }

  render() {
    const taskChecked = false;
    const tasksList = this.state.tasks.map((id, task) => {
      return (
        <>
          <li key={task}>
            <input type="checkbox" onChange={(event) => this.handleChange(event)}></input>
            {this.state.tasks[task]}
            <button onClick={(task) => this.handleDelete(task)}>D</button>
            <button onClick={() => this.handleDelete(task)}>E</button>
          </li>
        </>
      )
    })

    return (
      <>
        <h1>To-do list</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input type="text" name='taskInput' id='taskInput' placeholder='Tâche' autoFocus></input>
          <input type="submit"></input>
        </form>
        <hr/>
        <ul>{tasksList}</ul>
      </>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
