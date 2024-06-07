import asyncHandler from "express-async-handler";
import { createSlug } from "../helper/slug.js";
import Brand from "../models/Brand.js";
import { cloudDelete, cloudUpload } from "../utils/cloudinary.js";
import { findPublicId } from "../helper/helper.js";


/**
 * @DESC Get all Brands data
 * @ROUTE /api/v1/Brand
 * @method GET
 * @access public
 */
export const getAllBrand = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  if (brands.length > 0) {
    res.status(200).json({brands});
  }else{
    res.status(200).json({message: "Brand data not found"});
  }

});

/**
 * @DESC Get Single Brands data
 * @ROUTE /api/v1/Brand/:id
 * @method GET
 * @access public
 */
export const getSingleBrand = asyncHandler(async (req, res) => {
  const  { id }  = req.params;
  const brand = await Brand.findById(id); 
  if (!brand) {
    return res.status(404).json({ message: "Brand data not found" });
  }else{
      res.status(200).json(brand);
  }

});

/**
 * @DESC Create new Brand
 * @ROUTE /api/v1/Brand
 * @method POST
 * @access public
 */
export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name ) {
    return res.status(400).json({ message: "Brand name is required" });
  }

  // Brand Check
  const BrandCheck = await Brand.findOne({name});

  if (BrandCheck) {
    return res.status(400).json({ message: "Name already exists" });
  }

  // create brand logo
  let createLogo = null;
  if (req.file) {
    const logo = await cloudUpload(req); 
    createLogo = logo.secure_url;   
  }

  // create new Brand
  const brand = await Brand.create({
    name,
    slug: createSlug(name),
    logo: createLogo ? createLogo : null
  });

  res.status(200).json({ brand, message: "Brand create successfully" });
});

/**
 * @DESC Delete Brand
 * @ROUTE /api/v1/Brand/:id
 * @method DELETE
 * @access public
 */
export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);

  // delete brand logo
  if (brand.logo) {
    const publicId = findPublicId(brand.logo);
    await cloudDelete(publicId);
  }  
  res.status(200).json({brand, message: "Brand deleted successfull"});

});

/**
 * @DESC Update Brand
 * @ROUTE /api/v1/Brand/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Brand name is required" });
  }

  const brandUpdate = await Brand.findById(id);

  if (!brandUpdate) {
    return res.status(400).json({ message: "Brand data not found" });
  }

  // Update brand logo
  let updateLogo = brandUpdate.logo;
  if (req.file) {
    const logo = await cloudUpload(req);
    updateLogo = logo.secure_url;  

    await cloudDelete(findPublicId(brandUpdate.logo));
  }

  // Updated brand data
  brandUpdate.name = name;
  brandUpdate.slug = createSlug(name);
  brandUpdate.logo = updateLogo;
  brandUpdate.save();

  

  res.status(200).json({brand : brandUpdate, message: "Brand updated successfull"});
});
