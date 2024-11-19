import "../styles/Edit.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Edit = (prop)=>{
   const {getUpdatedData} = prop;
   console.log(getUpdatedData);
   return(
      <div className="edit">
         <div className="nav-container">
            <nav id="nav-bar">
               <Link className="edit-btn" to="/Insert">Insert</Link>
               <Link className="edit-btn" to="/Delete">Delete</Link>
               <Link className="edit-btn" to="/Update">Update</Link>
            </nav>
         </div>
         <div className="my-form-container">
               <Outlet context={getUpdatedData}/>
         </div>
      </div>
   )
}
export default Edit;