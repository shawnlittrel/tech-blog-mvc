const router = require('express').Router();

const apiRoutes = require('./api');
//REPLACE THIS WITH APPLICABLE ROUTES
//const homeRoutes = require('./home-routes.js');
//const dashboardRoutes = require('./dashboard-routes');

router.use('/api', apiRoutes);
//router.use('/', homeRoutes);
//router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
     res.status(404).end();
});

module.exports = router;