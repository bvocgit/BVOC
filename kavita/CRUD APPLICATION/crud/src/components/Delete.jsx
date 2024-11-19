import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Delete = ()=>{

   const [Id,setId] = useState(null);
   const getUpdatedData = useOutletContext();
   const deleteRecord = async (event) => {
      event.preventDefault();
      try {
         const response = await axios.delete("http://localhost:5013/Delete", {
            params:{Id}  // This sends Id as a query parameter
         });
         if(response.statusText==="OK" && response.data.affectedRows===0){
            alert("Record not found");
         }
         else{
            alert("Record Deleted Successfully!!!");
            getUpdatedData();
         }
      } catch (error) {
         console.error('Error deleting data:', error);
         alert("Record not found");
      }
   }
   

   return(
      <div className="edit-form-container">
         <h1>Delete</h1>
         <form className="form" onSubmit={deleteRecord}>
            <div className="field">
               <div className="input-container">
                     <label for="roll" >Roll No:</label>
                     <input type="number" id="roll" name="rollno" onChange={(e)=>{setId(e.target.value)}}required/>
               </div>
           
            </div>
            <button type="submit" className="form-btn">Submit</button>
         </form>   
      </div>
   )
}
export default Delete;