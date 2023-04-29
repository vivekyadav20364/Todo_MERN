import React, { useEffect, useState } from "react";
import "./index.css";
import Update from "./Update";
import Axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

const App = () => {
  const [inputlist, setinputlist] = useState();
  const [Items, setItems] = useState([]);
  const [task, setTask] = useState();
  const [date, setdate] = useState();
  const [itemId, setItemId] = useState();

  //updated hooks

  const [Model, setModel] = useState(false);

  const getdata = async () => {
    let response = await Axios.get("https://todo-backend-q9z8.onrender.com/givenData");
   // console.log(response);
    setItems(response.data);
  };

  useEffect(() => {
    getdata();
  },[]);

  const itemEvent = (event) => {
    setinputlist(event.target.value);
  };

  const handledelete = async (id) => {
    let response = await Axios.delete(`https://todo-backend-q9z8.onrender.com/Delete/${id}`);
   // console.log(id);
    setItems(
      Items.filter((val)=>val._id!==id)
    )
  };

  const handlersubmit = async (e) => {
    e.preventDefault();
   
    let response = await Axios.post("https://todo-backend-q9z8.onrender.com/givenData", {
      Data: inputlist,
      Desp: task,
      Date: date,
    });
    setItems([...Items, response.data]);
  };

  return (
    <>
      <div className="main-container">
        <div className="div-centre">
          <h1 className="heading">ToDo App</h1>
          <form onSubmit={handlersubmit}>
            <div className="input-cont">
              <div className="handleinput">
                <input
                  type="text"
                  onChange={itemEvent}
                  placeholder="Task's Name" value={inputlist}
                  required
                />
                <input
                  type="text"
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Description✍️" value={task}
                  required 
                />
                <input type="date" onChange={(e) => setdate(e.target.value)} />
              </div>
              <div className="btn-div">
                <button className="btn" type="submit">
                  +
                </button>
              </div>
            </div>
          </form>

          <p className="task">Tasks</p>

          {Items.map((Itemsval, index) => {
            return (
              <div className="todo_style" key={index}>
                <div className="todo">
                  <h2>{Itemsval.title}</h2>
                  <p>{Itemsval.Date}</p>
                </div>
                <h3>{Itemsval.Desp}</h3>
                <div className="div-btn">
                  <button
                    onClick={() => {
                      setModel(true);
                      setItemId(Itemsval._id);
                    }}
                  >
                    <EditNoteIcon />
                  </button>
                  <button onClick={() => handledelete(Itemsval._id)}>
                    <DeleteIcon />
                  </button>
                </div>
                {Model && <Update setitem={setItems} item={Items} setmodel={setModel} number={itemId} />}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default App;
