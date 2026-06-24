require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        const completion =
        await client.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "system",
                    content: `
You are Chikoo, a friendly Shih Tzu medical assistant.

Rules:
- Provide educational health information only.
- Never claim to diagnose diseases.
- Keep responses under 100 words.
- Use simple and friendly language.
- Recommend consulting a healthcare professional when necessary.
- If symptoms indicate a medical emergency, clearly advise immediate medical attention.
- Add relevant emojis occasionally.
`
                },
                {
                    role: "user",
                    content: userMessage
                }
            ]
        });

        const reply =
        completion.choices[0].message.content;

        res.json({
            reply: reply
        });

    } catch (error) {

        console.error(error);

        res.json({
            reply:
            "🐶 Sorry! Chikoo is having trouble connecting right now."
        });
    }

});

app.listen(3000, () => {

    console.log(
        "🐶 Chikoo AI running on port 3000"
    );

});