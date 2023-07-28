import axios from "axios";

import { subCategories } from "../data";

const signUpAPI = async (data) => {
  try {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/auth/signUp`,
      data: data,
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const signInAPI = async (data) => {
  try {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/auth/signIn`,
      data: data,
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const publishRecipeAPI = async (data) => {
  try {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/general/publishRecipe`,
      data: data,
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const fetchRecipesByFilterAPI = async (data) => {
  if (
    data.subcategory !== "" &&
    subCategories[data.category].indexOf(data.subcategory) === -1
  ) {
    data.subcategory = "";
  }
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/general/fetchRecipesByFilter`,
      data: data,
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const searchAPI = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/general/search`,
      data: data,
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const commentAPI = async (data) => {
  try {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/general/comment`,
      data: data,
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const userGetterAPI = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER}/api/auth/getUser`,
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const fetchRecipeAPI = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/general/fetchRecipe`,
      data: data,
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ratedByMeAPI = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/general/ratedByMe`,
      data: data,
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    return true;
  }
};

const rateRecipeAPI = async (data) => {
  try {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/general/rateRecipe`,
      data: data,
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const fetchPopularAPI = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/general/fetchPopular`,
      data: data,
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchMyRecipesAPI = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER}/api/general/fetchMyRecipes`,
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const deleteRecipeAPI = async (recipe_id) => {
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_SERVER}/api/general/deleteRecipe/${recipe_id}`,
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export {
  signUpAPI,
  signInAPI,
  publishRecipeAPI,
  fetchRecipesByFilterAPI,
  searchAPI,
  userGetterAPI,
  commentAPI,
  fetchRecipeAPI,
  ratedByMeAPI,
  rateRecipeAPI,
  fetchPopularAPI,
  fetchMyRecipesAPI,
  deleteRecipeAPI
};
