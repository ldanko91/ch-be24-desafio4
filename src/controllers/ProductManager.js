import fs from 'fs'

class ProductManager {
    constructor (title, description, price, thumbnail, code, stock, status, category) {
        this.title=title
        this.description=description
        this.price=price
        this.thumbnail=thumbnail
        this.code=code
        this.stock = stock
        this.status = true
        this.category = category
        this.path = './controllers/products.txt'  
    }


    addProduct = (title, description, price, thumbnail, code, stock, status, category) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Products = JSON.parse(content)
        if(!title || !description || !price || !thumbnail || !code || !stock || !status || !category) {
            console.log("Todos los campos son obligatorios!")
        }else{
            if (Products.some(producto => producto.code === code)) {
                console.log("El campo code ya existe!")
            }else{
            let id
            let idAuto = () => {
                let maxId = Products.length
                id = (maxId + 1)
                return id
            }
            
            id = idAuto()
            let newProd = {
                id: id,
                title:title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code:code,
                stock: stock,
                status: status,
                category: category
            }
                return (
                    Products.push(newProd),
                    fs.writeFileSync(this.path, JSON.stringify(Products)),
                    console.log(`Producto con id ${id} añadido correctamente`)
                )
    }
    }
    }
    
    getProducts = () => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Products = JSON.parse(content)
        return Products
    }

    getProductById = (prodId) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Products = JSON.parse(content)
        if (!Products.some(producto => producto.id === prodId)) {
            return ("El producto buscado no existe!")
        }else{

            let prodIndex = Products.findIndex(producto => producto.id === prodId)
            return (Products[prodIndex])
        }
    }  

    updateProduct = (prodId, title, description, price, thumbnail, code, stock, status, category) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Products = JSON.parse(content)
        if (!Products.some(producto => producto.id === parseInt(prodId))) {
            console.log("El producto buscado no existe!")
        }else{
            let updatedProd = {
                id: prodId,
                title:title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code:code,
                stock: stock,
                status: status,
                category: category
            }
            let prodIndex = Products.findIndex(prod => prod.id === parseInt(prodId))

            Products[prodIndex] = { ...updatedProd } 

            return (

                fs.writeFileSync(this.path, JSON.stringify(Products)),
                console.log(`Producto con ID ${prodId} actualizado correctamente`)
                )}
    }

    deleteProduct = (prodId) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Products = JSON.parse(content)
        if (!Products.some(producto => producto.id === prodId)) {
            console.log("El producto buscado no existe!")
        }else{
            const productsFilter = Products.filter(prod => prod.id !== prodId)

            return (
                fs.writeFileSync(this.path, JSON.stringify(productsFilter, null, 2)),
                console.log(`Producto con ID ${prodId} eliminado del listado`)
                )}
    }
}

export default ProductManager;

// const Manager1 = new ProductManager;

// // //Muestra inicial
// // Manager1.getProducts()

// // //Prueba código repetido
// // console.log("Prueba producto repetido")
// // Manager1.addProduct("prueba1", "producto de pruebas", 100, "foto.jpg", "abc123", 10)

// //Prueba atributo faltante
// // console.log("Prueba atributo faltante")
// // Manager1.addProduct("prueba1", "producto de pruebas", 100,  "abz123", 10)

// //Añadir productos
// Manager1.addProduct("añadido1", "description1", 125, "foto2.jpg", "azz123", 5)
// Manager1.addProduct("añadido2", "description2", 250, "foto332.jpg", "a5z123", 15)
// Manager1.addProduct("añadido3", "description3", 1225, "foto1222.jpg", "azz1423", 22)
// Manager1.addProduct("añadido5", "description4", 900, "foto21.jpg", "az63", 12)
// Manager1.addProduct("añadido6", "description5", 7900, "foto22.jpg", "az37", 222)
// Manager1.addProduct("añadido7", "description6", 4900, "foto23.jpg", "az38", 24)
// Manager1.addProduct("añadido8", "description7", 900900, "foto42.jpg", "az39", 52)
// Manager1.addProduct("añadido9", "description8", 45900, "foto212.jpg", "az103", 62)

// //Mostrar productos añadidos
// Manager1.getProducts()

// // //Buscar producto por ID
// // console.log("Búsqueda por ID")
// // Manager1.getProductById(2)

// // //Búsqueda ID inexistente
// // console.log("Búsqueda ID inexistente")
// // Manager1.getProductById(8)

// // //Actualizar producto por ID
// // console.log("Actualizar producto por ID")
// // Manager1.updateProduct(3,"editado3", "descriptionedited3", 121225, "edited.jpg", "edit-azz1423", 44)

// // //Borrar producto por ID
// // console.log("Borrar producto por ID")
// // Manager1.deleteProduct(2)

// // //Mostrar productos editados
// // Manager1.getProducts()