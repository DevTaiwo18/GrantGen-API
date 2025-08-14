const express = require('express');
const router = express.Router();
const geminiClient = require('../utils/openaiClient');

router.post('/generate-proposal', async (req, res) => {
    const { organization, mission, goal, amount } = req.body;

    if (!organization || !mission || !goal || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const prompt = `
You are a professional grant writer. Write a compelling proposal for an organization with the following:
- Organization Name: ${organization}
- Mission: ${mission}
- Goal of this Grant: ${goal}
- Amount Requested: ${amount}

The proposal should be professional, persuasive, and 1–2 paragraphs long.
    `;

        const proposalText = await geminiClient(prompt);
        res.json({ proposal: proposalText });
    } catch (err) {
        console.error('Proposal generation error:', err.message);
        res.status(500).json({ error: 'Failed to generate proposal' });
    }
});

module.exports = router;
