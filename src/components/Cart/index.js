import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      let totalAmount = 0
      for (let i of cartList) {
        totalAmount += i.quantity * i.price
      }

      const removeAllBtn = () => {
        removeAllCartItems()
      }

      const renderCartSummery = () => {
        return (
          <div className="cart-summery-card">
            <h1 className="total-amount-in-cart-summery-text">
              Order total:
              <span className="total-amount-in-cart-summery">
                {totalAmount}/-
              </span>
            </h1>
            <p className="items-count-in-cart-summery">
              {cartList.length} Items in cart
            </p>
            <button className="button-in-cart-summery">Checkout</button>
          </div>
        )
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button className="remove-all-button" onClick={removeAllBtn}>
                  Remove all
                </button>
                <CartListView />
                {renderCartSummery()}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
