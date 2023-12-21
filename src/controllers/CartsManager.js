import fs from 'fs'

class CartManager {
    constructor () {
        this.path = './controllers/carts.txt'  
    }

    addCart = (products) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Carts = JSON.parse(content)
        if(!products){
            console.log("El carrito está vacío!")
        }else{
            let id
            let idAuto = () => {
                let maxId = Carts.length
                id = (maxId + 1)
                return id
            }
            
            id = idAuto()
            let newCart = {
                id: id,
                products: products
            }
                return (
                    Carts.push(newCart),
                    fs.writeFileSync(this.path, JSON.stringify(Carts)),
                    console.log(`Carrito con id ${id} añadido correctamente`)
                )
    }
    }

    
    getCarts = () => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Carts = JSON.parse(content)
        return Carts
    }

    getCartById = (cartId) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Carts = JSON.parse(content)
        if (!Carts.some(cart => cart.id === cartId)) {
            return ("El carrito buscado no existe!")
        }else{

            let cartIndex = Carts.findIndex(cart => cart.id === cartId)
            return (Carts[cartIndex])
        }
    }  

    updateCart = (cartId, prodId) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Carts = JSON.parse(content)
        if (!Carts.some(cart => cart.id === parseInt(cartId))) {
            console.log("El carrito buscado no existe!")
        }else{
            let cartIndex = Carts.findIndex(cart => cart.id === parseInt(cartId))
            let updCart = Carts[cartIndex]
            let cartProds = updCart.products
            
            if (!cartProds.some(prod => prod.id === parseInt(prodId))) {
            let newProd = (prodId,1);
            cartProds.push(newProd)      
            
            }else{
                let prodIndex = cartProds.findIndex(prod => prod.id === parseInt(prodId))
                let oldProd = cartProds[prodIndex];
                let oldQty = oldProd.quantity
                let updProd = {
                    id:prodId,
                    quantity: (oldQty + 1)
                    }
                cartProds[prodIndex] = { ...updProd }
            }
            return (

                fs.writeFileSync(this.path, JSON.stringify(Carts)),
                console.log(`Carrito con ID ${cartId} actualizado en su producto con ID ${prodId}`)
                )}
    }

    deleteCart = (cartId) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Carts = JSON.parse(content)
        if (!Carts.some(cart => cart.id === cartId)) {
            console.log("El carrito buscado no existe!")
        }else{
            const cartsFilter = Carts.filter(cart => cart.id !== cartId)

            return (
                fs.writeFileSync(this.path, JSON.stringify(cartsFilter, null, 2)),
                console.log(`Carrito con ID ${cartId} eliminado del listado`)
                )}
    }
}

export default CartManager;
