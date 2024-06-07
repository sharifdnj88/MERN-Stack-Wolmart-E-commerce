import asyncHandler from "express-async-handler";
import { createSlug } from "../helper/slug.js";
import Tag from "../models/Tag.js";

/**
 * @DESC Get all Tags data
 * @ROUTE /api/v1/Tag
 * @method GET
 * @access public
 */
export const getAllTag = asyncHandler(async (req, res) => {
  const tags = await Tag.find();

  if (tags.length > 0) {
    res.status(200).json({tags});
  }else{
    res.status(200).json({message: "Tag data not found"});
  }

});

/**
 * @DESC Get Single Tags data
 * @ROUTE /api/v1/Tag/:id
 * @method GET
 * @access public
 */
export const getSingleTag = asyncHandler(async (req, res) => {
  const  { id }  = req.params;
  const tag = await Tag.findById(id); 
  if (!tag) {
    return res.status(404).json({ message: "Tag data not found" });
  }else{
      res.status(200).json(tag);
  }

});

/**
 * @DESC Create new Tag
 * @ROUTE /api/v1/Tag
 * @method POST
 * @access public
 */
export const createTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name ) {
    return res.status(400).json({ message: "Tag name is required" });
  }

  // Tag Check
  const TagCheck = await Tag.findOne({name});

  if (TagCheck) {
    return res.status(400).json({ message: "Name already exists" });
  }

  // create new Tag
  const tag = await Tag.create({
    name,
    slug: createSlug(name)
  });

  res.status(200).json({ tag, message: "Tag create successfully" });
});

/**
 * @DESC Delete Tag
 * @ROUTE /api/v1/Tag/:id
 * @method DELETE
 * @access public
 */
export const deleteTag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.findByIdAndDelete(id);
  res.status(200).json({tag, message: "Tag deleted successfull"});
});

/**
 * @DESC Update Tag
 * @ROUTE /api/v1/Tag/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateTag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Tag name is required" });
  }

  const tag = await Tag.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name)      
    },
    { new: true }
  );

  res.status(200).json({tag, message: "Tag updated successfull"});
});
