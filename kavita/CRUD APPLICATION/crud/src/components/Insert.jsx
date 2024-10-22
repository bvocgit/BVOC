import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
const Insert = ()=>{
   const [Id,setId] = useState(null);
   const [Name,setName] = useState("");
   const [Department,setDepartment] = useState("");

   const [Errors,setErrors] = useState({
      Id:"",
      Name:"",
      Department:""
   })

   const getUpdatedData = useOutletContext();
   console.log(getUpdatedData);

   const validate = ()=>{
      let valid = true;
      const newErrors = {
         Id:"",
         Name:"",
         Department:""
      };
      if (!Id || Id <= 0){
         newErrors.Id = true;
         valid=false;
      }
      const Pattern = /^[A-Za-z\s]{2,40}$/;
      if(!Pattern.test(Name)){
         newErrors.Name = true;
         valid = false;
      }
      if(!Pattern.test(Department)){
         newErrors.Department = true;
         valid=false;
      }
      setErrors(newErrors);
      return valid;
   }
   const insertRecord = async (event)=>{
      event.preventDefault();
      if(validate()){
         try {
            const response = await axios.post("http://localhost:5013/Insert",{Id,Name,Department});
            if(response.statusText === "OK"){
               alert("Record Inserted Successfully");
               getUpdatedData();
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      }
   }
   return(
      <div className="edit-form-container">
         <h1>Insert</h1>
         <form action="" method="post" className="form" onSubmit={insertRecord}>
            <div className="field">
                  <div className="input-container">
                     <label for="roll" >Roll No:</label>
                     <input type="number" id="roll" name="rollno" onChange={(e)=>{setId(e.target.value)}} required/>
                  </div>
                  {(Errors.Id)?<p className="invalid-input">Please enter a valid id</p>:null}
            </div>
            <div className="field">
                 <div className="input-container">
                     <label for="name" >Name:</label>
                     <input type="text" id="name" name="name" onChange={(e)=>{setName(e.target.value)}}required/>
                 </div>
                  {Errors.Name?<p className="invalid-input">Name should contain only alphabets and spaces</p>:null}
            </div>
            <div className="field">
                  <div className="input-container">
                        <label for="department" >Department:</label>
                        <input type="text" id="department" name="department" onChange={(e)=>{setDepartment(e.target.value)}} required/>
                  </div>
                  {Errors.Department?<p className="invalid-input">Department should contain only alphabets and spaces</p>:null}
            </div>
            <button type="submit" className="form-btn">Submit</button>
         </form>   
      </div>
   )
}
export default Insert;