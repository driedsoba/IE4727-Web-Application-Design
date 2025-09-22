import { useState, useMemo } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Menu from './components/Menu'
import Home from './components/Home'
import Music from './components/Music'
import Jobs from './components/Jobs'
import Thanks from './components/Thanks'
import './styles.css'

const ITEMS = [
  { id: 'justjava', title: 'Just Java', priceSingle: 2.0, hasDouble: false, priceDouble: 0 },
  { id: 'cafeaulait', title: 'Cafe au Lait', priceSingle: 2.0, hasDouble: true, priceDouble: 3.0 },
  { id: 'icedcap', title: 'Iced Cappuccino', priceSingle: 4.75, hasDouble: true, priceDouble: 5.75 },
]

export default function App() {
  // routing replaces page state

  // order state for menu page
  const [order, setOrder] = useState(Object.fromEntries(ITEMS.map((i) => [i.id, { qty: 0, shot: 'single' }])))
  const updateItem = (id, changes) => setOrder((prev) => ({ ...prev, [id]: { ...prev[id], ...changes } }))
  const total = useMemo(() => {
    return ITEMS.reduce((sum, it) => {
      const o = order[it.id]
      if (!o || o.qty <= 0) return sum
      const price = o.shot === 'double' && it.hasDouble ? it.priceDouble : it.priceSingle
      return sum + price * Number(o.qty)
    }, 0)
  }, [order])

  return (
    <BrowserRouter>
      <div className="container py-4">
        <div className="site-header">
          <div className="utility-row">
            <div>Open: Mon–Sun 7am–7pm</div>
            <div>Call: 888-555-8888</div>
          </div>
          <header className="mb-0 app-header">
            <h1>Coffee at JavaJam</h1>
            <nav className="nav nav-pills">
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
              <NavLink to="/menu" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Menu</NavLink>
              <NavLink to="/music" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Music</NavLink>
              <NavLink to="/jobs" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Jobs</NavLink>
            </nav>
          </header>
        </div>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={(
              <>
                <Menu items={ITEMS} order={order} onUpdate={updateItem} />
                <div className="d-flex justify-content-end align-items-center mt-3">
                  <label className="me-3 fw-bold">Total:</label>
                  <input id="total_price" readOnly value={total.toFixed(2)} className="form-control w-25 text-end" />
                </div>
              </>
            )} />
            <Route path="/music" element={<Music />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/thanks" element={<Thanks />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
