import rating_05 from '../assets/starRatings/rating_05.png';
import rating_1 from '../assets/starRatings/rating_1.png';
import rating_1_5 from '../assets/starRatings/rating_1_5.png';
import rating_2 from '../assets/starRatings/rating_2.png';
import rating_2_5 from '../assets/starRatings/rating_2_5.png';
import rating_3 from '../assets/starRatings/rating_3.png';
import rating_3_5 from '../assets/starRatings/rating_3_5.png';
import rating_4 from '../assets/starRatings/rating_4.png';
import rating_4_5 from '../assets/starRatings/rating_4_5.png';
import rating_5 from '../assets/starRatings/rating_5.png';
import type { StarRating } from '../types/starRating.type';

export const starRatings: Record<StarRating, string> = {
  0.5: rating_05,
  1: rating_1,
  1.5: rating_1_5,
  2: rating_2,
  2.5: rating_2_5,
  3: rating_3,
  3.5: rating_3_5,
  4: rating_4,
  4.5: rating_4_5,
  5: rating_5
 };