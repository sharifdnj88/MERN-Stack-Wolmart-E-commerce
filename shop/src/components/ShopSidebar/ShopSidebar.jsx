import "./ShopSidebar.scss";

const ShopSidebar = () => {
  return (
    <>
        <aside className="sidebar shop-sidebar sticky-sidebar-wrapper sidebar-fixed">                            
            <div className="sidebar-overlay"></div>
            <a className="sidebar-close" href="#"><i className="close-icon"></i></a>
            <div className="sidebar-content scrollable">
                <div className="sticky-sidebar">
                    <div className="filter-actions">
                        <label>Filter :</label>
                        <a href="#" className="btn btn-dark btn-link filter-clean">Clean All</a>
                    </div>

                    <div className="widget widget-collapsible">
                        <h3 className="widget-title"><span>Search</span></h3>
                        <div className="widget-body">
                            <form className="price-range">
                                <input type="text" name="min_price" style={{width: "100%"}}
                                    placeholder="search..." />
                                <button className="btn btn-primary btn-rounded"> <i className=" fa fa-search"></i> </button>
                            </form>
                        </div>
                    </div>   

                    <div className="widget widget-collapsible">
                        <h3 className="widget-title"><span>All Categories</span></h3>
                        <ul className="widget-body filter-items search-ul">
                            <li><a href="#">Accessories</a></li>
                            <li><a href="#">Babies</a></li>
                            <li><a href="#">Beauty</a></li>
                            <li><a href="#">Decoration</a></li>
                            <li><a href="#">Electronics</a></li>
                            <li><a href="#">Fashion</a></li>
                            <li><a href="#">Food</a></li>
                            <li><a href="#">Furniture</a></li>
                            <li><a href="#">Kitchen</a></li>
                            <li><a href="#">Medical</a></li>
                            <li><a href="#">Sports</a></li>
                            <li><a href="#">Watches</a></li>
                        </ul>
                    </div>

                    <div className="widget widget-collapsible">
                        <h3 className="widget-title"><span>Tags</span></h3>      
                        <div className="tags-list">
                            <a href="#">Electronics</a>
                            <a href="#">Men</a>
                            <a href="#">EID</a>
                            <a href="#">Puja</a>
                        </div>                 
                    </div>

                    <div className="widget widget-collapsible">
                        <h3 className="widget-title"><span>Price</span></h3>
                        <div className="widget-body">
                            <form className="price-range">
                                <input type="number" name="min_price" className="min_price text-center"
                                    placeholder="$min" /><span className="delimiter">-</span><input
                                    type="number" name="max_price" className="max_price text-center"
                                    placeholder="$max" /><a href="#"
                                    className="btn btn-primary btn-rounded">Go</a>
                            </form>
                        </div>
                    </div>                                    

                    <div className="widget widget-collapsible">
                        <h3 className="widget-title"><span>Brand</span></h3>
                        <ul className="widget-body filter-items item-check mt-1">
                            <li><a href="#">Elegant Auto Group</a></li>
                            <li><a href="#">Green Grass</a></li>
                            <li><a href="#">Node Js</a></li>
                            <li><a href="#">NS8</a></li>
                            <li><a href="#">Red</a></li>
                            <li><a href="#">Skysuite Tech</a></li>
                            <li><a href="#">Sterling</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    </>
  )
}

export default ShopSidebar