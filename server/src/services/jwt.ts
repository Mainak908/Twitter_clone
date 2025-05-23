import JWT from "jsonwebtoken";
import { JWTUser } from "../types.js";
import { User } from "../../generate/index.js";

const JWT_SECRET = process.env.JWT_SECRET!;

class JWTService {
  public static generateTokenForUser(user: User) {
    const payload = {
      id: user?.id,
      email: user?.email,
    };

    const token = JWT.sign(payload, JWT_SECRET);
    return token;
  }

  public static decodeToken(token: string) {
    try {
      return JWT.verify(token, JWT_SECRET) as JWTUser;
    } catch (error) {
      return null;
    }
  }
}

export default JWTService;
