import multer from "multer";

// multer Storage
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, 
            Date.now() + Math.floor(Math.random() * 1000000) + "-" + file.fieldname
        );
    }
});

// Brand logo multer
export const brandLogo = multer({ storage }).single("logo");
export const categoryPhoto = multer({ storage }).single("catPhoto");
export const productPhoto = multer({ storage }).array("productPhoto");
