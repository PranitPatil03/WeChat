import jwt from "jsonwebtoken";

export const verifyJWT = async (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({ error: "No Access Token" });
    }

    if (!process.env.SECRET_ACCESS_KEY) {
      return;
    }

    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err: any, user: any) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ err: "Access Token is Invalid" });
      }

      req.user = user.id;
      next();
    });
  } catch (error) {}
};
