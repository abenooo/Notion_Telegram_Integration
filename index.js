const axios = require("axios");
require("dotenv").config();

// Require Notion SDK
const { Client } = require('@notionhq/client');

// Initialize client
const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

// Page IDs (replace with actual IDs)
const EAGLE_TEAM_PAGE_ID = 'actual_id_here'; 
const LION_TEAM_PAGE_ID = 'actual_id_here';
const DESIGN_HUDDLE_PAGE_ID = 'actual_id_here';
const ALL_HANDS_PAGE_ID = 'actual_id_here';

// Async function to get data
async function getData() {
  try {
    // Query database
    const response = await notion.databases.query({
      database_id: '821267a871d242c4b52086517f84b869'
    });

    if (!response || !response.results) {
      throw new Error('Failed to get data from Notion');
    }

    // Get pages
    const eagleTeamPage = response.results.find(p => p.id === EAGLE_TEAM_PAGE_ID);
    const lionTeamPage = response.results.find(p => p.id === LION_TEAM_PAGE_ID);
    const designHuddlePage = response.results.find(p => p.id === DESIGN_HUDDLE_PAGE_ID);
    const allHandsPage = response.results.find(p => p.id === ALL_HANDS_PAGE_ID);

    // Get table data from each page
    const eagleTeamData = getTableData(eagleTeamPage);
    const lionTeamData = getTableData(lionTeamPage);
    const designHuddleData = getTableData(designHuddlePage);
    const allHandsData = getTableData(allHandsPage);

    // Return combined data
    return [
      {
        name: 'Eagle Team',
        data: eagleTeamData
      },
      {
        name: 'Lion Team',
        data: lionTeamData
      },
      {
        name: 'Design Huddle',
        data: designHuddleData
      },
      {
        name: 'All Hands',
        data: allHandsData
      }
    ];

  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}

// Helper to get table data from page
function getTableData(page) {
  // TODO: Fetch the table data based on the page object
  return 'Your table data here';
}

// Invoke getData()
getData()
  .then(res => console.table(res))
  .catch(err => console.error(err));
