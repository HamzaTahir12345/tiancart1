import queryString from 'query-string'
import axios from 'axios'

export const getProducts = (sortBy) => {
    return fetch(`http://localhost:8000/api/products/?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            const arr = response.json()
            // console.log(arr , "---------------Response---------------")
            return arr
        })
        .catch(err => {
            console.log(err)
        })
}

export const createOrder = (userId, token, createorderData) => {
    return fetch(`http://localhost:8000/api/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createorderData })
    })
        .then(response => {
            return response.json()

        })
        .catch(err => {
            console.log(err)
        })
}

export const paypalPayment = (userId, token, data) => {

    // const headers = {
    //     Accept: 'application/json',
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`
    // };
    //axios.post(`http://localhost:8000/api/paypal/pay/${userId}`, data, { headers })
    // .then(response => {
    //     return response.json()
    // })
    // .catch(err => {
    //     console.log(err)
    // })

    // axios({
    //     maxRedirects: 0,
    //     method: 'post',
    //     url: `http://localhost:8000/api/paypal/pay/${userId}`,
    //     data: data,
    // })
    //     .then((res) => {
    //         if (res.status === 302) {
    //             console.log(res.headers)
    //             window.location = res.headers.location
    //         } else {
    //             console.log('sad----------')

    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err)

    //     })


    axios
        .post(`http://localhost:8000/api/paypal/pay/${userId}`, data)
        .then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                window.location = res.data.forwardLink
            } else {
                console.log('sad')
            }
        })
        .catch((err) => {
            console.log(err)
        })

}


export const getCategories = () => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/categories/`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const getCategory = (categoryId) => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/category/${categoryId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}



export const getCategoryRelatedProducts = (categoryId) => {
    console.log('cat id in middle: ', categoryId)
    return fetch(`http://localhost:8000/api/category_/${categoryId}`, {
        method: "GET",
    })
        .then(response => {
            const arr = response.json()
            console.log('herreeeeeeeeeeeeeeeeeee', arr)
            return arr
        })
        .catch(err => {
            console.log(err)
        })

}

export const getCategoryRelatedProducts__ = (categoryId) => {
    console.log('cat id in middle: ', categoryId)
    return fetch(`http://localhost:8000/api/product/by/searchCategory?cid=${categoryId}`, {
        method: "GET",
    })
        .then(response => {
            const arr = response.json()
            console.log('here----------', arr)
            return arr
        })
        .catch(err => {
            console.log(err)
        })
}


export const read = (productId) => {
    // console.log(name,email,password)
    return fetch(`http://localhost:8000/api/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const getFilteredProducts = (skip, limit, filters) => {
    const data = {
        skip,
        limit,
        filters
    }
    return fetch(`http://localhost:8000/api/product/by/search`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const List = async (params) => {
    const query = queryString.stringify(params)
    console.log('query', query)
     return fetch(`http://localhost:8000/api/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
