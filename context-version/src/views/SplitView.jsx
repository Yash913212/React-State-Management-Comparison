import { countItems, subtotal } from '../lib/cartUtils'
import { useRenderCount } from '../hooks/useRenderCount'
import { useCartContext } from '../state/split/CartContext'
import { useUIContext } from '../state/split/UIContext'
import { useUserContext } from '../state/split/UserContext'

function SplitHeader() {
  const renderCount = useRenderCount()
  const user = useUserContext()
  const { cart, toggleCart } = useCartContext()
  const { ui, toggleTheme } = useUIContext()

  return (
    <header className={`panel header ${ui.theme}`}>
      <div>
        <h2>Welcome, {user.name}</h2>
        {renderCount}
      </div>
      <div className="row">
        <button type="button" onClick={toggleTheme}>
          Theme: {ui.theme}
        </button>
        <button type="button" onClick={toggleCart}>
          Cart ({countItems(cart.items)})
        </button>
      </div>
    </header>
  )
}

function SplitProductCard({ product }) {
  const renderCount = useRenderCount()
  const { addToCart } = useCartContext()
  const { setNotification } = useUIContext()

  return (
    <article className="panel card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>${product.price.toFixed(2)}</strong>
      <div className="row">
        <button
          type="button"
          onClick={() => {
            addToCart(product)
            setNotification(`${product.name} added to cart`, 'success')
          }}
        >
          Add to cart
        </button>
        {renderCount}
      </div>
    </article>
  )
}

function SplitProductListPage({ products }) {
  const renderCount = useRenderCount()

  return (
    <section className="panel">
      <div className="row between">
        <h2>Products</h2>
        {renderCount}
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <SplitProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function SplitCartItem({ item }) {
  const renderCount = useRenderCount()
  const { removeFromCart, updateQuantity } = useCartContext()

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

function SplitCartSidebar() {
  const renderCount = useRenderCount()
  const { cart } = useCartContext()
  const { ui } = useUIContext()

  if (!cart.isOpen) {
    return null
  }

  return (
    <aside className={`panel sidebar ${ui.theme}`}>
      <div className="row between">
        <h2>Cart</h2>
        {renderCount}
      </div>
      <ul className="list-reset">
        {cart.items.map((item) => (
          <SplitCartItem key={item.productId} item={item} />
        ))}
      </ul>
      <p className="summary">Subtotal: ${subtotal(cart.items).toFixed(2)}</p>
      {ui.notification ? <p className="notice">{ui.notification.message}</p> : null}
    </aside>
  )
}

export { SplitHeader, SplitProductListPage, SplitCartSidebar }
