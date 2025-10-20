import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectCartItems } from '../CartSlice'
import { plantsArray } from '../data/plants'

export default function ProductList() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const [addedToCart, setAddedToCart] = useState({})

  const inCart = (name) => {
    const exists = cartItems.find(i => i.name === name)
    return !!exists || addedToCart[name]
  }

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }))
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }))
  }

  const categories = ['Aromatic', 'Medicinal', 'Decorative']

  return (
    <section>
      <h2 className="page-title">Our Plants</h2>

      {categories.map(cat => (
        <div key={cat} className="category-block">
          <h3 className="category-title">{cat} Plants</h3>
          <div className="product-grid">
            {plantsArray.filter(p => p.category === cat).map(plant => (
              <article key={plant.name} className="product-card">
                <img src={plant.image} alt={plant.name} className="product-img" />
                <div className="product-body">
                  <h4>{plant.name}</h4>
                  <p className="muted">{plant.description}</p>
                  <div className="price-row">
                    <span className="price">{plant.cost}</span>
                    <button
                      className="btn"
                      disabled={inCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {inCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
