import MenuItem from './MenuItem'

export default function Menu({ items, order, onUpdate }) {
  return (
    <div className="mt-4">
      {items.map((item) => (
        <div key={item.id} className="mb-4 p-3 d-flex align-items-center menu-card">
          <div className={`menu-thumb me-3 text-center ${item.id === 'justjava' ? 'justjava' : ''}`}>
            <strong>{item.title}</strong>
          </div>
          <div className="flex-grow-1 menu-content">
            <MenuItem item={item} value={order[item.id]} onChange={(c) => onUpdate(item.id, c)} />
          </div>
        </div>
      ))}
    </div>
  )
}
