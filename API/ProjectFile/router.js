const { createProjectFile,getProjectFile,getProjectFileByID,deleteProjectFile,updateProjectFile } = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/project-group-file', createProjectFile);
router.get('/get-project-group-file',getProjectFile);
router.get('/get-project-group-file-by-id/:id',getProjectFileByID);
router.put('/update-project-group-file/:id',updateProjectFile);
router.delete('/delete-project-group-file/:id',deleteProjectFile)

module.exports = router;
