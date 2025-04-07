import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import User from '../models/user.model';


const registerUser = async (req: Request, res: Response) => { // Not Finished!!
    const { username, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ error: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
const loginUser = async (req: Request, res: Response) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
          message: "Content can not be empty!",
        });
        return;
    }
  
    const { username, password } = req.body;

    try {
        let user = await User.authenticate(username, password);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

        const Obj = {
            token: token,
            refreshToken: refreshToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        };
  
        res.status(200).json(Obj);
    } catch (error) {
        if (error instanceof Error && error.message === "Invalid username or password") {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.status(500).json({ error: "Server error" });
    }
};

export { registerUser, loginUser };


// export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const user = await authenticateUser(req.body);
//         if (!user) {
//             res.status(401).json({ message: "Invalid credentials" });
//             return;
//         }
//         res.status(200).json({ token: generateToken(user) });
//     } catch (error) {
//         next(error);
//     }
// };