import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CreateTask from './CreateTask';

let tasks = [];
let date = [];
let status = [];

function LoadTasks(){

  let container = [];
  if(tasks.length > 0)
  {
  container = tasks.map((element, indeksas) =>
  <div className="NearDivsColor">
  <div className= {status[indeksas] === "1" ? "colorr" : "colorg"}></div>
  <div key = {indeksas} className="TasksDiv">
    <div className="TaskElementas">{element}</div>
      <div className="BothDivs">
      <div className="date">{date[indeksas]}</div>
      <div className="RemoveMygtukasDiv">
      <div className="RemoveMygtukas" data-task-id={indeksas} onClick={RemoveTask}>Remove</div>
    </div>
    </div>
    </div>
  </div>
  );
  }
  else{
    container = <div className="NoTodosButton">No todos</div>;
    return container;
  }
  return container;
}
export function DisplayCreateTask(displayValue) {
  const vieta = document.querySelector(".VisasCreateTask");
  vieta.style.display = displayValue;
}
function RemoveTask(e){
  let index = e.target.getAttribute('data-task-id');
  let container;
  date.splice(index, 1);
  tasks.splice(index, 1);
  status.splice(index, 1);
  localStorage.setItem('date', JSON.stringify(date));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('status', JSON.stringify(status));
  if(tasks.length > 0)
  {
    container = tasks.map((element, indeksas) =>
    <div className="NearDivsColor">
    <div className= {status[indeksas] === "1" ? "colorr" : "colorg"}></div>
    <div key = {indeksas} className="TasksDiv">
      <div className="TaskElementas">{element}</div>
        <div className="BothDivs">
        <div className="date">{date[indeksas]}</div>
        <div className="RemoveMygtukasDiv">
        <div className="RemoveMygtukas" data-task-id={indeksas} onClick={RemoveTask}>Remove</div>
      </div>
      </div>
      </div>
    </div>
  );
  isrikiavimas();
  }
  else{
    container = <div className="NoTodosButton">No todos</div>;
    ReactDOM.render(container, document.getElementById("Tasks"));
  }
}
export function AddTask(ImportTask)
{
const select = document.querySelector('.TaskSelectionCustom');
const selectedOption = select.options[select.selectedIndex];
 let tasksNumber = tasks.length;
 date[tasksNumber] = new Date().toLocaleString();
 tasks[tasksNumber] = ImportTask;
 status[tasksNumber] = selectedOption.value;
 localStorage.setItem('date', JSON.stringify(date));
 localStorage.setItem('tasks', JSON.stringify(tasks));
 localStorage.setItem('status', JSON.stringify(status));
  const container= tasks.map((element, indeksas) =>
  <div className="NearDivsColor">
  <div className= {status[indeksas] === "1" ? "colorr" : "colorg"}></div>
  <div key = {indeksas} className="TasksDiv">
    <div className="TaskElementas">{element}</div>
      <div className="BothDivs">
      <div className="date">{date[indeksas]}</div>
      <div className="RemoveMygtukasDiv">
      <div className="RemoveMygtukas" data-task-id={indeksas} onClick={RemoveTask}>Remove</div>
    </div>
    </div>
    </div>
  </div>
);
  isrikiavimas();

}
function isrikiavimas(){
  const vieta = document.querySelector(".SelectionCustom");
  const selectedOption = vieta.options[vieta.selectedIndex];
  let container = [];
  let SelectedDate = [];
  let SelectedTask = [];
  let SelectedStatus  = [];
  if(selectedOption.value === "0")
  {
      for(let i = 0; i < tasks.length;i++)
      {
        SelectedDate[i] = date[i];
        SelectedTask[i] = tasks[i];
        SelectedStatus[i] = status[i];
      }
    
  }
  else{
    for(let i = 0;i < tasks.length;i++)
    {
      if(status[i] === selectedOption.value)
      {
        SelectedDate[i] = date[i];
        SelectedTask[i] = tasks[i];
        SelectedStatus[i] = status[i];
      }
    }
  }
    container = SelectedTask.map((element, indeksas) =>
    <div className="NearDivsColor">
    <div className= {status[indeksas] === "1" ? "colorr" : "colorg"}></div>
    <div key = {indeksas} className="TasksDiv">
      <div className="TaskElementas">{element}</div>
        <div className="BothDivs">
        <div className="date">{date[indeksas]}</div>
        <div className="RemoveMygtukasDiv">
        <div className="RemoveMygtukas" data-task-id={indeksas} onClick={RemoveTask}>Remove</div>
      </div>
      </div>
      </div>
    </div>
  );
  const length = container.map(element => element).length;
  if(length === 0)
  {
    container = <div className="NoTodosButton">No todos</div>;
  }
    ReactDOM.render(container, document.getElementById("Tasks"));
}
function App() {
  if(localStorage.getItem("date"))
  {
    const saved1 = localStorage.getItem("date");
    const initialValue1 = JSON.parse(saved1);
    date = initialValue1;
  }
  if(localStorage.getItem("tasks"))
  {
    const saved2 = localStorage.getItem("tasks");
    const initialValue2 = JSON.parse(saved2);
    tasks = initialValue2;
  }
  if(localStorage.getItem("status"))
  {
    const saved2 = localStorage.getItem("status");
    const initialValue2 = JSON.parse(saved2);
    status = initialValue2;
  }
  return (
    <div className="App">
      <CreateTask />
      <div className="App-header">
        <div className="Text1">TODO LIST</div>
        <div className="ToDoListTable">
          <div className="InOneLineTaskButtons">
            <div className="InOneLineTaskButtonsSide1">
              <div onClick={() => DisplayCreateTask("flex")} className="addTask">Add task</div>
            </div>
            <div className="InOneLineTaskButtonsSide2">
            <div onChange={isrikiavimas} className="custom-select">
              <select className="SelectionCustom">
                <option className="custom-select-option" value="0">All</option>
                <option className="custom-select-option" value="1">Incomplete</option>
                <option className="custom-select-option" value="2">Completed</option>
              </select>
            </div>
          </div>
        </div>
        <div className="TasksDivs">
          <div id="Tasks" className="Tasks">
            <LoadTasks />
          </div>
        </div>
        <div className="TextFooter">Made by Nojus Petrauskas</div>
        <div className="TextFooter">with React</div>
        </div>
      </div>
    </div>
  );
}

export default App;
