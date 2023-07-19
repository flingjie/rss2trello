
import TrelloNodeAPI  from 'trello-node-api';
import Parser from 'rss-parser';
import * as dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();


const Trello = new TrelloNodeAPI();
Trello.setApiKey(process.env.API_KEY as string);
Trello.setOauthToken(process.env.TOKEN as string);
const parser = new Parser();

  
const LIST_ID = process.env.LIST_ID as string


async function createCard(name:string, desc: string) {
    let data = {
        name: name,
        desc: desc,
        pos: 'top',
        idList: LIST_ID,
        due: null,
        dueComplete: false
    };
    let response;
    try {
        response = await Trello.card.create(data);
    } catch (error) {
        console.log('error: ', error);
    }
    console.log('response:', response);
}


async function main() {
    console.log("fetch rss ...")
    const feed = await parser.parseURL('https://news.ycombinator.com/rss');
    console.log(feed.title); 
    
    for(const item of feed.items){
        console.log(item.title + ':' + item.link)
        await createCard(item.title as string, item.link as string)
    };
}

cron.schedule('* * * * *', main);
