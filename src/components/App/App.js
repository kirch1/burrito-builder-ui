import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      errorMsg: ''
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => this.setState({orders: data.orders, errorMsg: ''}))
      .catch(err => {
        console.log('Error fetching:', err);
        this.setState({errorMsg: 'Error fetching orders!'});
      });
  }

  setOrders = newOrder => {
    this.setState({orders: [...this.state.orders, newOrder]})
  }

  setError = (error) => {
    this.setState({errorMsg: error})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          {this.state.errorMsg && <p id='error-msg'>{this.state.errorMsg}</p>}
          <OrderForm setOrders={this.setOrders} setError={this.setError}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
