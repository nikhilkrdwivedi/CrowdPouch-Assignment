import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../model/user.js';
import constant from '../constant/index.js';

// login functionality 
export const login = async (req, res) => {
    let loginUser = req.body;

    let user = await UserModel.findOne({ email: loginUser.email });
    if (!user) {
        return res.status(400).json({ errorMsg: 'Please create an account to access all features!' });
    }
    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
        return res.status(400).json({ errorMsg: 'Please send correct credentials!' });
    }

    const token = jwt.sign({ userId: user._id }, constant.jwtSecret, {
        expiresIn: constant.expiresIn,
    });

    user.password = undefined;
    return res.status(200).json({ successMsg: 'Successfully user login!', data: { user, token } });
}

// Register functionality
export const register = async (req, res) => {
    try {
        let registerUser = req.body;

        if (!constant.passwordRegex.test(registerUser.password)) {
            return res.status(400).json({ errorMsg: 'Please send a valid password, must contains one uppercase, one lowercase, one number, one special character and length will be between 8-30 characters!' });
        }

        const password = bcrypt.hashSync(registerUser.password, constant.saltRounds);
        registerUser.password = password;

        const user = await UserModel.create(registerUser);

        const token = jwt.sign({ userId: user._id }, constant.jwtSecret, {
            expiresIn: constant.expiresIn,
        });
        user.password = undefined;
        return res.status(201).json({ successMsg: 'Successfully user created!', data: { user, token } });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export default { login, register }