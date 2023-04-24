export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => {
      if(!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    });
}

export const addOrder = (name, ingredients) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: name, ingredients: ingredients})
  })
  .then(response => {
    if(!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  });
}

export const deleteOrder = (id) => {
  return fetch(`http://localhost:3001/api/v1/orders/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if(!response.ok) {
      throw new Error(response.statusText)
    }
  })
}
