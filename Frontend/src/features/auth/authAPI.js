import axios from 'axios';

export const createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3000/users/register", userData, {
        headers: { "Content-Type": "application/json" }
      });
      resolve({ data: response.data });
    } catch (error) {
      if (error.response) {
        
        reject({ message: error.response.data.message || 'Registration failed', status: error.response.status });
      } 
    }
  });
};

export const logoutUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3000/users/signout", {}, {
        headers: { "Content-Type": "application/json" }
      });
      resolve({ data: response.data });
    } catch (error) {
      if (error.response) {
        reject({ message: error.response.data.message || 'Logout failed', status: error.response.status });
      } else if (error.request) {
        reject({ message: 'No response from the server', status: null });
      } else {
        reject({ message: 'Error in setting up the request', status: null });
      }
    }
  });
};

export const logInUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", userData, {
        headers: { "Content-Type": "application/json" }
      });
      resolve({ data: response.data });
    } catch (error) {
      if (error.response) {
        reject({ message: error.response.data.message || 'Login failed', status: error.response.status });
      } else if (error.request) {
        reject({ message: 'No response from the server', status: null });
      } else {
        reject({ message: 'Error in setting up the request', status: null });
      }
    }
  });
};
