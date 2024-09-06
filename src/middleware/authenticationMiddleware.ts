import { Request, Response, NextFunction } from 'express'; 
import { CognitoJwtVerifier } from 'aws-jwt-verify';

// Get AWS Cognito User Pool and Client ID from environment variables
const poolId = process.env.COGNITO_USER_POOL_ID!;
const clientId = process.env.COGNITO_CLIENT_ID!;

// Create a verifier instance to verify the ID tokens from AWS Cognito
const verifier = CognitoJwtVerifier.create({
  userPoolId: poolId,
  tokenUse: 'id',     
  clientId: clientId   
});

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token using the CognitoJwtVerifier
    const decodedToken = await verifier.verify(token);

    // Extract the custom user type attribute from the decoded token
    const userType = decodedToken['custom:userType'];

    // If userType exists, add it to the req object and call next() to proceed
    if(userType){
      req.user = {
        user_type: userType as string,
      };
      return next(); 
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
