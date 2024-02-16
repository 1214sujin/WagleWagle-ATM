let {returnConn}=require('../db/db_init')

async function getChatLog(){
    try {
        const conn = await returnConn();
        const query = "SELECT descript, chat_time, speaker FROM chat WHERE chat_id=?";
        //console.log(id,pw)
        const [rows] = await conn.execute(query, [id]); // Execute the query and fetch the result
    }catch(error){

    }
}

async function insertChatLog(c_id,uid,descript,chat_time,speaker){
    try {
        const conn = await returnConn();
        const query = "INSERT INTO (chat_id,uid,descript,chat_time,speaker) VALUES(?,?,?,?,?)";
        conn.execute(query, [c_id,uid,descript,chat_time,speaker]); // Execute the query and fetch the result
    }catch(error){

    }
}

module.exports={
    getChatLog,insertChatLog
}