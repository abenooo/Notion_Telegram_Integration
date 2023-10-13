# oLab_Notion_Telegram_Integration
# Overview
This Node.js application integrates a Notion database with Telegram. It fetches data from specified columns in a Notion database and sends them to different Telegram groups.

#vPrerequisites
Node.js and npm installed
Notion API key
Notion database ID
Telegram Bot Token
Telegram Chat IDs for different groups
Setup and Installation
Clone the Repository

# bash
git clone https://your-repository-link-here.git
Navigate to Project Directory

# bash
cd notion-telegram-integration
Install Dependencies

# bash
npm install
Environment Variables

# Create a .env file in the root directory.
Add your Notion API key, Notion database ID, and Telegram Bot Token.
makefile
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_notion_database_id_here
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
Usage
Run the Application
bash
Copy code
node notion-telegram-integration.js
This will fetch the data from the Notion database and send it to the respective Telegram groups based on the teams.

# Contributing
Feel free to fork the project and submit a pull request with your changes!

# License
MIT License

