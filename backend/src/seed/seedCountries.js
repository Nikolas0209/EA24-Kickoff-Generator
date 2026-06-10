import { connectDB } from "../db.js";

async function seedCountries(){
  try{
    const db = await connectDB();
    const countries = db.collection('countries');

    const docs = [
      {
        country: 'Argentina',
        stars: 5,
        logo: '/assets/countryLogos/argentina.svg'
      },
      {
        country: 'Spain',
        stars: 5,
        logo: '/assets/countryLogos/spain.svg'
      },
      {
        country: 'Italy',
        stars: 5,
        logo: '/assets/countryLogos/italy.svg'
      },
      {
        country: 'The Netherlands',
        stars: 4.5,
        logo: '/assets/countryLogos/the_netherlands.svg'
      },
      {
        country: 'Belgium',
        stars: 4.5,
        logo: '/assets/countryLogos/belgium.svg'
      },
      {
        country: 'Croatia',
        stars: 4.5,
        logo: '/assets/countryLogos/croatia.svg'
      },
      {
        country: 'Denmark',
        stars: 4.5,
        logo: '/assets/countryLogos/denmark.svg'
      },
      {
        country: 'Poland',
        stars: 4,
        logo: '/assets/countryLogos/poland.svg'
      },
      {
        country: 'Morocco',
        stars: 4,
        logo: '/assets/countryLogos/morocco.svg'
      },
      {
        country: 'Mexico',
        stars: 4,
        logo: '/assets/countryLogos/mexico.svg'
      },
      {
        country: 'Norway',
        stars: 4,
        logo: '/assets/countryLogos/norway.svg'
      },
      {
        country: 'Ghana',
        stars: 4,
        logo: '/assets/countryLogos/ghana.svg'
      },
      {
        country: 'Sweden',
        stars: 4,
        logo: '/assets/countryLogos/sweden.svg'
      },
      {
        country: 'Czech Republic',
        stars: 4,
        logo: '/assets/countryLogos/czech_republic.svg'
      },
      {
        country: 'Ukraine',
        stars: 4,
        logo: '/assets/countryLogos/ukraine.svg'
      },
      {
        country: 'Scotland',
        stars: 4,
        logo: '/assets/countryLogos/scotland.svg'
      },
      {
        country: 'United States',
        stars: 4,
        logo: '/assets/countryLogos/usa.svg'
      },
      {
        country: 'Hungary',
        stars: 3.5,
        logo: '/assets/countryLogos/hungary.svg'
      },
      {
        country: 'Wales',
        stars: 3.5,
        logo: '/assets/countryLogos/wales.svg'
      },
      {
        country: 'Republic of Ireland',
        stars: 3.5,
        logo: '/assets/countryLogos/republic_of_ireland.svg'
      },
      {
        country: 'Iceland',
        stars: 3.5,
        logo: '/assets/countryLogos/iceland.svg'
      },
      {
        country: 'Romania',
        stars: 3.5,
        logo: '/assets/countryLogos/romania.svg'
      },
      {
        country: 'Finland',
        stars: 3,
        logo: '/assets/countryLogos/finland.svg'
      },
      {
        country: 'Northern Ireland',
        stars: 3,
        logo: '/assets/countryLogos/northern_ireland.svg'
      },
      {
        country: 'Qatar',
        stars: 2.5,
        logo: '/assets/countryLogos/qatar.svg'
      },
      {
        country: 'New Zealand',
        stars: 2.5,
        logo: '/assets/countryLogos/new_zealand.svg'
      },
      {
        country: 'Germany',
        stars: 5,
        logo: '/assets/countryLogos/germany.svg'
      },
      {
        country: 'Portugal',
        stars: 5,
        logo: '/assets/countryLogos/portugal.svg'
      },
      {
        country: 'France',
        stars: 5,
        logo: '/assets/countryLogos/france.svg'
      },
      {
      country: 'England',
      stars: 5,
      logo: '/assets/countryLogos/england.svg'
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