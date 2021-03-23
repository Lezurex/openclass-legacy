const Bcrypt = require('bcrypt');
Bcrypt.hash("Musterpasswort123!", 10, async (err, hash) => {
    if (err) throw err;
    console.log(hash);
});