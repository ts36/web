// pages/index.js
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsLoading(true);
    setAnswer('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer('抱歉，出現了一些錯誤。請稍後再試。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-4"
        >
          {/* 可愛的機器人圖像 */}
          <img src="/robot.png" alt="Cute Robot" className="w-24 h-24" />
        </motion.div>
        <h1 className="text-2xl text-center mb-4">問我任何問題！🤖</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="請輸入你的問題..."
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
          >
            送出
          </button>
        </form>
        <div className="mt-4 min-h-[50px]">
          {isLoading ? (
            <p className="text-gray-500">ChatGPT 正在回答...</p>
          ) : (
            <p className="text-gray-700">{answer}</p>
          )}
        </div>
      </div>
    </div>
  );
}
