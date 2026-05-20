export function addOrIncrement(items, product) {
  const existing = items.find((item) => item.productId === product.id)

  if (existing) {
    return items.map((item) =>
      item.productId === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    )
  }

  return [
    ...items,
    {
      productId: product.id,
      name: product.name,
      quantity: 1,
      price: product.price,
    },
  ]
}

export function setQuantity(items, productId, quantity) {
  if (quantity <= 0) {
    return items.filter((item) => item.productId !== productId)
  }

  return items.map((item) =>
    item.productId === productId ? { ...item, quantity } : item,
  )
}

export function removeItem(items, productId) {
  return items.filter((item) => item.productId !== productId)
}

export function countItems(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
}
