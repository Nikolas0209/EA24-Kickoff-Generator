import express from 'express';
import countriesRoutes from './routes/countries.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import clubRoutes from './routes/clubs.routes.js';
import kickoffHistoryRoutes from './routes/kickoffHistory.routes.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use('/countries', countriesRoutes);
app.use('/clubs', clubRoutes);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/kickoff-history', kickoffHistoryRoutes);
 
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
