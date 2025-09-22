export default function MenuItem({ item, value, onChange }) {
  const priceLine = item.hasDouble
    ? `Single $${item.priceSingle.toFixed(2)} Double $${item.priceDouble.toFixed(2)}`
    : `Endless Cup $${item.priceSingle.toFixed(2)}`

  const subtotal = (() => {
    const qty = Number(value.qty || 0)
    const price = value.shot === 'double' && item.hasDouble ? item.priceDouble : item.priceSingle
    return (qty * price).toFixed(2)
  })()

  return (
    <>
      <p className="mb-1">{priceLine}</p>

      {item.hasDouble && (
        <div className="shot-options mb-2">
          <div>
            <input type="radio" name={item.id + '-shot'} id={item.id + '-single'} checked={value.shot === 'single'} onChange={() => onChange({ shot: 'single' })} />{' '}
            <label htmlFor={item.id + '-single'}>Single</label>
          </div>
          <div>
            <input type="radio" name={item.id + '-shot'} id={item.id + '-double'} checked={value.shot === 'double'} onChange={() => onChange({ shot: 'double' })} />{' '}
            <label htmlFor={item.id + '-double'}>Double</label>
          </div>
        </div>
      )}

      <div className="d-flex align-items-center justify-content-end order-controls">
        <label className="me-2 d-flex align-items-center">
          <span className="me-2">Quantity:</span>
          <input id={`${item.id}-qty`} type="number" min="0" className="form-control input-qty text-end" value={value.qty} onChange={(e) => onChange({ qty: e.target.value })} />
        </label>
        <label className="ms-3 d-flex align-items-center">
          <span className="me-2">Subtotal:</span>
          <input id={`${item.id}-subtotal`} readOnly className="form-control input-subtotal text-end" value={subtotal} />
        </label>
      </div>
    </>
  )
}
