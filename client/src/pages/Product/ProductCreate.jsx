import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import useFormFields from "../../hooks/useFormFields";
import { createProduct } from "../../features/product/productApiSlice";
import "./ProductCreate.scss";


const ProductCreate = () => {

    const dispatch = useDispatch();
    const { error, message,loader, brand, tag, category } = useSelector((state) => state.product);

   // Local state
   const [ productType, setProductType ] = useState("Simple Product");
   const [ tags, setTags ] = useState(null);
   const [ catSelected, setCatSelected ] = useState([]);
   const [ productPhoto, setProductPhoto ] = useState([]);

    // Product photo manage
    const handleProductPhotoChange = (e) => {
        const uploadFiles = Array.from(e.target.files);
        setProductPhoto((prevState) => ([...prevState, ...uploadFiles ]));
    }

    // handle previous photo delete
    const handlePrevDelete = (file) => {
        const updatePrevphoto = productPhoto.filter((data) => data !== file );
        setProductPhoto(updatePrevphoto);
    }



   // handle form fields
   const {input, handleInputChange, resetForm} = useFormFields({
        name: "",
        shortDesc: "",
        longDesc: "",
        brand: "",
        regularPrice: "",
        salePrice: "",
        stock: 0,
        productLink: null
   });

    // handle category check select
    const handleCatChange = (e) => {
        const selectedCatList = [...catSelected];

        if (catSelected.includes(e.target.value)) {
            selectedCatList.splice(selectedCatList.indexOf(e.target.value, 1));
        }else{
            selectedCatList.push(e.target.value);
        }

        setCatSelected(selectedCatList);

    }    

    // Tag Options
    let tagOptions = [];
    tag?.forEach((item) => {
        tagOptions.push({ value: item._id, label: item.name });
    });   

    // Product create
    const handleProductCreate = (e) => {
        e.preventDefault();

        const form_data = new FormData();
        form_data.append("name", input.name);
        form_data.append("shortDesc", input.shortDesc);
        form_data.append("longDesc", input.longDesc);
        form_data.append("brand", input.brand);
        form_data.append("regularPrice", input.regularPrice);
        form_data.append("salePrice", input.salePrice);
        form_data.append("stock", input.stock);
        form_data.append("tags", tagOptions);
        form_data.append("categories", catSelected);
        form_data.append("productPhoto", productPhoto);

        dispatch(createProduct(form_data));
        console.log(form_data);
    }
       

    
  return (
    <>
        <PageHeader title="Create new Product" />     

        <div className="row">    
            <div className="my-3">
              <Link className="btn btn-primary w-100" to="/product"> All Products </Link>
            </div>
        </div>

        <div className="row">
            <div className="col-xl-12">
                <div className="card flex-fill">
                    <div className="card-header">
                        <h4 className="card-title">Create new Product</h4>
                    </div>
                    <div className="card-body">                        
                        <form onSubmit={handleProductCreate} className="d-flex">
                        <div className="product-left" style={{borderRight:"2px solid #e9e9e9",paddingRight: "30px"}}>
                        <div className="form-group row">
                                <label className="col-lg-3 col-form-label">Product Name</label>
                                <div className="col-lg-9">
                                    <input name="name" onChange={handleInputChange} value={input.name} type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label">Product Type</label>
                                <div className="col-lg-9">
                                    <select className="form-control" name="" id="" onChange={(e) => setProductType(e.target.value)}>
                                        <option value="Simple Product">Simple Product</option>
                                        <option value="Variable Product">Variable Product</option>
                                        <option value="Group Product">Group Product</option>
                                        <option value="External Product">External Product</option>
                                    </select>
                                </div>
                            </div>
                                {/* Form Fields by Steps start */}                                
                                { productType === "Simple Product" &&
                                <>
                                    <div className="simple bg-warning p-2 my-3" style={{borderRadius:"10px"}}>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label">Regular Price</label>
                                        <div className="col-lg-9">
                                            <input name="regularPrice" value={input.regularPrice} onChange={handleInputChange} type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label">Sale Price</label>
                                        <div className="col-lg-9">
                                            <input name="salePrice" value={input.salePrice} onChange={handleInputChange} type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label">Stock</label>
                                        <div className="col-lg-9">
                                            <input name="stock" value={input.stock} onChange={handleInputChange} type="text" className="form-control" />
                                        </div>
                                    </div>                                    
                                    </div>
                                </> }
                                
                                { productType === "Variable Product" && <h1>Variable Product</h1> }
                                { productType === "Group Product" && <h1>Group Product</h1> }
                                { productType === "External Product" && 
                                    <>
                                    <div className="simple bg-info p-2 my-3" style={{borderRadius:"10px"}}>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label text-light">Regular Price</label>
                                        <div className="col-lg-9">
                                            <input name="regularPrice" value={input.regularPrice} onChange={handleInputChange} type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label text-light">Sale Price</label>
                                        <div className="col-lg-9">
                                            <input name="salePrice" value={input.salePrice} onChange={handleInputChange} type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label text-light">Stock</label>
                                        <div className="col-lg-9">
                                            <input name="stock" value={input.stock} onChange={handleInputChange} type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label text-light">Link</label>
                                        <div className="col-lg-9">
                                            <input name="productLink" value={input.productLink} onChange={handleInputChange}  type="text" className="form-control" />
                                        </div>
                                    </div>
                                    </div>
                                    </>
                                }
                                {/* Form Fields by Steps End */}
                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label">Short Desc</label>
                                <div className="col-lg-9">
                                    <textarea type="text" name="shortDesc" onChange={handleInputChange} value={input.shortDesc}  cols="44" rows="5"></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label">Long Desc</label>
                                <div className="col-lg-9">
                                    <textarea type="text" name="longDesc" onChange={handleInputChange} value={input.longDesc} cols="44" rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="product-right" style={{marginLeft:"30px"}}>
                        <div className="form-group row">
                                <label className="col-lg-3 col-form-label">Product Photo</label>
                                <div className="col-lg-9">
                                    <div className="preview-product">
                                        { productPhoto.map((item, index) => {
                                            const prevURL = URL.createObjectURL(item);
                                            return (
                                                <div key={index} className="preview-product-item">
                                                    <span onClick={() =>handlePrevDelete(item)}> <i className="fa fa-times"></i> </span>
                                                    <img src={prevURL} alt="" />
                                                </div>
                                            );
                                        }) }
                                        
                                    </div>
                                    <input onChange={handleProductPhotoChange} type="file" multiple className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                            <label className="col-lg-3 col-form-label">Categories</label>
                                <div className="form-check">
                                    { category?.map((item, index) => {
                                        return(
                                            <label key={index} className="form-check-label d-block">
                                                <input className="form-check-input" value={item._id} type="checkbox" onChange={handleCatChange} checked={catSelected?.includes(item._id) ? true : false } /> {item.name}                                        
                                            </label>
                                        );
                                    }) }                                    
                                </div>                                
                            </div>
                            <div className="form-group row">
                            <label className="col-lg-3 col-form-label">Brand</label>
                            <div className="col-lg-9 p-0">
                                    <select name="brand" onChange={handleInputChange} value={input.brand} id="" className="form-control">
                                    <option value="">-select-</option>
                                    { brand?.map((item, index) => {
                                        return(
                                            <option value={item._id} key={index}>{item.name}</option>
                                        );
                                    }) }    
                                    </select>                                
                                </div>                              
                            </div>
                            <div className="form-group row">
                            <label className="col-lg-3 col-form-label">Tags</label>
                            <div className="col-lg-9 p-0">
                            <Select value={tags} onChange={(tags) => setTags(tags)} options={tagOptions} isMulti />                              
                            </div>                              
                            </div>
                            <div className="text-right">
                                <button type="submit" className="btn btn-primary">Product Create</button>
                            </div>
                        </div>                        
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default ProductCreate