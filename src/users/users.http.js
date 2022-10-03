const userControllers = require('./users.controllers');

const getAll = (req, res) => {
    userControllers
        .getAllUsers()
        .then((response) => {
            res.status(200).json({ items: response.length, users: response });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

const getById = (req, res) => {
    const id = req.params.id;
    userControllers
        .getUserById(id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch(() => {
            res.status(404).json({
                message: `Invalid ID`,
            });
        });
};

const register = (req, res) => {
    const data = req.body;
    if (!Object.keys(data).length) {
        return res.status(400).json({
            message: 'All fields must be completed',
            fields: {
                first_name: 'string',
                last_name: 'string',
                email: 'examle@examle.com',
                birthday_date: 'YYYY/MM/DD',
            },
        });
    } else if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.password ||
        !data.birthday
    ) {
        return res.status(400).json({
            message: 'All fields must be completed',
            fields: {
                first_name: 'string',
                last_name: 'string',
                email: 'examle@examle.com',
                password: 'string',
                birthday: 'YYYY/MM/DD',
            },
        });
    } else {
        userControllers
            .createUser(data)
            .then((response) => {
                res.status(201).json({
                    message: `User created succesfully with id: ${response.id}`,
                    user: response,
                });
            })
            .catch((err) => {
                res.status(400).json({ message: err.message });
            });
    }
};

const remove = (req, res) => {
    const id = req.params.id;
    userControllers
        .deleteUser(id)
        .then((response) => {
            if (response) {
                res.status(204).json();
            } else {
                res.status(400).json({
                    message: 'Invalid ID',
                });
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message,
            });
        });
};

const edit = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (!Object.keys(data).length) {
        return res.status(400).json({
            message: 'All fields must be completed',
            fields: {
                first_name: 'string',
                last_name: 'string',
                password: 'string',
                email: 'examle@examle.com',
                birthday_date: 'YYYY/MM/DD',
            },
        });
    } else if (
        !data.first_name ||
        !data.last_name ||
        !data.password || 
        !data.email ||
        !data.birthday
    ) {
        return res.status(400).json({
            message: 'All fields must be completed',
            fields: {
                first_name: 'string',
                last_name: 'string',
                password: 'string',
                email: 'examle@examle.com',
                birthday_date: 'YYYY/MM/DD',
            },
        });
    } else {
        userControllers
            .editUser(id, data)
            .then((response) => {
                res.status(200).json({
                    message: 'User edited succesfully',
                    user: response,
                });
            })
            .catch((error) => {
                res.status(400).json({ message: error.message });
            });
    }
};

module.exports = {
    getAll,
    getById,
    register,
    remove,
    edit,
};
