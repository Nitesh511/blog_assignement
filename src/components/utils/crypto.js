import CryptoJS from 'crypto-js';
import { jwtDecode } from 'jwt-decode';
// Secret key for encryption/decryption (ensure this is secure)
const SECRET_KEY = import.meta.env.VITE_SCERET_KEY;
const SECRET_KEY_ID = import.meta.env.VITE_ID_SECRET_KEY;

// Encrypt a value
export const encryptToken = (token) => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

// Decrypt a value
export const decryptToken = (encryptedToken) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Save token securely to sessionStorage
export const saveToken = (key, token) => {
  const encryptedToken = encryptToken(token);
  sessionStorage.setItem(key, encryptedToken); // Use sessionStorage
};

// Retrieve token securely from sessionStorage
export const getToken = (key) => {
  const encryptedToken = sessionStorage.getItem(key); // Use sessionStorage
  if (!encryptedToken) return null;
  return decryptToken(encryptedToken);
};

// Remove token from sessionStorage
export const removeToken = (key) => {
  sessionStorage.removeItem(key); // Use sessionStorage
};

export const encodeId = (id) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY_ID).toString();
    return encodeURIComponent(encrypted); // Makes it URL-safe
  } catch (error) {
    console.error('Error encoding ID:', error);
    return null;
  }
};

export const decodeId = (encodedId) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encodedId), SECRET_KEY_ID);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error decoding ID:', error);
    return null;
  }
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};