import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from "../shop-data.js";
// ^ import only needed to initialize data in the Firestore DatabaseW

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);
  // Only run the first time - just to initialize the data in the Firestore Database

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
};
