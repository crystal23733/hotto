import 'dotenv/config';
import './db.js';
import app from './server.js';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
