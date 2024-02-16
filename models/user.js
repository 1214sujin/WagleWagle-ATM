let {returnConn}=require('../db/db_init')

async function register(id, pw, name) {
    try {
        const conn = await returnConn();
        const query = "INSERT INTO users(id, pw) VALUES (?, ?)";
        await conn.query(query, [id, pw]);
        await conn.end(); // 작업이 완료된 후 연결을 닫아주는 것이 좋습니다.
        return { success: true, message: "Registration successful" };
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, message: "Registration failed", error: error.message };
    }
}

async function login(id, pw) {
    try {
        const conn = await returnConn();
        const query = "SELECT pw FROM users WHERE id=?";
        //console.log(id,pw)
        const [rows] = await conn.execute(query, [id]); // Execute the query and fetch the result

        if (rows.length > 0) {
            const returnPw = rows[0].pw;

            // 비밀번호 검증
            if (pw === returnPw) {
                return { success: true, message: "Login successful" };
            } else {
                return { success: false, message: "Incorrect password" };
            }
        } else {
            return { success: false, message: "User not found" };
        }
    } catch (error) {
        console.error('Error during Login:', error);
        return { success: false, message: "Login failed", error: error.message };
    }
}

module.exports={
    register,login
}