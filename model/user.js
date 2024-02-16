let {returnConn}=require('../db/db_init')

async function register(id, pw, name) {
    try {
        const conn = await returnConn();
        const insertQuery = "INSERT INTO member(id, pw, name) VALUES (?, ?, ?)";
        await conn.query(insertQuery, [id, pw, name]);
        await conn.execute
        await conn.end(); // 작업이 완료된 후 연결을 닫아주는 것이 좋습니다.
        return { success: true, message: "Registration successful" };
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, message: "Registration failed", error: error.message };
    }
}

async function login(id,pw){ // 실시간 응답 필요
    const loginQuery="SELECT pw FROM WHERE id=?"
}

module.exports={
    register
}