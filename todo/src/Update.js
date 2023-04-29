import {React,useEffect,useState} from "react";
import Axios from 'axios';
const Update = (props) => {
    // console.log("PPPPPP: ", props)
    const [updateName, setUpdateName] = useState("");
    const [updateDesp, setUpdateDesp] = useState("");
    const [updateDate, setUpdateDate] = useState("");




    const handleupdate = async (id) => {
     if(updateName.length==0 || updateDesp.length==0){
        alert("Please fill the required field!!");
        
     }
     else { 
     let response=await  Axios.put("https://todo-backend-q9z8.onrender.com/UpdatedName", {
        UpdatedName: updateName,
        id: id,
        UpdatedDesp: updateDesp,
        UpdatedDate: updateDate,
      });
    props.setitem([...props.item]);
    

    } 
    };
  //  console.log(itemId);
    return (
      <>
        <div className="model-wrapper">
          <div className="model-container">
            <p>Update...</p>
            <div className="main-model">
              <input
                type="text"
                onChange={(e) => setUpdateName(e.target.value)}
                placeholder="Update Task's Name" required
              />
              <input
                type="text"
                onChange={(e) => setUpdateDesp(e.target.value)}
                placeholder="Update Description✍️" required
              />
              <input
                type="date"
                onChange={(e) => setUpdateDate(e.target.value)}
              />
            </div>
            <div className="model-btn-div">
              <button
                className="model-btn"
                onClick={() => {
                  handleupdate(props.number);
                  props.setmodel(false);
                }}
              >
                Save
              </button>
              <button className="model-btn" onClick={() =>props.setmodel(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default Update;