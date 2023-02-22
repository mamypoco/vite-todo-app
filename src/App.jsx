import { useState } from "react";
import CustomForm from "./components/CustomForm";
import EditForm from "./components/EditForm";
import TaskList from "./components/TaskList";
//custom hooks
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
   const [tasks, setTasks] = useLocalStorage("react-todo.tasks", []);
   const [previousFocusEl, setPreviousFocusEl] = useState(null);
   //to set previous focus after you updated the task
   const [editedTask, setEditedTask] = useState(null);
   const [isEditing, setIsEditing] = useState(false);

   const addTask = (task) => {
      setTasks((prevState) => [...prevState, task]);
   };

   const deleteTask = (id) => {
      setTasks((prevState) => prevState.filter((t) => t.id !== id));
   };

   const toggleTask = (id) => {
      setTasks((prevState) =>
         prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
      );
   };

   const updateTask = (task) => {
      setTasks((prevState) =>
         prevState.map((t) =>
            t.id === task.id ? { ...t, name: task.name } : t
         )
      );
      closeEditMode(task);
   };

   const closeEditMode = () => {
      setIsEditing(false);
      previousFocusEl.focus();
      //standard javascript to return to focus on the previous cell
   };

   const enterEditMode = (task) => {
      setEditedTask(task);
      setIsEditing(true);
      setPreviousFocusEl(document.activeElement);
      //this should grab the active element that was clicked when we entered edit mode which was the edit button
   };

   return (
      <div className="container">
         <header>
            <h1>My Task List</h1>
         </header>
         {isEditing && (
            <EditForm
               editedTask={editedTask}
               updateTask={updateTask}
               closeEditMode={closeEditMode}
            />
         )}
         <CustomForm addTask={addTask} />
         {tasks && (
            <TaskList
               tasks={tasks}
               deleteTask={deleteTask}
               toggleTask={toggleTask}
               enterEditMode={enterEditMode}
            />
         )}
      </div>
   );
}

export default App;
