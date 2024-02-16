//gpt_api.js
const { Configuration, OpenAIApi } = require("openai"); 
//const readlineSync = require("readline-sync"); 
const config=require("../config/config") 

// console.log(config.OPENAI_SECRET_KEY)
const newConfig = new Configuration({ 
	apiKey: config.OPENAI_SECRET_KEY 
});
const openai = new OpenAIApi(newConfig); 
	
const chatHistory = [];

chatHistory.push([
`당신은 지금부터 영어를 가르치는 회화강사입니다. 강사처럼 행동하고 얘기하세요.

제가 지금부터 영어로 말하면,
제가 한 말의 영어 표현들이 적절한지에 대한 피드백을 한국어로만 하세요.`, 
`물론입니다. 당신이 영어로 말하면, 저는 그것을 듣고 한국어로 피드백을 제공할게요. 시작해보세요.`])

async function APIcall(question){ 
	//const user_input = readlineSync.question("Enter your input: "); 
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
		// console.log(output_text); 

		chatHistory.push([question, output_text]);	// 사용자의 질문: question, GPT의 답변: output_text
		return output_text
	} catch (err) { 
		if (err.response) { 
			return {
				status: err.reponse.status,
				data: err.response.data
			}
			// console.log(err.response.status); 
			// console.log(err.response.data); 
		} else { 
			return err.message
			// console.log(err.message); 
		} 
	} 
}; 

module.exports={
	APIcall
}