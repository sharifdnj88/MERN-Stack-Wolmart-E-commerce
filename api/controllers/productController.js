import asyncHandler from "express-async-handler";
import { createSlug } from "../helper/slug.js";
import Product from "../models/Product.js";
import { cloudDelete, cloudUpload, cloudUploads } from "../utils/cloudinary.js";
import { findPublicId } from "../helper/helper.js";


/**
 * @DESC Get all Products data
 * @ROUTE /api/v1/Product
 * @method GET
 * @access public
 */
export const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (products.length > 0) {
    res.status(200).json({products});
  }else{
    res.status(200).json({message: "Product data not found"});
  }

});

/**
 * @DESC Get Single Products data
 * @ROUTE /api/v1/Product/:id
 * @method GET
 * @access public
 */
export const getSingleProduct = asyncHandler(async (req, res) => {
  const  { id }  = req.params;
  const product = await Product.findById(id); 
  if (!product) {
    return res.status(404).json({ message: "Product data not found" });
  }else{
      res.status(200).json(product);
  }

});

/**
 * @DESC Create new Product
 * @ROUTE /api/v1/Product
 * @method POST
 * @access public
 */
export const createProduct = asyncHandler(async (req, res) => {
  const { name, productType, productSimple, productVariable, productGroup, productExternal, shortDesc, longDesc } = req.body;

  if (!name ) {
    return res.status(400).json({ message: "Product name is required" });
  }

  // Product Check
  const ProductCheck = await Product.findOne({name});

  if (ProductCheck) {
    return res.status(400).json({ message: "Name already exists" });
  }

  // create Product photo
  let productPhotos = []; 
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const fileData = await cloudUploads(req.files[i].path);
      productPhotos.push(fileData);      
    }  
  }

  // const simpleData = JSON.parse(productSimple);

  // create new Product
  const product = await Product.create({
    name,
    slug: createSlug(name),
    productType, 
    productSimple: productType === "simple" ? productSimple : null,
    // productSimple: productType === "simple" ? {...simpleData, productPhotos} : null,
    productVariable: productType === "variable" ? productVariable : null,
    productGroup: productType === "group" ? productGroup : null,
    productExternal: productType === "external" ? productExternal : null,
    shortDesc, 
    longDesc
    // logo: createLogo ? createLogo : null
  });

  res.status(200).json({ product, message: "Product create successfully" });
});

/**
 * @DESC Delete Product
 * @ROUTE /api/v1/Product/:id
 * @method DELETE
 * @access public
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  // delete Product logo
  if (product.logo) {
    const publicId = findPublicId(product.logo);
    await cloudDelete(publicId);
  }  
  res.status(200).json({product, message: "Product deleted successfull"});

});

/**
 * @DESC Update Product
 * @ROUTE /api/v1/Product/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Product name is required" });
  }

  const productUpdate = await Product.findById(id);

  if (!productUpdate) {
    return res.status(400).json({ message: "Product data not found" });
  }

  // Update Product logo
  let updateLogo = productUpdate.logo;
  if (req.file) {
    const logo = await cloudUpload(req);
    updateLogo = logo.secure_url;  

    await cloudDelete(findPublicId(productUpdate.logo));
  }

  // Updated Product data
  productUpdate.name = name;
  productUpdate.slug = createSlug(name);
  productUpdate.logo = updateLogo;
  productUpdate.save();

  

  res.status(200).json({product : productUpdate, message: "Product updated successfull"});
});
