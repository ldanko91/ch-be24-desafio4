import {Router} from "express";
const router = Router();

import CartManager from "./CartsManager.js";
const manager1 = new CartManager()

router.get('/', async (req,res)=>{
    let {limit} = req.query
    
    if (limit){
        const carts = await manager1.getCarts();
        const limitCarts = carts.slice(0,(limit))
        res.json({payload:limitCarts})     
    }else{
    const carts = await manager1.getCarts();
    res.json({payload:carts})
    }
})

router.get('/:cid', async (req,res)=>{
    const cId = parseInt(req.params.cid)
    const cart = await manager1.getCartById(cId);
    const cartProds = cart.products
    res.json({payload:cartProds})
})

router.post('/', async (req,res)=>{
    const {products} = req.body
    let newCart = await manager1.addCart(products);
    res.send(`Nuevo carrito añadido correctamente`)
})

router.post('/:cid/product/:pid', async (req,res)=>{
    const cId = parseInt(req.params.cid)
    const pId = parseInt(req.params.pid)
    let updCart = await manager1.updateCart(cId,pId);
    res.send(`Producto con id ${pId} añadido correctamente al Carrito con id: ${cId}`)
})

router.delete('/:cid', async (req,res)=>{
    const cId = parseInt(req.params.cid)
    const delCart = await manager1.deleteCart(cId);
    res.send(`Carrito con id: ${cId} eliminado del listado`)
})

export default router;