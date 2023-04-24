import React from 'react';
import './Orders.css';
import { deleteOrder } from '../../apiCalls';

const Orders = props => {

  const deleteClick = (id) => {
    deleteOrder(id)
      .then(() => {
        props.setError('');
        props.getOrderData();
      })
      .catch(error => {
        console.log("here", error);
        props.setError('There was a problem deleting the order!');
      })
  }

  const orderEls = props.orders.map(order => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={ingredient}>{ingredient}</li>
          })}
        </ul>
        <button className='delete-order' onClick={() => deleteClick(order.id)}>X</button>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;
