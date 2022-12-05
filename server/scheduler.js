import cron from "node-cron";

import { addTeam, getTeam, addPlayer, getPlayer } from "./database.js";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import moment from "moment";
const app = express();
app.use(express.json());
app.use(cors());

const scheduledLiveGames = [];

let ingestGameDetails = (pk) => {
  console.log(pk);
};

const watchGameStatus = async () => {
  // this route send an upcoming match date and time
  const scheduleApi = "https://statsapi.web.nhl.com/api/v1/schedule";
  const response = await fetch(scheduleApi);
  const json = await response.json();
  const [teams] = json.dates;
  const games = teams.games;
  games.map((game) => {
    const isLive = moment(game.gameDate).isBefore(moment.now());
    const isScheduledInCron = scheduledLiveGames.includes(game.gamePk);
    console.log("is live: ", isLive);
    console.log("is scheduled: ", isScheduledInCron);
    if (!isLive && !isScheduledInCron) {
      console.log("in conditinn");
      const gameDetailsScheduler = cron.schedule(
        "* * * * * *",
        () => {
          ingestGameDetails(game.gamePk);
        },
        {
          scheduled: false,
          timezone: "Europe/Paris",
          name: "game-detail-task",
          recoverMissedExecutions: true,
        }
      );
      scheduledLiveGames = [...scheduledLiveGames, game.gamePk];
      // cron.schedule(() => {
      //   gameDetailsScheduler.stop()
      // })
    }
    // console.log(game);
  });

  // Build and send the weekly report
};

const gameStatusScheduler = cron.schedule("* * * * * *", watchGameStatus, {
  scheduled: false,
  timezone: "Europe/Paris",
  name: "game-status-task",
  recoverMissedExecutions: true,
});
gameStatusScheduler.start();

export { gameStatusScheduler };
