import {Router} from "express";
const router = Router();

import ProductManager from './ProductManager.js'
const manager1 = new ProductManager()

router.get('/', async (req,res)=>{
    let {limit} = req.query
    
    if (limit){
        const products = await manager1.getProducts();
        const limitProds = products.slice(0,(limit))
        res.json({payload:limitProds})     
    }else{
    const products = await manager1.getProducts();
    res.json({payload:products})
    }
})

router.get('/:pid', async (req,res)=>{
    const pId = parseInt(req.params.pid)
    const product = await manager1.getProductById(pId);
    res.json({payload:product})
})

router.post('/', async (req,res)=>{
    const {title, description, price, thumbnail, code, stock, status, category} = req.body
    let newProd = await manager1.addProduct(title, description, price, thumbnail, code, stock, status, category);
    res.send(`Nuevo producto con código: ${code} añadido correctamente`)
})

router.put('/:pid', async (req,res)=>{
    const id = parseInt(req.params.pid)
    const {title, description, price, thumbnail, code, stock, status, category} = req.body
    let updProd = await manager1.updateProduct(id,title, description, price, thumbnail, code, stock, status, category);
    res.send(`Producto con id: ${id} modificado correctamente`)
})

router.delete('/:pid', async (req,res)=>{
    const pId = parseInt(req.params.pid)
    const delProd = await manager1.deleteProduct(pId);
    res.send(`Producto con id: ${pId} eliminado del listado`)
})

export default router;