import { OpenAI } from "langchain/llms/openai";


const getResposne = async (message: string) => {
    const api_key = import.meta.env.VITE_OPENAI_API_KEY

    const model = new OpenAI({ openAIApiKey: api_key, temperature: 0.9 })

    const res = await model.call(message)
    return res
};

export default getResposne