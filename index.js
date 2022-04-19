const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: fs.readFileSync('./api_key.txt', 'utf8').trim()
});

const openai = new OpenAIApi(configuration);
rl.question("What do you want to ask the ai? ", async (answer) => {
	const response = await openai.createCompletion("text-davinci-002",{
		prompt: answer,
		temperature: .5,
		max_tokens: 1000,	
	});
	for (let res of response?.data?.choices){
		console.log(res.text);
	}
	rl.close()
});
