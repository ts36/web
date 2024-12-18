// pages/api/chat.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: '僅支持 POST 請求' });
    return;
  }

  const { question } = req.body;
  if (!question) {
    res.status(400).json({ error: '請提供問題' });
    return;
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4', // 或 'gpt-3.5-turbo' 根據你的 API 訂閱
      messages: [{ role: 'user', content: question }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const answer = response.data.choices[0].message.content.trim();
    res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '伺服器錯誤' });
  }
}
