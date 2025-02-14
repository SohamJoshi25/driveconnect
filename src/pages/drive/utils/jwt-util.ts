import { jwtDecode } from "jwt-decode";

export const validateJWT = (token: string, advanceTime: number = 3600): boolean => {
  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    if (!decoded.exp) return false; // Expiry should exist

    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    return decoded.exp>= currentTime + advanceTime ;
  } catch (error) {
    console.error("JWT validation error:", error);
    return false;
  }
};
