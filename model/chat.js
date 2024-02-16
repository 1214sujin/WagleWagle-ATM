const gpt_api=require('../lib/GPTAPI')
let {returnConn}=require('../db/db_init')

async function chat(uid, descript) {
    try {
		// 유저의 질문을 DB에 저장
        const conn = await returnConn();
        const userChat = "INSERT INTO chat(uid, descript, chat_time, speaker) VALUES (?, ?, now(), ?)";
        await conn.query(userChat, [uid, descript, 1]);
        await conn.execute

		// GPT의 답변을 DB에 저장
		var answer = gpt_api.APIcall(descript)
		const GPTChat = "INSERT INTO chat(uid, descript, chat_time, speaker) VALUES (?, ?, now(), ?)";
		await conn.query(GPTChat, [uid, answer, 0]);
        await conn.execute
        await conn.end()

		console.log(`GPT's answer: `, answer)
        return { success: true, message: "Registration successful", answer: answer };
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, message: "Registration failed", error: error.message };
    }
}

module.exports={
    chat
}