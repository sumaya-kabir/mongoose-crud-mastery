import app from './app';

import mongoose from 'mongoose';
import config from './app/config';

function main() {
  try {
    mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
