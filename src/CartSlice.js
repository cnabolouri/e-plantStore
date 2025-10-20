import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // { name, image, cost, quantity }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload // { name, image, cost }
      const existing = state.items.find(i => i.name === item.name)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
    },
    removeItem(state, action) {
      const name = action.payload // name string
      state.items = state.items.filter(i => i.name !== name)
    },
    updateQuantity(state, action) {
      const { name, amount } = action.payload // amount is new absolute qty
      const target = state.items.find(i => i.name === name)
      if (target) {
        if (amount <= 0) {
          // remove if drops to 0
          state.items = state.items.filter(i => i.name !== name)
        } else {
          target.quantity = amount
        }
      }
    },
  },
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectCartCount  = (state) => state.cart.items.reduce((acc, i) => acc + i.quantity, 0)

export default cartSlice.reducer
