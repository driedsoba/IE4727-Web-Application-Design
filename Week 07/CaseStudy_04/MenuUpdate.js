// MenuUpdate.js - simple calculator for menu.html
// Reads quantities and shot selections, calculates per-item subtotals and total price

document.addEventListener('DOMContentLoaded', () => {
  // Prices
  const prices = {
    justjava: 2.00,      // endless cup
    cafelait: { single: 2.00, double: 3.00 },
    capp: { single: 4.75, double: 5.75 }
  };

  // Elements
  const qtyJust = document.getElementById('qty_justjava');
  const subJust = document.getElementById('sub_justjava');

  const qtyCafe = document.getElementById('qty_cafelait');
  const subCafe = document.getElementById('sub_cafelait');
  const cafeSingle = document.getElementById('cafelait_single');
  const cafeDouble = document.getElementById('cafelait_double');

  const qtyCapp = document.getElementById('qty_capp');
  const subCapp = document.getElementById('sub_capp');
  const cappSingle = document.getElementById('capp_single');
  const cappDouble = document.getElementById('capp_double');

  const totalField = document.getElementById('total_price');

  // Helper: parse integer quantity (safe)
  function readQty(el) {
    const v = parseInt(el.value, 10);
    return isNaN(v) || v < 0 ? 0 : v;
  }

  function update() {
    // Just Java
    const qJust = readQty(qtyJust);
    const sJust = (qJust * prices.justjava);
    subJust.value = sJust.toFixed(2);

    // Cafe au Lait
    const qCafe = readQty(qtyCafe);
    const cafeShot = cafeDouble.checked ? 'double' : 'single';
    const sCafe = qCafe * prices.cafelait[cafeShot];
    subCafe.value = sCafe.toFixed(2);

    // Iced Cappuccino
    const qCapp = readQty(qtyCapp);
    const cappShot = cappDouble.checked ? 'double' : 'single';
    const sCapp = qCapp * prices.capp[cappShot];
    subCapp.value = sCapp.toFixed(2);

    // Total
    const total = sJust + sCafe + sCapp;
    totalField.value = total.toFixed(2);
  }

  // Attach events
  [qtyJust, qtyCafe, qtyCapp].forEach(el => el.addEventListener('input', update));
  [cafeSingle, cafeDouble, cappSingle, cappDouble].forEach(el => el.addEventListener('change', update));

  // Initial update
  update();
});