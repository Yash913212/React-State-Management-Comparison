import { useDispatch, useSelector } from 'react-redux'
import { products } from './data/products'
import { useRenderCount } from './hooks/useRenderCount'
import {
  addToCart,
  removeFromCart,
  toggleCart,
  updateQuantity,
} from './store/cartSlice'
import { setNotification, toggleTheme } from './store/uiSlice'

function countItems(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

function subtotal(items) {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
}

function Header() {
  const renderCount = useRenderCount()
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.user.name)
  const theme = useSelector((state) => state.ui.theme)
  const cartCount = useSelector((state) => countItems(state.cart.items))

  return (
    <header className={`panel header ${theme}`}>
      <div>
        <h2>Welcome, {userName}</h2>
        {renderCount}
      </div>
      <div className="row">
        <button type="button" onClick={() => dispatch(toggleTheme())}>
          Theme: {theme}
        </button>
        <button type="button" onClick={() => dispatch(toggleCart())}>
          Cart ({cartCount})
        </button>
      </div>
    </header>
  )
}

function ProductCard({ product }) {
  const renderCount = useRenderCount()
  const dispatch = useDispatch()

  return (
    <article className="panel card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>${product.price.toFixed(2)}</strong>
      <div className="row">
        <button
          type="button"
          onClick={() => {
            dispatch(addToCart(product))
            dispatch(
              setNotification({
                message: `${product.name} added to cart`,
                type: 'success',
              }),
            )
          }}
        >
          Add to cart
        </button>
        {renderCount}
      </div>
    </article>
  )
}

function ProductListPage() {
  const renderCount = useRenderCount()

  return (
    <section className="panel">
      <div className="row between">
        <h2>Products</h2>
        {renderCount}
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function CartItem({ item }) {
  const renderCount = useRenderCount()
  const dispatch = useDispatch()

  return (
    <li className="cart-item">
      <div>
        <strong>{item.name}</strong>
        <p>${item.price.toFixed(2)}</p>
      </div>
      <div className="row">
        <button
          type="button"
          onClick={() =>
            dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))
          }
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          type="button"
          onClick={() =>
            dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))
          }
        >
          +
        </button>
        <button type="button" onClick={() => dispatch(removeFromCart(item.productId))}>
          Remove
        </button>
        {renderCount}
      </div>
    </li>
  )
}

function CartSidebar() {
  const renderCount = useRenderCount()
  const isOpen = useSelector((state) => state.cart.isOpen)
  const items = useSelector((state) => state.cart.items)
  const theme = useSelector((state) => state.ui.theme)
  const notification = useSelector((state) => state.ui.notification)

  if (!isOpen) {
    return null
  }

  return (
    <aside className={`panel sidebar ${theme}`}>
      <div className="row between">
        <h2>Cart</h2>
        {renderCount}
      </div>
      <ul className="list-reset">
        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </ul>
      <p className="summary">Subtotal: ${subtotal(items).toFixed(2)}</p>
      {notification ? <p className="notice">{notification.message}</p> : null}
    </aside>
  )
}

function App() {
  return (
    <div className="layout">
      <header className="title-bar">
        <h1>Redux Toolkit Shopping Cart</h1>
        <p>Structured slices and predictable updates with DevTools support.</p>
      </header>
      <Header />
      <main className="content-grid">
        <ProductListPage />
        <CartSidebar />
      </main>
    </div>
  )
}

export default App
