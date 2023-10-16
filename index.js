const axios = require("axios");
require("dotenv").config();

// Require Notion SDK
const { Client } = require('@notionhq/client');

// Initialize client
const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

// Page IDs (replace with actual IDs)
const EAGLE_TEAM_PAGE_ID = 'afa9d18b4c724b29bd3532b3045c0f9e';
const LION_TEAM_PAGE_ID = '33c665bf5e504ffaa4335b31b0eb3ba5';
const DESIGN_HUDDLE_PAGE_ID = '136363ed304245c8be2d56ffdbb189f9';
const ALL_HANDS_PAGE_ID = '6061f5f4a87540b4aad86a740c5fd2fc&pvs=12';

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
    // Get page with tables
    const page = response.results.find(p => p.id === 'a3422e5054c34ed695c2d272524bc888');
 const data = getTableData(page);
 console.log("new page" + data)
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
// Helper to get table data from page
function getTableData(page) {

  const tableData = [];

  if (!page || !page.children) {
    return tableData;
  }

  page.children.forEach(table => {

    const rows = table.table_rows;

    rows.forEach(row => {
      const rowData = {};

      row.cells.forEach(cell => {
        const column = cell.table_cell.title[0]?.plain_text;
        const value = cell.table_cell.rich_text[0]?.plain_text;

        rowData[column] = value;
      });

      tableData.push(rowData);

    });

  });

  return tableData;

}

// Invoke getData()
getData()
  .then(res => console.table(res))
  .catch(err => console.error(err));
