const { Configuration, OpenAIApi } = require("openai"); 
const config=require("../config/config") 

const newConfig = new Configuration({ 
	apiKey: config.OPENAI_SECRET_KEY 
});
const openai = new OpenAIApi(newConfig); 
	
const chatHistory = [];

chatHistory.push([
`당신은 영어 회화를 가르치는 강사입니다. 강사처럼 행동하고 얘기하세요.

제가 지금부터 영어로 말하면, 그 말에 대한 대답을 영어로 하세요.`, 
`Of course, I'll be happy to engage in English conversation with you. What would you like to talk about today?`])

async function answerCall(question){
	const messageList = chatHistory.map(([input_text, completion_text]) => ({ 
		role: "user" === input_text ? "ChatGPT" : "user", 
		content: input_text 
	})); 
	messageList.push({ role: "user", content: question }); 

	try { 
		const GPTOutput = await openai.createChatCompletion({ 
			model: "gpt-3.5-turbo", 
			messages: messageList, 
		}); 

		const output_text = GPTOutput.data.choices[0].message.content; 
		console.log("answer in answer.js: ", output_text); 

		chatHistory.push([question, output_text]);	// 사용자의 질문: question, GPT의 피드백: output_text
		return output_text
	} catch (err) { 
		if (err.response) {
			console.log(err.response.status); 
			console.log(err.response.data); 
			return {
				status: err.reponse.status,
				data: err.response.data
			}
		} else {
			console.log(err.message); 
			return err.message
		} 
	} 
}; 

module.exports={
	answerCall
}