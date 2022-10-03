const uuid = require('uuid');
const { hashPassword } = require('../utils/crypt');

const Users = require('../models/users.model');

const getAllUsers = async () => {
    const data = await Users.findAll({
        attributes: {
            exclude: ['password'],
        },
    });
    return data;
    //? select * from users;
};

const getUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id,
        },
        attributes: {
            exclude: ['password'],
        },
    });
    return data;
    //? select * from users where id = ${id};
};

const createUser = async (data) => {
    const newUser = await Users.create({
        id: uuid.v4(),
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: hashPassword(data.password),
        birthday: data.birthday
    });
    return newUser;
};
const editUser = async (userId, data) => {
    const { id,  ...restOfProperties } = data;
    const user = await Users.findOne({ where: { id: userId } });
    await user.update(restOfProperties);
    return user;
};

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: {
            id: id,
        },
    });
    return data;
};

const getUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: { email },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'roleId'],
        },
    });
    return data;
    //? select * from users where email = ${email};
};

const editProfileImg = async (userID, imgUrl) => {
    const data = await Users.update(
        {
            profileImage: imgUrl,
        },
        {
            where: { id: userID },
        }
    );
    return data;
};

const getUserWithRole = async (userId) => {
    const data = await Users.findOne({
        where: {
            id: userId,
        },
        include: {
            model: Roles,
            as: 'role',
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt'],
            },
        },
        attributes: {
            exclude: ['roleId', 'createdAt', 'updatedAt', 'password'],
        },
    });
    return data;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
    getUserByEmail,
    editProfileImg,
    getUserWithRole,
};
