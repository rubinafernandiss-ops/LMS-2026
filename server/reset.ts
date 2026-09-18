import { loadDb, replaceDb, flush } from './db';
import { seedDatabase } from './seed';

loadDb(seedDatabase);
replaceDb(seedDatabase());
flush();
console.log('Demo data has been reset.');
process.exit(0);
