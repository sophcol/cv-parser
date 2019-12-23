const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads/')
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage});

const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/users')
    .post(upload.single("Notefile"),controller.add)
    .get(validateToken, controller.getAll); // This route is now protected

  router.route('/login')
    .post(controller.login);
};