const { answerCall } = require('../lib/answer')
const { feedbackCall }=require('../lib/feedback')
let {returnConn}=require('../db/db_init')

async function chat(uid, descript) {
    try {
		// 유저의 질문을 DB에 저장
        const conn = await returnConn();
        const userChat = "INSERT INTO chat(uid, descript, chat_time, speaker) VALUES (?, ?, now(), ?)";
        var chat_id = await conn.query(userChat, [uid, descript, 1])

		// GPT의 답변을 DB에 저장
		var answer = await answerCall(descript)
		console.log(`answer in chat.js: `, answer)
		const GPTChat = "INSERT INTO chat(uid, descript, chat_time, speaker) VALUES (?, ?, now(), ?)";
		await conn.query(GPTChat, [uid, answer, 0])

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

async function main(uid, last_chat) {
	try {
		// 유저의 채팅 기록 받기
		const conn = await returnConn();
		var chatList
		var last_chat_id
		if (last_chat == -1) {
			const chat = "select * from chat left join feedback on chat_id=p_id where uid=? order by chat_id desc limit 10;";
			var result = await conn.query(chat, [uid])
			chatList = result[0]
		} else {
			const chat = "select * from chat left join feedback on chat_id=p_id where uid=? and chat_id<? order by chat_id desc limit 10;";
			var result = await conn.query(chat, [uid, last_chat])
			chatList = result[0]
		}
		await conn.end()
		if (chatList.length < 10) {
			last_chat_id = -2
		} else {
			last_chat_id = chatList[chatList.length-1].chat_id
		}

        return { success: true, message: "Registration successful", chatList: chatList, last_chat: last_chat_id };
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, message: "Registration failed", error: error.message };
    }
}

module.exports={
    chat, main
}