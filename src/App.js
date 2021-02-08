// import {React , Component} from 'react';//only for class based components
import Header from './Components/Header';

import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from './Components/Footer';
import Tasks from "./Components/Tasks";
import { useState, useEffect } from 'react';
import AddTask from "./Components/AddTask";
import About from "./Components/About";




// class App extends Component{
//   render(){
//     return <h1>Hello from a class</h1>
//   }
// }


function App() {
  const [showAddTask, setshowAddTask] = useState(false);
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks();
  }, [])

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data;
  }

  //set reminders
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data;
  }

  //Add task
  const addTask = async (task) => {
    // console.log(task);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask]);
    const res = await fetch('http://localhost:5000/tasks', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(task) })
    const data = await res.json()

    setTasks([...tasks, data])
  }

  //Delete Task

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
    // console.log('delete',id);
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle reminder

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT', headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map(task =>
      task.id == id ? { ...task, reminder: data.reminder } : task
    )
    )
  }

  const name = "Abhishek";
  const x = true;
  return (
    <Router>
      <div className='container'>
        {/* <h1>Hello from React</h1>
      <h2>From {x ? 'Yes':'no'}</h2>  */}
        <Header title="Task Tracker" onAdd={() => setshowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Route path="/" exact render={(props) => (
          <>
            {/* shorter way of writing ternary operator without wirtting else */}
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} /> : 'No Tasks To Show'}
          </>
        )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}



export default App;
