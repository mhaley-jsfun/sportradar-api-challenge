import React from "react";

function Players({ currentPlayerProfile, currentPlayerStatus }) {
  console.log(currentPlayerProfile, "profile");
  console.log(currentPlayerStatus, "status");
  return (
    <div>
      <p>{currentPlayerProfile.fullName}</p>
      <p>{currentPlayerProfile.primaryPosition.name}</p>
      <p>{currentPlayerProfile.currentAge}</p>
      <p>{currentPlayerProfile.currentTeam.name}</p>
      <p>{currentPlayerProfile.fullName}</p>
      <p>{currentPlayerStatus.assists}</p>
      <p>{currentPlayerStatus.goals}</p>
      <p>{currentPlayerStatus.hits}</p>
      <p>{currentPlayerStatus.points}</p>
      <p>{currentPlayerStatus.penaltyMinutes}</p>
    </div>
  );
}

export default Players;
