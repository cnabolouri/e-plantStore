import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../CartSlice'

export default function Header() {
  const count = useSelector(selectCartCount)
  const { pathname } = useLocation()

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">Paradise Nursery</Link>
        <nav className="nav-links">
          <Link className={pathname === '/plants' ? 'active' : ''} to="/plants">Plants</Link>
          <Link className={pathname === '/' ? 'active' : ''} to="/">Home</Link>
          <Link className={pathname === '/cart' ? 'active cart-link' : 'cart-link'} to="/cart" aria-label="Cart">
            🛒
            {count > 0 && <span className="cart-badge" aria-label={`${count} items in cart`}>{count}</span>}
          </Link>
        </nav>
      </div>
    </header>
  )
}
