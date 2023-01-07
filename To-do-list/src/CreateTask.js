import './CreateTask.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AddTask, DisplayCreateTask } from './App';

function CreateTask(){
    return(
    <div className="VisasCreateTask">
        <div className="VisasCreateTaskLangas">
            <div className="CreateTaskText">Add TODO</div>
                <div className="InputWidth">
                <div className="CreateTaskText2">Title</div>
                <input className="TaskInput1"></input>
                <div className="CreateTaskText2">Status</div>
                <select className="TaskSelectionCustom">
                <option className="Task-custom-select-option" value="1">Incomplete</option>
                <option className="Task-custom-select-option" value="2">Completed</option>
              </select>
            </div>
            <div className="Buttons">
                <div onClick={() => {if(document.querySelector(".TaskInput1").value !== ""){DisplayCreateTask("none");AddTask(document.querySelector(".TaskInput1").value);const input = document.querySelector(".TaskInput1");input.value ="";}
            else{
                window.alert("Type title of todo");
            }}} className="CreateButton">Create</div>
                <div onClick={() => {const input = document.querySelector(".TaskInput1");input.value ="";DisplayCreateTask("none");}} className="CancelButton">Cancel</div>
            </div>
        </div>
    </div>);
}
export default CreateTask;