import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newItem = cartList.filter(i => i.id !== id)
    this.setState({cartList: [...newItem]})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = product => {
    const {cartList} = this.state
    const cartListCopy = [...cartList]
    const updatedItem = {...product}
    updatedItem.quantity += 1
    const indexOfProduct = cartList.findIndex(i => {
      if (product.id === i.id) {
        return true
      }
      return false
    })
    cartListCopy.splice(indexOfProduct, 1, updatedItem)
    this.setState({cartList: [...cartListCopy]})
  }

  decrementCartItemQuantity = product => {
    const {cartList} = this.state
    const updatedItem = {...product}
    const cartListCopy = [...cartList]
    const indexOfProduct = cartList.findIndex(i => {
      if (product.id === i.id) {
        return true
      }
      return false
    })

    if (updatedItem.quantity > 1) {
      updatedItem.quantity -= 1
      cartListCopy.splice(indexOfProduct, 1, updatedItem)
      this.setState({cartList: [...cartListCopy]})
    } else {
      cartListCopy.splice(indexOfProduct, 1)
      this.setState({cartList: [...cartListCopy]})
    }
  }

  addCartItem = product => {
    const {cartList} = this.state

    const needUpdateproduct = cartList.find(eachObj => {
      if (product.id === eachObj.id) {
        return true
      }
      return false
    })

    if (needUpdateproduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedItem = {...needUpdateproduct}
      updatedItem.quantity += 1
      const newItems = cartList.filter(eachObj => product.id !== eachObj.id)
      this.setState({cartList: [...newItems, updatedItem]})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
