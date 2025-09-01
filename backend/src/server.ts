import { connectDB } from './config/db.js';
import app from './app.js';
import { ensureAdminExists } from './initAdmin.js';


connectDB();

const PORT = process.env.PORT!;
app.listen(PORT, async () => {
    await ensureAdminExists();
    console.log(`Server running on port ${PORT}`);
})

// test
app.get('/', (req, res) => {
  res.send('Server is alive');
});
