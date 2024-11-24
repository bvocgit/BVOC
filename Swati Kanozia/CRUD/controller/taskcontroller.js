const db = require("../database");
const createTask = async(req, res)=>{
    let conn;
    try{
        conn = await db.getConnection();
        const {task_name,is_done} = req.body;
        Console.log(req.body);
        const query = "INSERT INTO task (task_name, is_done) VALUES (?,?)";
        const[result] = await conn.execute(query,[task_name,is_done]);
        console.log(result.insertId);
        res.status(201).json({data: 'tasks created'});
    }catch(err){
        console.log("failed to create task");
        res.status(500).json({error: "failed to create task"});


}finally{
    //release databse connection
    conn.release();
}

}

const fetchAllTasks = (req,res)=>{
    res.send('seccess fetch all task');

}

const fetchTaskById = (req,res)=>{
    
}

const updateTaskById = (req,res)=>{
    
}

const deleteTaskById = (req,res)=>{
    
}

module.exports = {
    createTask,
    fetchAllTasks,
    fetchTaskById,
    updateTaskById,
    deleteTaskById
}