import axios from 'axios';

export const addToCart = (item) => {
  
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3000/cart/add-item", item, {
        headers: { "Content-Type": "application/json" },
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchAllCartItems = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`http://localhost:3000/cart/items/?user=${userId}`);
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const updateCart = (update) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(`http://localhost:3000/cart/update/${update.id}`, update, {
        headers: { "Content-Type": "application/json" },
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteCartItem = (itemid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(`http://localhost:3000/cart/delete/${itemid}`, {
        headers: { "Content-Type": "application/json" },
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const resetCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetchAllCartItems(userId);
      const items = response.data;
      for (let item of items) {
        await deleteCartItem(item._id);
      }
      resolve({ status: "successful" });
    } catch (error) {
      reject(error);
    }
  });
};
