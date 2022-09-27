require('dotenv').config();

module.exports = {
    port: process.env.PORT || 9000,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    db: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB,
    },
};
