import 'dotenv/config';
import app from './server.js';

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
