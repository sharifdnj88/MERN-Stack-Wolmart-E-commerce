import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from 'react-data-table-component';
import "@rakan/bootstrap4rtl"; 
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormFields from "../../hooks/useFormFields.js";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import "./Brand.scss";
import { createBrand, deleteBrand } from "../../features/product/productApiSlice.js";
import { setMessageEmpty } from "../../features/product/productSlice.js";
import { errorToast } from "../../utils/toast.js";
import { timeAgo } from "../../helpers/helpers.js";

const Brand = () => {

    const cols = [
        {
            name: "Brand Logo",
            selector: row => <img style={{width: "50px", height:"50px", objectFit: "cover", marginBottom: "10px" }} src={row.logo} />
        },
        {
            name: "Brand Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Slug",
            selector: row => row.slug
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
                <button onClick={() => handleBrandDelete(row._id)} className="btn btn-sm btn-danger"> <i className="fa fa-trash"></i> </button>
            </>
        },
    ]

    const dispatch = useDispatch();
    const { error, message,loader, brand } = useSelector((state) => state.product);
    const [ logo, setLogo ] = useState(null);
    const [ logoPrev, setLogoPrev ] = useState(null);
    const [ search, setSearch ] = useState("");

    // handle form fields
    const {input, handleInputChange, resetForm} = useFormFields({
        name: ""
    });

    // handle logo change
    const handlePreviewChange = (e) => {
        setLogo(e.target.files[0]);
        setLogoPrev(URL.createObjectURL(e.target.files[0]));
    }

    // Brand create
    const handleBrandCreate = (e) => {
        e.preventDefault();

        const form_data = new FormData();
        form_data.append("name", input.name);
        form_data.append("logo", logo);
        dispatch(createBrand(form_data));
        resetForm();
        setLogoPrev();
        setLogo("");

    }

    // hearch handler
    const handleSearch = (value) => {
        setSearch(value);
    } 

    // handle brand delete
    const handleBrandDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteBrand(id));
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



    
  return (
    <>
        <PageHeader title="Brand" />

        <ModalPopup target="BrandModalPopup">
            <form onSubmit={handleBrandCreate}>
                <div className="my-3">
                    <label htmlFor="">Brand Name</label>
                    <input name="name" value={input.name} onChange={handleInputChange} className="form-control" type="text" />
                </div>
                <div className="my-3 brand-logo">
                {logoPrev && <img src={logoPrev} alt="" /> }
                </div>
                <div className="my-3">
                    <label htmlFor="">Brand Logo</label>
                    <input name="logo" onChange={(e) => handlePreviewChange(e)} className="form-control" type="file" />
                </div>
                <div className="my-3">
                    <button className="btn btn-primary w-100" type="submit"> <span>{loader ?"Creating..." : "Add new Brand" }</span> </button>
                </div>
            </form>
        </ModalPopup>

        <div className="row">
            <div className="col-md-12">
                <button className="btn btn-primary my-2" data-target="#BrandModalPopup" data-toggle="modal">Add new Brand</button>                                
            </div>
            <DataTable className="shadow" title="All Brands Data" selectableRows pagination pointerOnHover fixedHeader subHeader subHeaderComponent={ <input className="form-control" value={search} onChange={(e) => handleSearch(e.target.value)} style={{width: "200px"}} placeholder= "search..." /> } highlightOnHover columns={cols} data={brand ? brand : []} />
        </div>
    </>
  )
}

export default Brand;