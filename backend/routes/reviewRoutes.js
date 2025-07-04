const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const geminiModel = require('../config/gemini');
const expressAsyncHandler = require('express-async-handler');

const router = express.Router();

router.post('/', protect, expressAsyncHandler(async (req, res) => {
    const { code, language } = req.body;
    if (!code) {
        return res.status(400).json({ message: 'Code is required for review' });
    }

    const prompt = `You are an expert code reviewer. Analyze the following ${language || 'programming'} code for quality, readability, and best practices. Provide clear, constructive feedback in a structured format that is easy to display on a frontend UI.
    Your response must follow this format using Markdown:
    ### 📝 Code Review Summary
    - Provide a brief overview of the code's purpose (if detectable).
    - Mention any general observations (e.g., clean structure, poor naming, potential bugs, etc.).

    ### 📊 Code Quality Rating
    - Rate the code out of 10 based on readability, maintainability, efficiency, and style.

    ### 🚨 Issues & Suggestions
    - List key issues or areas of improvement in bullet points.
    - Provide **brief, inline code snippets** (in \`\`\`language\`\`\` blocks) where appropriate.
    - Explain **why** each suggestion matters.

    ### ✅ Recommended Improvements
    - Summarize final recommendations for refactoring or best practices.
    - End with any optional tips for better development habits or standards.

    ### 🧠 Additional Notes (Optional)
    - If applicable, mention potential improvements in performance, security, or design patterns.

    Review the following code:
    \`\`\`${language || ''}
    ${code}
    \`\`\`
    `;

    try {
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ review: text });
    } catch (error) {
        console.error('Failed to generate code review:', error);
        res.status(500).json({ message: 'Failed to generate code review. Please try again later.', error: error.message });
    }
}));

module.exports = router;



