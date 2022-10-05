## Introduction
Welcome to this User's crud documentation.

This Full Rest API was made with Javascript, Express, Sequelize and a PostgreSQL database

---

## Reference

Our base URL is localhost:PORT/api/:version. Replace :version with one of the available versions below.

### Versions


|VERSION | Status |
|--------|--------|
|v1| Current |

### Complete endpoint documentation:

localhost:PORT/docs

### Instalation

```bash
git clone https://github.com/SheykoWk/crud-users-api
cd crud-users-api
npm install
cp example.env .env
```

And change the .env values :


```bash
PORT=8000
JWT_SECRET=secret
DB_HOST=localhost 
DB_USER=postgres #Your db username
DB_PASSWORD=root #Your db password
DB=users #Your db name
```

And run 
```bash
npm run dev #For dev environment
npm start #For prod environment
```
