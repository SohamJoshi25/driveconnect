import { jwtDecode } from "jwt-decode";

export const validateJWT = (token: string, advanceTime?: number): boolean => {
  try {
    const decoded = jwtDecode(token);

    const currentTime = Date.now();
    if (decoded.exp! >= currentTime + (advanceTime ?? 3600)) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
