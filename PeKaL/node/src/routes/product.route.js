const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear usuario
 *     description: Crea un nuevo usuario
 *     operationId: createUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Información del usuario
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: John Doe
 *             email:
 *               type: string
 *               example: johndoe@example.com
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 1
 *             name:
 *               type: string
 *               example: John Doe
 *             email:
 *               type: string
 *               example: johndoe@example.com
 *       400:
 *         description: Error en la petición
 */

// Create a product
router.post('/create', productController.create);

// Retrieve all product
router.get('/', productController.findAll);

// Delete a product
router.delete('/:id', productController.delete);

module.exports = router;