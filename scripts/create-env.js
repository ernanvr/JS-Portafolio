const fs = require('fs');
//fs es un módulo de NodeJS

fs.writeFileSync('./.env', `API=${process.env.API}\n`);
