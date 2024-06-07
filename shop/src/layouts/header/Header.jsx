import logo from "../../assets/images/logo.png";
import flag from "../../assets/images/flags/eng.png";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
  return (
    <>
      <h1 className="d-none">Wolmart - Responsive Marketplace HTML Template</h1> 
      <header className="header">
            <div className="header-top">
                <div className="container">
                    <div className="header-left">
                        <p className="welcome-msg">Welcome to Wolmart Store message or remove it!</p>
                    </div>
                    <div className="header-right">
                        <div className="dropdown">
                            <a href="#currency">USD</a>
                            <div className="dropdown-box">
                                <a href="#USD">USD</a>
                                <a href="#EUR">EUR</a>
                            </div>
                        </div>

                        <div className="dropdown">
                            <a href="#language"><img src={flag} alt="ENG Flag" width="14"
                                    height="8" className="dropdown-image" /> ENG</a>
                            <div className="dropdown-box">
                                <a href="#ENG">
                                    <img src={flag} alt="ENG Flag" width="14" height="8"
                                        className="dropdown-image" />
                                    ENG
                                </a>
                                <a href="#FRA">
                                    <img src={flag} alt="FRA Flag" width="14" height="8"
                                        className="dropdown-image" />
                                    FRA
                                </a>
                            </div>
                        </div>

                        <span className="divider d-lg-show"></span>
                        <a href="blog.html" className="d-lg-show">Blog</a>
                        <a href="contact-us.html" className="d-lg-show">Contact Us</a>
                        <a href="my-account.html" className="d-lg-show">My Account</a>
                        <a href="assets/ajax/login.html" className="d-lg-show login sign-in"><i
                                className="w-icon-account"></i>Sign In</a>
                        <span className="delimiter d-lg-show">/</span>
                        <a href="assets/ajax/login.html" className="ml-0 d-lg-show login register">Register</a>
                    </div>
                </div>
            </div>

            <div className="header-middle">
                <div className="container">
                    <div className="header-left mr-md-4">
                        <a href="#" className="mobile-menu-toggle  w-icon-hamburger" aria-label="menu-toggle">
                        </a>
                        <Link to="/" className="logo ml-lg-0">
                            <img src={logo} alt="logo" width="144" height="45" />
                        </Link>
                        <form method="get" action="#"
                            className="header-search hs-expanded hs-round d-none d-md-flex input-wrapper">
                            <div className="select-box">
                                <select id="category" name="category">
                                    <option value="">All Categories</option>
                                    <option value="4">Fashion</option>
                                    <option value="5">Furniture</option>
                                    <option value="6">Shoes</option>
                                    <option value="7">Sports</option>
                                    <option value="8">Games</option>
                                    <option value="9">Computers</option>
                                    <option value="10">Electronics</option>
                                    <option value="11">Kitchen</option>
                                    <option value="12">Clothing</option>
                                </select>
                            </div>
                            <input type="text" className="form-control" name="search" id="search" placeholder="Search in..."
                                required />
                            <button className="btn btn-search" type="submit"><i className="w-icon-search"></i>
                            </button>
                        </form>
                    </div>
                    <div className="header-right ml-4">
                        <div className="header-call d-xs-show d-lg-flex align-items-center">
                            <a href="tel:#" className="w-icon-call"></a>
                            <div className="call-info d-lg-show">
                                <h4 className="chat font-weight-normal font-size-md text-normal ls-normal text-light mb-0">
                                    <a href="mailto:#" className="text-capitalize">Live Chat</a> or :</h4>
                                <a href="tel:#" className="phone-number font-weight-bolder ls-50">0(800)123-456</a>
                            </div>
                        </div>
                        <a className="wishlist label-down link d-xs-show" href="wishlist.html">
                            <i className="w-icon-heart"></i>
                            <span className="wishlist-label d-lg-show">Wishlist</span>
                        </a>
                        <a className="compare label-down link d-xs-show" href="compare.html">
                            <i className="w-icon-compare"></i>
                            <span className="compare-label d-lg-show">Compare</span>
                        </a>
                        <div className="dropdown cart-dropdown cart-offcanvas mr-0 mr-lg-2">
                            <div className="cart-overlay"></div>
                            <a href="#" className="cart-toggle label-down link">
                                <i className="w-icon-cart">
                                    <span className="cart-count">2</span>
                                </i>
                                <span className="cart-label">Cart</span>
                            </a>
                            <div className="dropdown-box">
                                <div className="cart-header">
                                    <span>Shopping Cart</span>
                                    <a href="#" className="btn-close">Close<i className="w-icon-long-arrow-right"></i></a>
                                </div>

                                <div className="products">
                                    <div className="product product-cart">
                                        <div className="product-detail">
                                            <a href="product-default.html" className="product-name">Beige knitted
                                                elas<br />tic
                                                runner shoes</a>
                                            <div className="price-box">
                                                <span className="product-quantity">1</span>
                                                <span className="product-price">$25.68</span>
                                            </div>
                                        </div>
                                        <figure className="product-media">
                                            <a href="product-default.html">
                                                <img src="assets/images/cart/product-1.jpg" alt="product" height="84"
                                                    width="94" />
                                            </a>
                                        </figure>
                                        <button className="btn btn-link btn-close" aria-label="button">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>

                                    <div className="product product-cart">
                                        <div className="product-detail">
                                            <a href="product-default.html" className="product-name">Blue utility
                                                pina<br />fore
                                                denim dress</a>
                                            <div className="price-box">
                                                <span className="product-quantity">1</span>
                                                <span className="product-price">$32.99</span>
                                            </div>
                                        </div>
                                        <figure className="product-media">
                                            <a href="product-default.html">
                                                <img src="assets/images/cart/product-2.jpg" alt="product" width="84"
                                                    height="94" />
                                            </a>
                                        </figure>
                                        <button className="btn btn-link btn-close" aria-label="button">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-total">
                                    <label>Subtotal:</label>
                                    <span className="price">$58.67</span>
                                </div>

                                <div className="cart-action">
                                    <a href="cart.html" className="btn btn-dark btn-outline btn-rounded">View Cart</a>
                                    <a href="checkout.html" className="btn btn-primary  btn-rounded">Checkout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

              <div className="header-bottom sticky-content fix-top sticky-header has-dropdown">
                  <div className="container">
                      <div className="inner-wrap">
                          <div className="header-left">
                              {/* <div className="dropdown category-dropdown has-border" data-visible="true">
                                  <a href="#" className="category-toggle text-dark" role="button" data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="true" data-display="static"
                                      title="Browse Categories">
                                      <i className="w-icon-category"></i>
                                      <span>Browse Categories</span>
                                  </a>

                                  <div className="dropdown-box">
                                      <ul className="menu vertical-menu category-menu">
                                          <li>
                                              <a href="shop-fullwidth-banner.html">
                                                  <i className="w-icon-tshirt2"></i>Fashion
                                              </a>
                                          </li>
                                          <li>
                                              <a href="shop-fullwidth-banner.html">
                                                  <i className="w-icon-home"></i>Home & Garden
                                              </a>
                                          </li>
                                          <li>
                                              <a href="shop-fullwidth-banner.html">
                                                  <i className="w-icon-electronics"></i>Electronics
                                              </a>
                                          </li>
                                          <li>
                                              <a href="shop-fullwidth-banner.html">
                                                  <i className="w-icon-furniture"></i>Furniture
                                              </a>
                                          </li>
                                          <li>
                                              <a href="shop-fullwidth-banner.html">
                                                  <i className="w-icon-heartbeat"></i>Healthy & Beauty
                                              </a>
                                          </li>
                                          <li>
                                              <a href="shop-fullwidth-banner.html">
                                                  <i className="w-icon-gift"></i>Gift Ideas
                                              </a>
                                          </li>
                                          <li>
                                              <a href="shop-fullwidth-banner.html">
                                                  <i className="w-icon-gamepad"></i>Toy & Games
                                              </a>
                                          </li>
                                          <li>
                                              <a href="shop-fullwidth-banner.html">
                                                  <i className="w-icon-ice-cream"></i>Cooking
                                              </a>
                                          </li>
                                          <li>
                                              <a href="shop-fullwidth-banner.html">
                                                  <i className="w-icon-ios"></i>Smart Phones
                                              </a>
                                          </li>
                                          <li>
                                              <a href="shop-fullwidth-banner.html">
                                                  <i className="w-icon-camera"></i>Cameras & Photo
                                              </a>
                                          </li>
                                          <li>
                                              <a href="shop-fullwidth-banner.html">
                                                  <i className="w-icon-ruby"></i>Accessories
                                              </a>
                                          </li>
                                          <li>
                                              <a href="shop-banner-sidebar.html"
                                                  className="font-weight-bold text-primary text-uppercase ls-25">
                                                  View All Categories<i className="w-icon-angle-right"></i>
                                              </a>
                                          </li>
                                      </ul>
                                  </div>
                              </div> */}
                              <nav className="main-nav">
                                  <ul className="menu active-underline">
                                      <li className={ location.pathname == "/" ? "active" : "" } >
                                          <Link to="/">Home</Link>
                                      </li>
                                      <li className={ location.pathname == "/shop" ? "active" : "" }>
                                      <Link to="/shop">Shop</Link>
                                      </li>                                      
                                      <li>
                                      <Link to="/">Blog</Link>                                        
                                      </li>
                                      <li className={ location.pathname == "/cart" ? "active" : "" }>
                                      <Link to="/cart">Cart</Link>                                         
                                      </li>
                                      <li className={ location.pathname == "/checkout" ? "active" : "" }>
                                          <Link to="/checkout">Checkout</Link>                                         
                                      </li>
                                      <li className={ location.pathname == "/account" ? "active" : "" }>
                                      <Link to="/account">Account</Link>
                                      </li>
                                  </ul>
                              </nav>
                          </div>
                          <div className="header-right">
                              <a href="#" className="d-xl-show"><i className="w-icon-map-marker mr-1"></i>Track Order</a>
                              <a href="#"><i className="w-icon-sale"></i>Daily Deals</a>
                          </div>
                      </div>
                  </div>
              </div>
      </header>
    </>
  )
}

export default Header