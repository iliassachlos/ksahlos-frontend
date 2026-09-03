export const TOKEN_STORAGE_KEY = "ksahlos-jwt";

interface JwtPayload {
  exp?: number;
}

/**
 *  Decodes the payload of a JWT without verifying its signature.
 *
 * @param token - The JWT string to decode
 * @returns The decoded payload as a JwtPayload object, or null
 */
const decodeJwtPayload = (token: string): JwtPayload | null => {
  const parts = token.split(".");

  if (parts.length !== 3) return null;

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);

    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
};

/**
 * Validates a stored auth token client-side.
 *
 * @param token - The raw token value from storage
 * @returns true if the token is well-formed and not expired
 */
export const isTokenValid = (token: string | null | undefined): boolean => {
  if (!token || token === "undefined" || token === "null") return false;

  const payload = decodeJwtPayload(token);

  if (!payload) return false;

  if (typeof payload.exp !== "number" || !Number.isFinite(payload.exp)) {
    return false;
  }

  return payload.exp * 1000 > Date.now();
};
