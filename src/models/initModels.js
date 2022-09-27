const Users = require('./users.model');
const Roles = require('./roles.model');

const initModels = () => {
    //? Users -> Posts

    Roles.hasMany(Users);
    Users.belongsTo(Roles);
};

module.exports = initModels;
