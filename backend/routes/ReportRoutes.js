import express from 'express';
import multer from 'multer';

import language from  '@google-cloud/language';
const client = new language.LanguageServiceClient();

const router = express.Router();



const storage = multer.memoryStorage();
const upload = multer({ storage: storage ,   limits: { fileSize: 20971520 } });

router.post('/' , upload.single("file") ,  async(req , res) => {
    const file = req.file;
    try {
        const content = file.buffer.toString();
        const [sentimentResult] = await client.analyzeSentiment({
            document: {
                content: content,
                type: 'PLAIN_TEXT',
            },
        });
        const sentiment = sentimentResult.documentSentiment;
        console.log('Sentiment:', sentiment);
        res.status(200).json({
            message: 'Sentiment analysis successful',
            sentiment: sentiment,
        });

    } catch (err) {
        console.error('ERROR:', err);
    res.status(500).json({
      message: 'Something went wrong',
      error: err,
      errmsg: err.toString(),
    });
    }
})

export default router;



