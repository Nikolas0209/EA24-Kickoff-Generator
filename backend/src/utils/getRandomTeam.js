function getRandomTeam (teams, excludeId){
  let t = teams;

  if(excludeId){
    t = teams.filter(team => !team._id.equals(excludeId)); 
  }

  const index = Math.floor(Math.random() * t.length);
  const selectedTeam = t[index];
 
  return selectedTeam;
}

export default getRandomTeam;