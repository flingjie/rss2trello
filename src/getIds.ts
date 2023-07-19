import TrelloNodeAPI  from 'trello-node-api';
import * as dotenv from 'dotenv';
dotenv.config();

const Trello = new TrelloNodeAPI();
Trello.setApiKey(process.env.API_KEY as string);
Trello.setOauthToken(process.env.TOKEN as string);

const BOARD_ID = process.env.BOARD_ID as string


async function getIds() {
    let response;
    try {
        response = await Trello.board.searchLists(BOARD_ID)
    } catch (error) {
        console.log('error: ', error);
    }
    console.log('response:', response);
}


(async () => {
    await getIds();
  })();
