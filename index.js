const axios = require("axios")
require('dotenv').config();

const { NOTION_API_KEY, NOTION_DATABASE_ID, TELEGRAM_BOT_TOKEN } = process.env;

async function fetchNotionData(){
    const config = {
        headers:{
            'Authorization': `Bearer ${NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28'

        }
    };
try {
    const response = await axios.post(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {}, config);
return response.data.results;
} catch (error) {
    console.log('Error fetching Notion Data:', error);
}
}

