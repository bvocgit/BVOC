import "../styles/Table.css";
const Table = (prop)=>{
   const {allrecords} = prop;
   return(
      <div className="table">
         <h1 className="heading">Table</h1>
           <div className="table-container">
               <table className="table-tag">
                     <thead>
                        <tr className="table-row">
                           <th className="table-headers">ID</th>
                           <th className="table-headers">Name</th>
                           <th className="table-headers">Department</th>
                        </tr>
                     </thead>
                     <tbody>
                              {
                              allrecords.map((record)=>{
                              return (
                                    <tr className="table-row">
                                       <td className="table-data">{record.Id}</td>
                                       <td className="table-data">{record.Name}</td>
                                       <td className="table-data">{record.Department}</td>
                                    </tr>
                                 )
                              })
                              }
                     </tbody>
                  </table>
           </div>
      </div>
   )
}
export default Table;