import { useState } from "react";
import DataTable from "react-data-table-component"
import PageHeader from "../../components/PageHeader/PageHeader"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { timeAgo } from "../../helpers/helpers";


const Product = () => {

  const cols = [
    {
        name: "Brand Photo",
        selector: row => <img style={{width: "50px", height:"50px", objectFit: "cover", marginBottom: "10px" }} src={row.logo} />
    },
    {
        name: "Product Name",
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
            <button className="btn btn-sm btn-danger"> <i className="fa fa-trash"></i> </button>
        </>
    },
]

  const { product } = useSelector((state) => state.product);
  const [ search, setSearch ] = useState("");

  // hearch handler
  const handleSearch = (value) => {
      setSearch(value);
  } 



  return (
    <>
         <PageHeader title="All Products" />         

        <div className="row">    
            <div className="my-3">
              <Link className="btn btn-primary w-100" to="/product-create"> Add new Product </Link>
            </div>        
            <DataTable className="shadow" title="All Products Data" selectableRows pagination pointerOnHover fixedHeader subHeader subHeaderComponent={ <input className="form-control" value={search} onChange={(e) => handleSearch(e.target.value)} style={{width: "200px"}} placeholder= "search..." /> } highlightOnHover columns={cols} data={product ? product : []} />
        </div>

    </>
  )
}

export default Product