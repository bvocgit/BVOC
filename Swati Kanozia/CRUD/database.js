const mysql = require('mysql2/promise');

class Database{
    constructor(){
        if(!Database.instance){
            this.pool = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: 'swatiika9899',
                database: 'task'
            });
            Database.instance = this;
        }

    }
    async getConnection() {
            try{
                return await this.pool.getConnection();

            }catch(err){
                console.log('error while getting connection', err);
                throw err;
           
         }
    }
}
module.exports = new Database();