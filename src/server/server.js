const fetch = require('node-fetch');

const API_KEY = '6a6c40d74c582ee954ad118ee19303013fae6d00164378d2368485a2';


app.post('/api/analyze', async (req, res) => {
    const { url } = req.body;
    
    try {
       
        const scrapedText = await getTextFromUrl(url);  
        
        const response = await fetch('https://api.textrazor.com', {
            method: 'POST',
            headers: {
                'x-textrazor-key': API_KEY,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `extractors=entities,topics,summary&text=${encodeURIComponent(scrapedText)}`
        });
        
        const data = await response.json();
        
        if (data.response && data.response.entities) {
            const entities = data.response.entities.map(entity => entity.entityId).join(', ');
            res.send({
                sentiment: 'positive', 
                contentType: 'subjective',  
                entities: entities
            });
        } else {
            res.status(500).send('Error: Could not analyze the text.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: Unable to process the request.');
    }
});
