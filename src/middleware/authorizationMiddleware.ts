import { Request, Response, NextFunction } from 'express';

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userType = req.user?.user_type;

    if (userType === 'admin') {
      return next();
    } else {
      return res.status(403).json({ message: 'You do not have permission to access this route.' });
    }
};
