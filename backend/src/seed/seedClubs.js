import { connectDB } from '../db.js';
import { dritteLiga } from './leagues/dritteLiga.js';
import { aLeague } from './leagues/aLeague.js';
import { allsvenskan } from './leagues/allsvenskan.js';
import { austrianBundesliga } from './leagues/austrianBundesliga.js';
import { bundesliga } from './leagues/bundesliga.js';
import { bundesliga2 } from './leagues/bundesliga2.js';
import { chineseSuperLeague } from './leagues/chineseSuperLeague.js';
import { danishSuperliga } from './leagues/danishSuperliga.js';
import { ekstraklasa } from './leagues/ekstraklasa.js';
import { eliteserien } from './leagues/eliteserien.js';
import { eredivisie } from './leagues/eredivisie.js';
import { indianSuperLeague } from './leagues/indianSuperLeague.js';
import { kLeague1 } from './leagues/kLeague1.js';
import { laliga } from './leagues/laliga.js';
import { laliga2 } from './leagues/laliga2.js';
import { ligaPortugal } from './leagues/ligaPortugal.js';
import { ligue1 } from './leagues/ligue1.js';
import { ligue2 } from './leagues/ligue2.js';
import { premierDivision } from './leagues/premierDivision.js';
import { premierLeague } from './leagues/premierLeague.js';
import { proLeague } from './leagues/proLeague.js';
import { restOfWorld } from './leagues/restOfWorld.js';
import { saudiProLeague } from './leagues/saudiProLeague.js';
import { scottishPremiership } from './leagues/scottishPremiership.js';
import { seriea } from './leagues/seriea.js';
import { serieb } from './leagues/serieb.js';
import { superLig } from './leagues/superLig.js';
import { superLigaRomaniei } from './leagues/superLigaRomaniei.js';
import { swissSuperLeague } from './leagues/swissSuperLeague.js';
import { championship } from './leagues/championship.js';
import { leagueOne } from './leagues/leagueOne.js';
import { leagueTwo } from './leagues/leagueTwo.js';
import { mls } from './leagues/mls.js';
import { ligaProfesionaldeFutbol } from './leagues/ligaProfesionalDeFutbol.js';

async function seedClubs(){
  try{
    const db = await connectDB();
    const clubs = db.collection('clubs');

    const docs = [
      ...austrianBundesliga, 
      ...scottishPremiership,
      ...restOfWorld,
      ...premierDivision,
      ...laliga,
      ...bundesliga,
      ...seriea,
      ...premierLeague,
      ...swissSuperLeague,
      ...ligue1,
      ...proLeague,
      ...eredivisie,
      ...danishSuperliga,
      ...ligaPortugal,
      ...superLig,
      ...superLigaRomaniei,
      ...eliteserien,
      ...allsvenskan,
      ...aLeague,
      ...ekstraklasa,
      ...ligue2,
      ...saudiProLeague,
      ...kLeague1,
      ...serieb,
      ...indianSuperLeague,
      ...chineseSuperLeague,
      ...laliga2,
      ...bundesliga2,
      ...dritteLiga,
      ...championship,
      ...leagueOne,
      ...leagueTwo,
      ...mls,
      ...ligaProfesionaldeFutbol
    ];

    for (const doc of docs){
      await clubs.replaceOne(
        {club: doc.club},
        doc,                  //replaces the old doc with this one
        {upsert: true}
      );
    };    

    console.log('Seeded clubs successfully!');
  }catch(err){
    console.error('Seeding clubs failed:', err);
  }finally {
    process.exit(0);
  }
}

seedClubs();