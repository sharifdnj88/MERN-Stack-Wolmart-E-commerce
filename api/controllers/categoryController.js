import asyncHandler from "express-async-handler";
import { createSlug } from "../helper/slug.js";
import Category from "../models/Category.js";
import { cloudDelete, cloudUpload } from "../utils/cloudinary.js";
import { findPublicId } from "../helper/helper.js";

/**
 * @DESC Get all Categorys data
 * @ROUTE /api/v1/Category
 * @method GET
 * @access public
 */
export const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find()
  .populate([
     {
        path: "subCategory",
            populate: {
                path: "subCategory",
                    populate: {
                        path: "subCategory",
                    }
            }
      },
      {
        path: "parentCategory",
            populate: {
                path: "parentCategory",
                    populate: {
                        path: "parentCategory",
                    }
            }
      }
  ]);

  if (categories.length > 0) {
    res.status(200).json({categories});
  }else{
    res.status(200).json({message: "Category data not found"});
  }

});

/**
 * @DESC Get Single Categorys data
 * @ROUTE /api/v1/Category/:id
 * @method GET
 * @access public
 */
export const getSingleCategory = asyncHandler(async (req, res) => {
  const  { id }  = req.params;
  const category = await Category.findById(id)
  .populate([
    {
       path: "subCategory",
           populate: {
               path: "subCategory",
                   populate: {
                       path: "subCategory",
                   }
           }
     },
     {
       path: "parentCategory",
           populate: {
               path: "parentCategory",
                   populate: {
                       path: "parentCategory",
                   }
           }
     }
 ]); 
  if (!category) {
    return res.status(404).json({ message: "Category data not found" });
  }else{
      res.status(200).json(category);
  }

});

/**
 * @DESC Create new Category
 * @ROUTE /api/v1/Category
 * @method POST
 * @access public
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name, parentCategory, icon } = req.body;
  if (!name ) {
    return res.status(400).json({ message: "Category name is required" });
  }

  // Category Check
  const CategoryCheck = await Category.findOne({name});

  if (CategoryCheck) {
    return res.status(400).json({ message: "Name already exists" });
  }

  // icon check
  let catIcon = null;
  if (icon) {
    catIcon = icon;
  }

  // create brand logo
  let createPhoto = null;
  if (req.file) {
    const photo = await cloudUpload(req); 
    createPhoto = photo.secure_url;   
  }

  // create new Category
  const category = await Category.create({
    name,
    slug: createSlug(name),
    parentCategory: parentCategory ? parentCategory : null,
    icon: catIcon,
    photo: createPhoto ? createPhoto : null
  });

  if (parentCategory) {
    const parent = await Category.findByIdAndUpdate(parentCategory, {
        $push: { subCategory : category._id }
    });
  }

  res.status(200).json({ category, message: "Category create successfully" });
});

/**
 * @DESC Delete Category
 * @ROUTE /api/v1/Category/:id
 * @method DELETE
 * @access public
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  // delete brand logo
  if (category.photo) {
    const publicId = findPublicId(category.photo);
    await cloudDelete(publicId);
  } 

  res.status(200).json({category, message: "Category deleted successfull"});
});

/**
 * @DESC Update Category
 * @ROUTE /api/v1/Category/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, parentCategory, icon } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const catUpdate = await Category.findById(id);

  if (!catUpdate) {
    return res.status(400).json({ message: "Category data not found" });
  }

  // Parent Category
  let parentCat = catUpdate.parentCategory;
  if (parentCategory) {
    parentCat = parentCategory;
  }

  // Category Icon
  let catIcon = catUpdate.icon;
  if (icon) {
    catIcon = icon;
  }

  // Update Category photo
  let updatePhoto = catUpdate.photo;
  if (req.file) {
    const photo = await cloudUpload(req);
    updatePhoto = photo.secure_url;  

    await cloudDelete(findPublicId(catUpdate.photo));
  }

  // Updated Category data
  catUpdate.name = name;
  catUpdate.slug = createSlug(name);
  catUpdate.parentCategory = parentCat;
  catUpdate.icon = catIcon;
  catUpdate.photo = updatePhoto;
  catUpdate.save();

  res.status(200).json({category : catUpdate, message: "Category updated successfull"});
});
