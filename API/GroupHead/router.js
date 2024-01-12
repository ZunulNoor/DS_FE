const {createGroupHead,getGroupHead,getGroupHeadById,updateGroupHead,deleteGroupHead} = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/group-head', createGroupHead)
router.get('/get-group-head', getGroupHead)
router.get('/get-group-head-by-id/:id', getGroupHeadById)
router.put('/update-group-head/:id', updateGroupHead)
router.delete('/delete-group-head/:id', deleteGroupHead);
module.exports = router