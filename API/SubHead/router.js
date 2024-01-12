const {createSubHead,getSubHead,getSubHeadById,updateSubHead,deleteSubHead} = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/sub-head', createSubHead)
router.get('/get-sub-head', getSubHead)
router.get('/get-sub-head-by-id/:id', getSubHeadById)
router.put('/update-sub-head/:id', updateSubHead)
router.delete('/delete-sub-head/:id', deleteSubHead);

module.exports = router