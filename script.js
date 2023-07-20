const body = document.querySelector('.products-block')
const buttonChange = document.querySelector('.buttonChange')
const paginationElements = document.querySelectorAll('.pagination-elements')
const paginationPrev = document.querySelector('#paginationPrevButton')
const paginationNext = document.querySelector('#paginationNextButton')

const formCreate = {
    name: document.querySelector('#formName'),
    description: document.querySelector('#formDescription'),
    quantity: document.querySelector('#formQuantity'),
    price: document.querySelector('#formPrice'),
    btnCreate: document.querySelector('.formButton')
}

const formChange = {
    id: document.querySelector('#takeId'),
    newName: document.querySelector('#changeName'),
    button: document.querySelector('.formButtonChange')
}

let products = []
let countProduct

const getProducts = () => {
    axios.get("http://localhost:4000/products/get-all")
        .then((res) => {
            products = [
                ...res.data
            ]
            countProduct = res.data.length
            renderProducts()
        })
}

const renderProducts = () => { 
    body.innerHTML = ""
    products.forEach(productItem => { 
        body.innerHTML += `
        <div element-id="${productItem.id}" class="block">
            <p>${productItem.name}</p>
            <p>${productItem.quantity}</p>
            <p>${productItem.price}</p>
            <p>${productItem.description}</p>
            <button element-id="${productItem.id}" class="formButtonDelete">Delete</button>
        </div>
        `
    })

    const btnsDelete = document.querySelectorAll(".formButtonDelete")

    btnsDelete.forEach(btnEl => {
        btnEl.addEventListener("click", () => {
            const productId = btnEl.getAttribute("element-id")
            axios.delete(`http://localhost:4000/products/delete?id=${productId}`)
                .then((res) => {
                    getProducts()
                })
        })
    })

}

const currentProductId = "2qQTszjI"

axios.get(`http://localhost:4000/products/get-item?id=${currentProductId}`)
    .then(res => {
        console.log(res.data)
    })

getProducts()

const limit = 10
const page = 1
    
    axios.get(`http://localhost:4000/products/get?page=${page}&limit=${limit}`) 
        .then(res => {
            console.log(res.data)
        })

        axios.get(`http://localhost:4000/products/count`)
            .then(res => {
                console.log(res.data)
            })

formCreate.btnCreate.addEventListener('click', () => { 
    const formData = { 
        name: formCreate.name.value,
        quantity: formCreate.quantity.value,
        price: formCreate.price.value,
        description: formCreate.description.value
    }
    
    axios.post('http://localhost:4000/products/create', {...formData})
        .then(res => { 
            getProducts()
        })
})

formChange.button.addEventListener('click', () => {
    const formChangeData = {
        id: formChange.id.value,
        name: formChange.newName.value
    }

        axios.put(`http://localhost:4000/products/change-price?id=${formChangeData.id}`)
            .then(res => {
                console.log(res.data)
            })
})