import { products } from './data/products'
import { useRenderCount } from './hooks/useRenderCount'
import { useAppStore } from './store/useAppStore'

function countItems(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

function subtotal(items) {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
}

function Header() {
  const renderCount = useRenderCount()
  const userName = useAppStore((state) => state.user.name)
  const theme = useAppStore((state) => state.ui.theme)
  const items = useAppStore((state) => state.cart.items)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  const toggleCart = useAppStore((state) => state.toggleCart)

  return (
    <header className={`panel header ${theme}`}>
      <div>
        <h2>Welcome, {userName}</h2>
        {renderCount}
      </div>
      <div className="row">
        <button type="button" onClick={toggleTheme}>
          Theme: {theme}
        </button>
        <button type="button" onClick={toggleCart}>
          Cart ({countItems(items)})
        </button>
      </div>
    </header>
  )
}

function ProductCard({ product }) {
  const renderCount = useRenderCount()
  const addToCart = useAppStore((state) => state.addToCart)

  return (
    <article className="panel card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>${product.price.toFixed(2)}</strong>
      <div className="row">
        <button type="button" onClick={() => addToCart(product)}>
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
  const removeFromCart = useAppStore((state) => state.removeFromCart)
  const updateQuantity = useAppStore((state) => state.updateQuantity)

  return (
    <li className="cart-item">
      <div>
        <strong>{item.name}</strong>
        <p>${item.price.toFixed(2)}</p>
      </div>
      <div className="row">
        <button
          type="button"
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          type="button"
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
        >
          +
        </button>
        <button type="button" onClick={() => removeFromCart(item.productId)}>
          Remove
        </button>
        {renderCount}
      </div>
    </li>
  )
}

function CartSidebar() {
  const renderCount = useRenderCount()
  const isOpen = useAppStore((state) => state.cart.isOpen)
  const items = useAppStore((state) => state.cart.items)
  const theme = useAppStore((state) => state.ui.theme)
  const notification = useAppStore((state) => state.ui.notification)

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
        <h1>Zustand Shopping Cart</h1>
        <p>Store subscriptions are scoped through selectors.</p>
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
