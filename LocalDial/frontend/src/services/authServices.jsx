import jwtDecode from 'jwt-decode';

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Invalid token
  }
};

export const getToken = () => {
  const token = localStorage.getItem('authToken');
  if (token && !isTokenExpired(token)) {
    return token;
  }
  localStorage.removeItem('authToken'); // Clear expired token
  return null;
};
