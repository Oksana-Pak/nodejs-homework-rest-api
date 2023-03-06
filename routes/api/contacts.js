const express = require('express');

const { getAll, getById, add, updateById, removeById } = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../middelwares');

const router = express.Router();

router.get('/', ctrlWrapper(getAll));

router.get('/:contactId', ctrlWrapper(getById));

router.post('/', ctrlWrapper(add));

router.delete('/:contactId', ctrlWrapper(removeById));

router.put('/:contactId', ctrlWrapper(updateById));

module.exports = router;
