import { Request, Response } from 'express';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import dotenv from 'dotenv';

dotenv.config();

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID!,
  ClientId: process.env.COGNITO_CLIENT_ID!
};

const userPool = new CognitoUserPool(poolData);

export const loginUser = (req: Request, res: Response) => {
  const { username, password, newPassword, email } = req.body;

  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const idToken = result.getIdToken().getJwtToken();
      res.json({ token: idToken });
    },
    onFailure: (err) => {
      res.status(401).json({ message: err.message || 'Authentication failed' });
    },
    newPasswordRequired: (userAttributes) => {
      if (newPassword) {
        // Prepare attributes to update
        const updatedAttributes: any = {};


        if (email  && !userAttributes.email) {
          updatedAttributes.email = email;
        }

        // Proceed with completing new password challenge
        cognitoUser.completeNewPasswordChallenge(newPassword, updatedAttributes, {
          onSuccess: (result) => {
            const idToken = result.getIdToken().getJwtToken();
            res.json({ token: idToken });
          },
          onFailure: (err) => {
            res.status(401).json({ message: err.message || 'Password change failed' });
          },
        });
      } else {
        res.status(400).json({ message: 'New password is required' });
      }
    },
  });
};
