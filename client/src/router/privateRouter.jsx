import PageLayout from "../components/PageLayout/PageLayout";
import Brand from "../pages/Brand/Brand";
import Category from "../pages/Category/Category";
import Dashboard from "../pages/Dashboard/Dashboard";
import Permission from "../pages/Permission/Permission";
import Product from "../pages/Product/Product";
import ProductCreate from "../pages/Product/ProductCreate";
import Role from "../pages/Role/Role";
import Tag from "../pages/Tag/Tag";
import User from "../pages/User/User";
import PrivateGard from "./PrivateGard"

// Private Router
const privateRouter = [
    {
        element: <PageLayout />,
        children: [
            {
                element: <PrivateGard />,
                children: [
                    {
                        path: "/",
                        element: <Dashboard />
                    },
                    {
                        path: "/users",
                        element: <User />
                    },
                    {
                        path: "/role",
                        element: <Role />
                    },
                    {
                        path: "/permission",
                        element: <Permission />
                    },
                    {
                        path: "/brand",
                        element: <Brand />
                    },
                    {
                        path: "/tag",
                        element: <Tag />
                    },
                    {
                        path: "/category",
                        element: <Category />
                    },
                    {
                        path: "/product",
                        element: <Product />
                    },
                    {
                        path: "/product-create",
                        element: <ProductCreate />
                    },
                ],
            }
        ]
    }
    
];



// export
export default privateRouter;