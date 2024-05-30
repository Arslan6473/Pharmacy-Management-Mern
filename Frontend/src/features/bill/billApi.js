import axios from 'axios';

export const createBill = (bill) => {
  return new Promise(async (resolve) => {
    try {
      const response = await axios.post('http://localhost:3000/bills/create', bill, {
        headers: { 'Content-Type': 'application/json' }
      });
      resolve({ data: response.data });
    } catch (error) {
      console.error(error);
      resolve({ data: null, error: error });
    }
  });
};

export const fetchAllBills = (pagination,search) => {
  let queryStr = '';

  for (let key in search) {
    queryStr += `${key}=${search[key]}&`;
  }

  for (let key in pagination) {
    queryStr += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    try {
      const response = await axios.get(`http://localhost:3000/bills/?${queryStr}`);
      resolve({ data: response.data });
    } catch (error) {
      console.error(error);
      resolve({ data: null, error: error });
    }
  });
};
