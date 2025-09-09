import jwt from "jsonwebtoken"
export default function genJWT(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1m" });
  return token
}