const {GoogleGenerativeAI} = require('@google/generative-ai');

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = model;