const config = require('../config/config');
const { Configuration, OpenAIApi } = require("openai");

const magicSpell = "넌 영어선생님이야 지금부터 내가 보내는 영어 문장에 대해 문맥에 맞게 답변을 하고 내가 보낸 문장이 맥락상 맞는지, 문법 어휘가 맞는지 확인해서 한글로 대답해줘";

const configuration = new Configuration({
    apiKey: config.OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to initialize the chat with the magicSpell
async function init() {
    try {
        await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: magicSpell }],
        });
    } catch (error) {
        console.log("Error initializing ChatGPT: ", error);
    }
}

// Function to call ChatGPT with a user prompt
async function callChatGPT(prompt) {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        return response.data.choices[0].message;
    } catch (error) {
        console.log("Error calling ChatGPT: ", error);
        return null;
    }
}

// Initialize the chat with magicSpell
init();
setTimeout(()=>{
    callChatGPT("hello how's it going?").then((res) => console.log(res));
    
},3000)
// Call ChatGPT with a user prompt after the initialization
