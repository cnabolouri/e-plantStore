import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, updateQuantity, removeItem } from '../CartSlice'

const parsePrice = (costStr) => parseFloat(costStr.replace('$', ''))

export default function CartItems() {
  const items = useSelector(selectCartItems)
  const dispatch = useDispatch()

  const calculateItemTotal = (item) => {
    return parsePrice(item.cost) * item.quantity
  }

  const calculateTotalAmount = () => {
    return items.reduce((acc, item) => acc + calculateItemTotal(item), 0)
  }

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }))
  }

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }))
    } else {
      dispatch(removeItem(item.name))
    }
  }

  const handleRemove = (name) => {
    dispatch(removeItem(name))
  }

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference')
  }

  if (items.length === 0) {
    return (
      <section>
        <h2 className="page-title">Your Cart</h2>
        <p className="muted">Your cart is empty.</p>
        <Link className="btn" to="/plants">Continue Shopping</Link>
      </section>
    )
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalCost = calculateTotalAmount().toFixed(2)

  return (
    <section>
      <h2 className="page-title">Your Cart</h2>

      <div className="cart-summary">
        <div><strong>Total items:</strong> {totalItems}</div>
        <div><strong>Total cost:</strong> ${totalCost}</div>
      </div>

      <div className="cart-grid">
        {items.map(item => (
          <article key={item.name} className="cart-card">
            <img src={item.image} alt={item.name} className="cart-img" />
            <div className="cart-body">
              <h4>{item.name}</h4>
              <div className="muted">Unit price: {item.cost}</div>

              <div className="qty-row">
                <button className="btn small" onClick={() => handleDecrement(item)}>-</button>
                <span className="qty">{item.quantity}</span>
                <button className="btn small" onClick={() => handleIncrement(item)}>+</button>
              </div>

              <div className="subtotal">
                Subtotal: ${calculateItemTotal(item).toFixed(2)}
              </div>

              <div className="row">
                <button className="btn danger" onClick={() => handleRemove(item.name)}>Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-actions">
        <Link className="btn" to="/plants">Continue Shopping</Link>
        <button className="btn primary" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </section>
  )
}
