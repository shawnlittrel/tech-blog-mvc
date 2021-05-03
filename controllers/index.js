const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./user-routes.js');
//const dashboardRoutes = require('./dashboard-routes');
//const commentRoutes = require('./comment-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
//router.use('/dashboard', dashboardRoutes);
//router.use('/comments', commentRoutes);

router.use((req, res) => {
     res.status(404).end();
});

module.exports = router;