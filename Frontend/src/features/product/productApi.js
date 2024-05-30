import axios from 'axios';

export const updateProduct = (updatedProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(`http://localhost:3000/products/update/${updatedProduct._id}`, updatedProduct, {
        headers: { "Content-Type": "application/json" }
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};

export const createProduct = (productData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3000/products/create", productData, {
        headers: { "Content-Type": "application/json" }
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
};


export const fetchFilterProducts = (pagination,search) => {
  let queryStr = '';
  for (let key in search) {
    queryStr += `${key}=${search[key]}&`;
  }
  for (let key in pagination) {
    queryStr += `${key}=${pagination[key]}&`;
  }
  

  
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`http://localhost:3000/products/?${queryStr}`);
      resolve({data:response.data});
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchSingleProduct = (productId) => {
  
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${productId}`);
      resolve({data:response.data});
    } catch (error) {
      reject(error);
    }
  });
};

export const updatedProductsOfCart = (items) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatePromises = items.map((item) => updateProduct(item));
      await Promise.all(updatePromises);
      resolve({ status: "successful" });
    } catch (error) {
      reject(error);
    }
  });
};


