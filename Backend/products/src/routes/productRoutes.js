import express from "express";
import { saludar, deleteProduct, getProduct, createProduct, updateProduct } from "../controllers/productControllers.js";
import upload from "../config/imageConfig.js";

const router = express.Router();

router.get('/test', saludar);
router.get('/', getProduct);
router.post('/', upload.single("photo") , createProduct);
router.patch('/:id', upload.single('photo'), updateProduct);
router.delete('/:id', deleteProduct);

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: The users managing API
 *
 * /api/users:
 *   get:
 *     summary: Get all Users
 *     tags: 
 *       - Users
 *     responses:
 *       200:
 *         description: A successful response
 *   post:
 *     summary: Register a new user
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: Juan carlos Bodoque
 *               password:
 *                 type: string
 *                 example: BodoqueJuan@gmail.com
 *               phone:
 *                 type: string
 *                 example: 14862562145
 *     responses:
 *       201:
 *         description: User successfully created
 * /api/users/{id}:
 *   patch:
 *     summary: Update user information
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: 698412365265
 *               password:
 *                 type: string
 *                 example: xsertbnjuytfvbhgf
 *     responses:
 *       200:
 *         description: User successfully updated
 *   delete:
 *     summary: Delete a user
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User successfully deleted
 */


export default router;

