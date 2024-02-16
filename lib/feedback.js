//gpt_api.js
const { Configuration, OpenAIApi } = require("openai"); 
//const readlineSync = require("readline-sync"); 
const config=require("../config/config") 

// console.log(config.OPENAI_SECRET_KEY)
const newConfig = new Configuration({ 
	apiKey: config.OPENAI_SECRET_KEY 
});
const openai = new OpenAIApi(newConfig);

const feedbackHistory = [];

feedbackHistory.push([
`당신은 영어 회화를 가르치는 강사입니다. 강사처럼 행동하고 얘기하세요.

제가 지금부터 영어로 말하면, 제가 한 말의 영어 표현들이 문법이나 뉘앙스가 적절한지에 대한 피드백을 한국어로 해주요.`, 
`물론이죠. 영어로 얘기해 보세요. 저는 한국어로 피드백을 드릴게요.`])

async function feedbackCall(question){
	question += `
한국어로 피드백해주세요.`
	//const user_input = readlineSync.question("Enter your input: "); 
	const messageList = feedbackHistory.map(([input_text, completion_text]) => ({ 
		role: "user" === input_text ? "ChatGPT" : "user", 
		content: input_text 
	})); 
	messageList.push({ role: "user", content: question }); 

	try { 
		const GPTOutput = await openai.createChatCompletion({ 
			model: "gpt-3.5-turbo-0125",
			messages: messageList, 
		}); 

		const output_text = GPTOutput.data.choices[0].message.content; 
		console.log("feedback in feedback.js: ", output_text); 

		feedbackHistory.push([question, output_text]);	// 사용자의 질문: question, GPT의 답변: output_text
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
	feedbackCall
}