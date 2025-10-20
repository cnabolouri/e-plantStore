import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <section className="landing">
      <div className="landing-hero">
        <h1>Paradise Nursery</h1>
        <p>
          Welcome to Paradise Nursery—your destination for aromatic, medicinal, and decorative houseplants.
          Explore curated greenery that purifies air, calms the mind, and brightens your home.
        </p>
        <Link to="/plants" className="btn primary">Get Started</Link>
      </div>
    </section>
  )
}
