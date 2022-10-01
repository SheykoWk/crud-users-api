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
    const normalRole = await Roles.findOne({ where: { name: 'normal' } });
    if (normalRole) {
        const newUser = await Users.create({
            id: uuid.v4(),
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            gender: data.gender,
            password: hashPassword(data.password),
            phone: data.phone,
            birthdayDate: data.birthday_date,
            roleId: normalRole.id,
            profileImage: data.profile_image,
            country: data.country,
            status: 'active',
            verified: false,
        });
        return newUser;
    }
    return null;
};
const editUser = async (userId, data) => {
    const { id, password, verified, role_id, ...restOfProperties } = data;
    const response = await Users.update(restOfProperties, {
        where: { id: userId },
    });
    return response;
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
