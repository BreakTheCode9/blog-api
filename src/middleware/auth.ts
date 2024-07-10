// auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtSecret } from '/config';

interface AuthRequest extends Request {
    user?: JwtPayload | string;
}

const generateToken = (user: any) => {
    const payload = {
        user: {
            id: user.id,
            email: user.email,
        },
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    return token;
};

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export { auth, generateToken };