import { connectDB } from "../db.js";

async function seedCountries(){
  try{
    const db = await connectDB();
    const countries = db.collection('countries');

    const docs = [
      {
        country: 'Argentina',
        stars: 5,
        logo: '/countryLogos/argentina'
      },
      {
        country: 'Spain',
        stars: 5,
        logo: '/countryLogos/spain'
      },
      {
        country: 'Italy',
        stars: 5,
        logo: '/countryLogos/italy'
      },
      {
        country: 'The Netherlands',
        stars: 4.5,
        logo: '/countryLogos/the_netherlands'
      },
      {
        country: 'Belgium',
        stars: 4.5,
        logo: '/countryLogos/belgium'
      },
      {
        country: 'Croatia',
        stars: 4.5,
        logo: '/countryLogos/croatia'
      },
      {
        country: 'Denmark',
        stars: 4.5,
        logo: '/countryLogos/denmark'
      },
      {
        country: 'Poland',
        stars: 4,
        logo: '/countryLogos/poland'
      },
      {
        country: 'Morocco',
        stars: 4,
        logo: '/countryLogos/morocco'
      },
      {
        country: 'Mexico',
        stars: 4,
        logo: '/countryLogos/mexico'
      },
      {
        country: 'Norway',
        stars: 4,
        logo: '/countryLogos/norway'
      },
      {
        country: 'Ghana',
        stars: 4,
        logo: '/countryLogos/ghana'
      },
      {
        country: 'Sweden',
        stars: 4,
        logo: '/countryLogos/sweden'
      },
      {
        country: 'Czech Republic',
        stars: 4,
        logo: '/countryLogos/czech_republic'
      },
      {
        country: 'Ukraine',
        stars: 4,
        logo: '/countryLogos/ukraine'
      },
      {
        country: 'Scotland',
        stars: 4,
        logo: '/countryLogos/scotland'
      },
      {
        country: 'United States',
        stars: 4,
        logo: '/countryLogos/usa'
      },
      {
        country: 'Hungary',
        stars: 3.5,
        logo: '/countryLogos/hungary'
      },
      {
        country: 'Wales',
        stars: 3.5,
        logo: '/countryLogos/wales'
      },
      {
        country: 'Republic of Ireland',
        stars: 3.5,
        logo: '/countryLogos/republic_of_ireland'
      },
      {
        country: 'Iceland',
        stars: 3.5,
        logo: '/countryLogos/iceland'
      },
      {
        country: 'Romania',
        stars: 3.5,
        logo: '/countryLogos/romania'
      },
      {
        country: 'Finland',
        stars: 3,
        logo: '/countryLogos/finland'
      },
      {
        country: 'Northern Ireland',
        stars: 3,
        logo: '/countryLogos/northern_ireland'
      },
      {
        country: 'Qatar',
        stars: 2.5,
        logo: '/countryLogos/qatar'
      },
      {
        country: 'New Zealand',
        stars: 2.5,
        logo: '/countryLogos/new_zealand'
      }
    ];

    for(const doc of docs){
      await countries.updateOne(
        {country: doc.country}, // match by country
        {$set: doc},            // update fields
        {upsert: true}          // insert if not found
      );
    };

    console.log('Seeded countries successfully!');
  } catch(err){
    console.error('Countries seeding failed:', err);
  } finally {
    process.exit(0);
  }
}

seedCountries();