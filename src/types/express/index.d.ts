export{}

declare global {
  namespace Express {
   export interface Request {
     user?: {
       user_type: string;
     };
   }
 }
}
