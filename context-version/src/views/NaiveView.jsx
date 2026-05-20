import { useAppContext } from '../state/naive/AppContext'
import { countItems, subtotal } from '../lib/cartUtils'
import { useRenderCount } from '../hooks/useRenderCount'

function NaiveHeader() {
  const renderCount = useRenderCount()
  const {
    state: { user, cart, ui },
    dispatch,
  } = useAppContext()

  return (
    <header className={`panel header ${ui.theme}`}>
      <div>
        <h2>Welcome, {user.name}</h2>
        {renderCount}
      </div>
      <div className="row">
        <button type="button" onClick={() => dispatch({ type: 'ui/toggleTheme' })}>
          Theme: {ui.theme}
        </button>
        <button type="button" onClick={() => dispatch({ type: 'cart/toggle' })}>
          Cart ({countItems(cart.items)})
        </button>
      </div>
    </header>
  )
}

function NaiveProductCard({ product }) {
  const renderCount = useRenderCount()
  const { dispatch } = useAppContext()

  return (
    <article className="panel card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>${product.price.toFixed(2)}</strong>
      <div className="row">
        <button
          type="button"
          onClick={() => dispatch({ type: 'cart/add', payload: product })}
        >
          Add to cart
        </button>
        {renderCount}
      </div>
    </article>
  )
}

function NaiveProductListPage({ products }) {
  const renderCount = useRenderCount()

  return (
    <section className="panel">
      <div className="row between">
        <h2>Products</h2>
        {renderCount}
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <NaiveProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function NaiveCartItem({ item }) {
  const renderCount = useRenderCount()
  const { dispatch } = useAppContext()

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
            dispatch({
              type: 'cart/setQuantity',
              payload: { productId: item.productId, quantity: item.quantity - 1 },
            })
          }
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: 'cart/setQuantity',
              payload: { productId: item.productId, quantity: item.quantity + 1 },
            })
          }
        >
          +
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'cart/remove', payload: item.productId })}
        >
          Remove
        </button>
        {renderCount}
      </div>
    </li>
  )
}

function NaiveCartSidebar() {
  const renderCount = useRenderCount()
  const {
    state: { cart, ui },
  } = useAppContext()

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
          <NaiveCartItem key={item.productId} item={item} />
        ))}
      </ul>
      <p className="summary">Subtotal: ${subtotal(cart.items).toFixed(2)}</p>
      {ui.notification ? <p className="notice">{ui.notification.message}</p> : null}
    </aside>
  )
}

export { NaiveHeader, NaiveProductListPage, NaiveCartSidebar }
