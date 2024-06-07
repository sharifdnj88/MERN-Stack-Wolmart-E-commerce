import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./publicRouter";
import privateRouter from "./privateRouter";
import Layouts from "../layouts/Layouts";

// Create browser router
const router = createBrowserRouter([
    {
        element: <Layouts />,
        children: [...privateRouter, ...publicRouter]
    }
]);



// export router
export default router;