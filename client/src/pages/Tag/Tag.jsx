import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from 'react-data-table-component';
import "@rakan/bootstrap4rtl"; 
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormFields from "../../hooks/useFormFields.js";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { createProductTag, deleteProductTag } from "../../features/product/productApiSlice.js";
import { setMessageEmpty } from "../../features/product/productSlice.js";
import { errorToast } from "../../utils/toast.js";
import { timeAgo } from "../../helpers/helpers.js";
import "./Tag.scss"

const Tag = () => {

    const cols = [        
        {
            name: "Tag Name",
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
    const { error, message,loader, tag } = useSelector((state) => state.product);
    const [ search, setSearch ] = useState("");

    // hearch handler
    const handleSearch = (value) => {
        setSearch(value);
    } 

    // handle form fields
    const {input, handleInputChange, resetForm} = useFormFields({
        name: ""
    });

    // handle Tag Create
    const handleTagCreate = (e) => {
        e.preventDefault()
        dispatch(createProductTag({name: input.name}));
        resetForm();
    }

    // handle Tag delete
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
                dispatch(deleteProductTag(id));
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
        <PageHeader title="Tag" />

        <ModalPopup target="TagModalPopup">
            <form onSubmit={handleTagCreate}>
                <div className="my-3">
                    <label htmlFor="">Tag Name</label>
                    <input name="name" value={input.name} onChange={handleInputChange} className="form-control" type="text" />
                </div>
                <div className="my-3">
                    <button className="btn btn-primary w-100" type="submit"> <span>{loader ?"Creating..." : "Add new Tag" }</span> </button>
                </div>
            </form>
        </ModalPopup>

        <div className="row">
            <div className="col-md-12">
                <button className="btn btn-primary my-2" data-target="#TagModalPopup" data-toggle="modal">Add new Tag</button>                                
            </div>
            <DataTable className="shadow" title="All Tags Data" selectableRows pagination pointerOnHover fixedHeader subHeader subHeaderComponent={ <input className="form-control" value={search} onChange={(e) => handleSearch(e.target.value)} style={{width: "200px"}} placeholder= "search..." /> } highlightOnHover columns={cols} data={tag ? tag : []} />
        </div>
    </>
  )
}

export default Tag;