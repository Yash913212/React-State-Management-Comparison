import { useState } from 'react'
import { products } from './data/products'
import { AppProvider } from './state/naive/AppContext'
import { CartProvider } from './state/split/CartContext'
import { UIProvider } from './state/split/UIContext'
import { UserProvider } from './state/split/UserContext'
import {
  NaiveCartSidebar,
  NaiveHeader,
  NaiveProductListPage,
} from './views/NaiveView'
import {
  SplitCartSidebar,
  SplitHeader,
  SplitProductListPage,
} from './views/SplitView'

function Shell({ children, title, subtitle }) {
  return (
    <div className="layout">
      <header className="title-bar">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>
      {children}
    </div>
  )
}

function NaiveApp() {
  return (
    <AppProvider>
      <Shell
        title="Context API - Naive Single Provider"
        subtitle="Every consumer subscribes to one global context value."
      >
        <NaiveHeader />
        <main className="content-grid">
          <NaiveProductListPage products={products} />
          <NaiveCartSidebar />
        </main>
      </Shell>
    </AppProvider>
  )
}

function SplitApp() {
  return (
    <UserProvider>
      <UIProvider>
        <CartProvider>
          <Shell
            title="Context API - Split Providers"
            subtitle="Cart, user, and UI contexts are isolated to reduce re-renders."
          >
            <SplitHeader />
            <main className="content-grid">
              <SplitProductListPage products={products} />
              <SplitCartSidebar />
            </main>
          </Shell>
        </CartProvider>
      </UIProvider>
    </UserProvider>
  )
}

function App() {
  const [mode, setMode] = useState('naive')

  return (
    <div>
      <div className="mode-switcher">
        <button
          type="button"
          className={mode === 'naive' ? 'active' : ''}
          onClick={() => setMode('naive')}
        >
          Naive
        </button>
        <button
          type="button"
          className={mode === 'split' ? 'active' : ''}
          onClick={() => setMode('split')}
        >
          Split
        </button>
      </div>
      {mode === 'naive' ? <NaiveApp /> : <SplitApp />}
    </div>
  )
}

export default App
