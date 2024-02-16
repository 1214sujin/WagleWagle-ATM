const { answerCall } = require('../lib/answer')
const { feedbackCall }=require('../lib/feedback')
let {returnConn}=require('../db/db_init')

async function chat(uid, descript) {
    try {
		// 유저의 질문을 DB에 저장
        const conn = await returnConn();
        const userChat = "INSERT INTO chat(uid, descript, chat_time, speaker) VALUES (?, ?, now(), ?)";
        await conn.query(userChat, [uid, descript, 1])

		// // GPT의 답변을 DB에 저장
		var answer = await answerCall(descript)
		console.log(`answer in chat.js: `, answer)
		const GPTChat = "INSERT INTO chat(uid, descript, chat_time, speaker) VALUES (?, ?, now(), ?)";
		var chat_id = await conn.query(GPTChat, [uid, answer, 0])

		// GPT의 피드백을 DB에 저장
		var feedback = await feedbackCall(descript)
		console.log(`feedback in chat.js: `, feedback)
		const GPTFeedback = "INSERT INTO feedback(descript, p_id) VALUES (?, ?)";
		await conn.query(GPTFeedback, [feedback, chat_id])
        await conn.end()

        return { success: true, message: "Registration successful", answer: answer, feedback: feedback };
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, message: "Registration failed", error: error.message };
    }
}

module.exports={
    chat
}