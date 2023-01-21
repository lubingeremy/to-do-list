import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';


class Tasks {
  constructor(text) {
    // Randomize id
    this.id = Math.random().toString(16).slice(2) + "-" + Date.now().toString()
    this.text = text;
  }
}

class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [{
        unchecked: ["123","456","789","10","11","12","13"],
        // unchecked: Array(),
        checked: Array(),
      }]
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const tasks = this.state.tasks[0]
    const newTask = event.target[0].value
    // const newTask = ["123","456","789","10","11","12","13"]

    if (!newTask) {
      return;
    }
    const unchecked = tasks.unchecked.slice();
    const checked = tasks.checked.slice();
    unchecked.push(newTask);
// //////////////////////
// //////////////////////
    this.setState({
      tasks: [{
        unchecked: unchecked,
        checked: checked,
      }]
    });
    event.target[0].value = null;
    event.target[0].focus();
  }

  handleDelete(i, check) {
    const tasks = this.state.tasks[0]

    if(check) {
      // console.log(i, tasks.unchecked[i]);
      const unchecked = tasks.unchecked.slice()
      const checked = tasks.checked.slice()
      checked.splice(i, 1);
      this.setState({
        tasks: [{
          unchecked: unchecked,
          checked: checked,
        }]
      })
      return;
    }

    // console.log(i, tasks.unchecked[i]);
    const unchecked = tasks.unchecked.slice()
    const checked = tasks.checked.slice()
    unchecked.splice(i, 1);
    this.setState({
      tasks: [{
        unchecked: unchecked,
        checked: checked,
      }]
    })
  }

  handleChange(event) {
    const parentStyle = event.target.parentElement.style

    if(parentStyle.textDecoration){
      parentStyle.textDecoration = null
      return;
    }

    parentStyle.textDecoration = "line-through"
  }

  render() {

    const zfu = "KOI"


    const tasks = this.state.tasks[0];
    // console.log(tasks)
    const tasksList = tasks.unchecked.map((id, task) => {
      return (
        <>
          <li key={task}>
            <input type="checkbox" onChange={(event) => this.handleChange(event)}></input>
            {tasks.unchecked[task]}
            <button onClick={(task) => this.handleDelete(task)}>D</button>
            <button onClick={() => this.handleDelete(task)}>E</button>
          </li>
        </>
      )
    })

    const checkedTasks = tasks.checked.map((id, checkedTask) => {
      <li key={checkedTask}>
        <input type="checkbox" onChange={(event) => this.handleChange(event)}></input>
        {tasks.unchecked[checkedTask]}
        <button onClick={(checkedTask) => this.handleDelete(checkedTask)}>D</button>
        <button onClick={() => this.handleDelete(checkedTask)}>E</button>
      </li>
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
        <hr/>
        <ul>{checkedTasks}</ul>
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
