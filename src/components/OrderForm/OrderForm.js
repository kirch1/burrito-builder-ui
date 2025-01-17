import React, { Component } from 'react';
import { addOrder } from '../../apiCalls';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.name && this.state.ingredients.length) {
      addOrder(this.state.name, this.state.ingredients)
        .then(data => {
          this.props.setOrders(data);
          this.props.setError('');
        })
        .catch(err => {
          console.log('Error posting:', err);
          this.props.setError('Error creating new order!');
        });
      this.clearInputs();
    }else {
      this.props.setError('Please add name and at least one ingredient');
    }
  }

  handleIngredientChange = e => {
    e.preventDefault();
    const matches = this.state.ingredients.filter(ingredient => ingredient === e.target.name);
    if(matches.length < 2) {
      this.setState({ingredients: [...this.state.ingredients, e.target.name]});
    }
  }

  handleNameChange = e => {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient + "button"} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button id={'submit-order-button'} onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
