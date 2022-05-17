const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/tabelmodels');

const regisHandler = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) return res.status(401).json({
        message: 'Password dan Konfirmasi Password harus sama'
    });
    const user = await Users.findOne({
        where: {
            email,
        }
    })
    if (user !== null) return res.status(403).json({
        message: 'Email telah terdaftar'
    })
    const salt = await bcrypt.genSalt();
    const hastPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name,
            email,
            password: hastPassword
        })
        return res.status(201).json({
            message: 'Berhasil mendaftar, silakan login'
        })
    } catch (error) {
        return res.status(501).json({
            message: 'Gagal mendaftar, server error'
        })
    }
}

const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({
        where: {
            email,
        },
    });
    if (user === null) {
        return res.json({
            message: 'Email tidak terdaftar'
        });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({
        message: 'Password salah'
    });
    try {
        const { id, name } = user;
        const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN, {
            expiresIn: '300s',
        });
        const refreshToken = jwt.sign({ id, name, email }, process.env.REFRESH_TOKEN);
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id,
            },
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true
        });
        return res.json({
            success: true,
            data: {
                name,
                accessToken,
            },
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}

const logoutHandler = async (req, res) => {
    const tokenCookie = req.cookies.refreshToken;
    if (!tokenCookie) return res.status(204).json({ message: 'Cookie tidak ditemukan' });
    const user = await Users.findOne({
        where: {
            refresh_token: tokenCookie,
        },
    });
    if (!user) return res.status(204).json({ message: 'Cookie tidak valid' });
    try {
        await Users.update({ refresh_token: null }, {
            where: {
                id: user.id,
            },
        });
        res.clearCookie('refreshToken');
        res.status(200).json({ status: true, message: 'Berhasil logout' });
    } catch (err) {
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};

module.exports = {
    regisHandler,
    loginHandler,
    logoutHandler,
}