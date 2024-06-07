import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from 'react-data-table-component';
import "@rakan/bootstrap4rtl"; 
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormFields from "../../hooks/useFormFields.js";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { createProductCategory, deleteProductCategory, getAllProductCategories } from "../../features/product/productApiSlice.js";
import { setMessageEmpty } from "../../features/product/productSlice.js";
import { errorToast } from "../../utils/toast.js";
import { timeAgo } from "../../helpers/helpers.js";

const Category = () => {

    const cols = [
        {
            name: "SN",
            selector: (row, index) => (index + 1)
        },
        {
            name: "Photo",
            selector: row => <img style={{width: "50px", height:"50px", objectFit: "cover", marginBottom: "10px" }} src={row.photo} />
        },
        {
            name: "Category Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Slug",
            selector: row => row.slug
        },
        {
            name: "Sub Category",
            selector: row => <ul> {row.subCategory?.map((item, index) => <li key={index}>{item?.name}</li> )} </ul>
        },
        {
            name: "Created At",
            selector: row => timeAgo(new Date(row.createdAt))
        },
        {
            name: "Status",
            selector: row => (
                <div className="status-toggle">
                    <input type="checkbox" id="status_1" className="check" checked />
                    <label htmlFor="status_1" className="checktoggle">checkbox</label>
                </div>
            )
        },
        {
            name: "Actions",
            selector: row => <>
                <button  data-toggle="modal" data-target="#roleEdit" className="btn btn-sm btn-warning mr-1"> <i className="fa fa-edit"></i> </button>
                <button onClick={() => handleProductCategoryDelete(row._id)} className="btn btn-sm btn-danger"> <i className="fa fa-trash"></i> </button>
            </>
        },
    ]

    const dispatch = useDispatch();
    const { error, message,loader, category } = useSelector((state) => state.product);
    const [ catPrev, setCatPrev ] = useState(null);
    const [ search, setSearch ] = useState("");

    // search handler
    const handleSearch = (value) => {
        setSearch(value);
    } 

    // handle form fields
    const {input, handleInputChange, resetForm} = useFormFields({
        name: "",
        parent: "",
        icon: ""
    });


    // handle Category photo preview
    const handleCatPreview = (e) => {
        setCatPrev(e.target.files[0]);
    }

    // handle Create Category
    const handleCreateCategory = (e) => {
        e.preventDefault();

        const form_data = new FormData();
        form_data.append("name", input.name);
        form_data.append("icon", input.icon);
        form_data.append("parentCategory", input.parent);
        form_data.append("catPhoto", catPrev);

        dispatch(createProductCategory(form_data));
        resetForm();

    }

     // handle brand delete
     const handleProductCategoryDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteProductCategory(id));
            } else {
                swal("Your data safe", {
                    icon: "success",
                  });
            }
          }); 
    }

    useEffect(() => {
		if (error) {
			errorToast(error);
			dispatch(setMessageEmpty());
		}
		if (message) {
			errorToast(message, "success");
			dispatch(setMessageEmpty());
		}
	},[error, message, dispatch]);

    // dataTable Subcategory Reload
    useEffect(() => {
        dispatch(getAllProductCategories());
    }, [category]);

  return (
    <>
        <PageHeader title="Category" />

        <ModalPopup target="CatModalPopup">
            <form onSubmit={handleCreateCategory}>
                <div className="my-3">
                    <label htmlFor="">Category Name</label>
                    <input name="name" value={input.name} onChange={handleInputChange} className="form-control" type="text" />
                </div>
                <div className="my-3">
                    <label htmlFor="">Parent Name</label>
                    <select name="parent" className="form-control" value={input.parent} onChange={handleInputChange} id="">
                        <option value="">-select-</option>
                        {category?.map((pcat, index) => {
                            return( 
                                <option value={pcat._id} key={index}>{pcat.name}</option>
                             );
                        })}
                    </select>
                </div>
                <div className="my-3">
                    <label htmlFor="">Category Icon</label>
                    <input name="icon" value={input.icon} onChange={handleInputChange} className="form-control" type="text" />
                </div>
                <div className="my-3">
                {catPrev && <img style={{width:"100%"}} src={catPrev && URL.createObjectURL(catPrev) } alt="" /> }
                </div>
                <div className="my-3">
                    <label htmlFor="">Category Photo</label>
                    <input name="photo" onChange={(e) => handleCatPreview(e)} className="form-control" type="file" />
                </div>
                <div className="my-3">
                    <button className="btn btn-primary w-100" type="submit"> <span>{loader ?"Creating..." : "Add new Category" }</span> </button>
                </div>
            </form>
        </ModalPopup>

        <div className="row">
            <div className="col-md-12">
                <button className="btn btn-primary my-2" data-target="#CatModalPopup" data-toggle="modal">Add new Category</button>                                
            </div>
            <DataTable className="shadow" title="All Brands Data" selectableRows pagination pointerOnHover fixedHeader subHeader subHeaderComponent={ <input className="form-control" value={search} onChange={(e) => handleSearch(e.target.value)} style={{width: "200px"}} placeholder= "search..." /> } highlightOnHover columns={cols} data={category ? category : []} />
        </div>
    </>
  )
}

export default Category