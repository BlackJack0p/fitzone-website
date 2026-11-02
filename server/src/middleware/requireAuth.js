import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth.js";

export async function requireAuth(req, res, next) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        error: "You must be logged in to perform this action.",
      });
    }

    req.user = session.user;
    req.session = session.session;

    next();
  } catch (error) {
    next(error);
  }
}
