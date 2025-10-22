# Data Flow Documentation

## Overview

This document explains the complete data flow in the JavaJam Coffee House React application, showing how user interactions trigger state changes, API calls, and database updates.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (React SPA)                     │
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐   │
│  │   UI Layer   │ ───> │  State Mgmt  │ ───> │ API Service  │   │
│  │ (Components) │ <─── │   (Hooks)    │ <─── │   (api.js)   │   │
│  └──────────────┘      └──────────────┘      └──────────────┘   │
│                                                       │         │
└───────────────────────────────────────────────────────┼─────────┘
                                                        │
                                                HTTP POST/GET (JSON)
                                                        │
┌───────────────────────────────────────────────────────┼──────────┐
│                      XAMPP Server (PHP)               ▼          │
│                                                                  │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐    │
│  │  API Routes  │ ───> │   Business   │ ───> │   Database   │    │
│  │  (*.php)     │ <─── │    Logic     │ <─── │    (MySQL)   │    │
│  └──────────────┘      └──────────────┘      └──────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Flow 1: Adding Item to Cart

### User Journey: Add "Cafe au Lait" (Double Shot, Qty: 2)

```
[User Types Qty] → [ProductCard onChange] → [MenuPage State Update] → [React Re-render] 
→ [Total Recalculates] → [User Clicks Checkout] → [API Call] → [PHP] → [Database] → [Success Message]
```


### Detailed Steps

#### 1. User Interaction (ProductCard Component)

```jsx
// User changes quantity directly in input
<input
  type="number"
  min="0"
  value={quantity}
  onChange={(e) => onQuantityChange(product.product_id, parseInt(e.target.value) || 0)}
/>

// User selects option (for products with options)
```jsx
// User changes quantity directly in input
<input
  type="number"
  min="0"
  value={quantity}
  onChange={(e) => onQuantityChange(product.product_id, parseInt(e.target.value) || 0)}
/>

// User selects option (for products with options)
<input
  type="radio"
  name={`option-${product.product_id}`}
  value="double"
  checked={option === 'double'}
  onChange={(e) => onOptionChange(product.product_id, e.target.value)}
/>
```

**What happens:**
- No local state in ProductCard - it's a **controlled component**
- Props (`quantity` and `option`) come from parent (MenuPage)
- User types "2" → Immediately calls `onQuantityChange(2, 2)`
- User selects "double" → Immediately calls `onOptionChange(2, 'double')`

---

#### 2. Parent Receives and Updates State

```jsx
// MenuPage.jsx
const handleQuantityChange = (productId, quantity) => {
  setCart(prev => ({
    ...prev,
    [productId]: quantity
  }));
};

const handleOptionChange = (productId, option) => {
  setOptions(prev => ({
    ...prev,
    [productId]: option
  }));
};
```

**Data Flow:** 
- User types → `onChange` fires → Calls parent callback → Parent updates state
- No intermediate "Add to Cart" step needed
- Cart updates **instantly** as user types

---

#### 3. Cart State After Updates

```jsx
// MenuPage state after user actions
const [cart, setCart] = useState({});
const [options, setOptions] = useState({});
```

**State After User Inputs:**
```javascript
cart = { 
  1: 0,  // Just Java: 0 items
  2: 2,  // Cafe au Lait: 2 items ✅
  3: 0   // Iced Cappuccino: 0 items
}

options = { 
  1: 'single',
  2: 'double',  // ✅ User selected double
  3: 'single'
}
```

**Key Point:** Cart is initialized with all products at quantity 0 on page load

---

#### 4. React Re-renders and Calculates Total

```jsx
// MenuPage.jsx - Runs on every render
const calculateTotal = () => {
  return products.reduce((total, product) => {
    const quantity = cart[product.product_id] || 0;
    if (quantity === 0) return total;

    let price = parseFloat(product.price_single);
    if (product.has_options && options[product.product_id] === 'double') {
      price = parseFloat(product.price_double);
    }
    return total + (quantity * price);
  }, 0);
};

// ProductCard also calculates subtotal for each item
const calculateSubtotal = () => {
  if (quantity === 0) return 0;
  if (!hasOptions) {
    return quantity * parseFloat(product.price_single);
  }
  const price = option === 'double' ? product.price_double : product.price_single;
  return quantity * parseFloat(price);
};
```

**Calculation Flow:**
- User changes quantity from 1 → 2
- React re-renders MenuPage
- `calculateTotal()` runs: `2 × $4.75 = $9.50`
- ProductCard's `calculateSubtotal()` runs: displays `$9.50` next to item
- UI updates **instantly** (no button click needed)

---

#### 5. User Reviews Cart and Clicks Checkout

```jsx
// MenuPage.jsx - Order summary card
<div className="card">
  <div className="flex items-center justify-between">
    <div>
      <h3>Order Total</h3>
      <p>Ready to checkout?</p>
    </div>
    <div className="text-right">
      <p className="text-4xl font-bold">
        ${calculateTotal().toFixed(2)}  {/* Shows $9.50 */}
      </p>
      <button onClick={handleCheckout}>
        <ShoppingCart /> Check Out
      </button>
    </div>
  </div>
</div>
```

**What happens when user clicks "Check Out":**

#### 6. Checkout Handler Prepares Data

```jsx
const handleCheckout = async () => {
  // Filter only items with quantity > 0
  const items = products
    .filter(product => cart[product.product_id] > 0)
    .map(product => ({
      product_id: product.product_id,
      product_name: product.product_name,
      quantity: cart[product.product_id],
      option: product.has_options ? options[product.product_id] : null
    }));

  // Validation: Check if cart is empty
  if (items.length === 0) {
    setMessage({ 
      type: 'error', 
      text: 'Please add items to your order before checking out.' 
    });
    return;
  }
  
  // Call API
  try {
    const result = await apiService.checkout(items);
    // Continue to step 7...
```

**Items Array Created:**
```javascript
[
  {
    product_id: 2,
    product_name: "Cafe au Lait",
    quantity: 2,
    option: "double"
  }
]
// Only items with quantity > 0 are included
```

---

#### 7. API Service Sends Request (api.js)

```javascript
// api.js
async checkout(items) {
  const formData = new FormData();
  items.forEach(item => {
    formData.append('items[]', JSON.stringify(item));
  });
  
  const response = await fetch(`${API_BASE_URL}/api_checkout.php`, {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
}
```

**HTTP Request:**
```
POST /backend/api_checkout.php
Content-Type: multipart/form-data

items[]={"product_id":2,"product_name":"Cafe au Lait","quantity":2,"option":"double"}
```

---

#### 8. PHP Backend Processing (api_checkout.php)

```php
// api_checkout.php

// Get prices from database (security - don't trust frontend)
$price_query = "SELECT product_id, price_single, price_double FROM products";
$prices = [
  2 => ['price_single' => 3.50, 'price_double' => 4.75]
];

foreach ($items as $item_json) {
  $item = json_decode($item_json, true);
  
  // Calculate from database prices
  $unit_price = ($item['option'] === 'double') 
    ? $prices[$item['product_id']]['price_double']
    : $prices[$item['product_id']]['price_single'];
  
  $item_total = $unit_price * $item['quantity'];
  
  // Insert into database
  $stmt = $dbcnx->prepare("INSERT INTO sales (...) VALUES (...)");
  $stmt->bind_param(...);
  $stmt->execute();
}

echo json_encode(['success' => true, 'total' => 9.50]);
```

**Database Insert:**
```sql
INSERT INTO sales (product_id, product_name, option_type, quantity, unit_price, total_amount, sale_date, sale_time)
VALUES (2, 'Cafe au Lait', 'double', 2, 4.75, 9.50, '2025-10-22', '19:30:00');
```

---

#### 9. Frontend Receives Response and Resets Cart

```jsx
// MenuPage.jsx (continued)
    const result = await apiService.checkout(items);
    
    // Show success message
    setMessage({ 
      type: 'success', 
      text: `Order placed successfully! Total: $${result.total}` 
    });

    // Reset cart to all zeros
    const resetCart = {};
    products.forEach(product => {
      resetCart[product.product_id] = 0;
    });
    setCart(resetCart);

    // Hide message after 5 seconds
    setTimeout(() => setMessage(null), 5000);
    
  } catch (error) {
    setMessage({ 
      type: 'error', 
      text: `Error: ${error.message}` 
    });
  }
};
```

**What happens:**
1. Success message shown in green banner with checkmark icon
2. All product quantities reset to 0
3. React re-renders → Total shows $0.00
4. Message auto-hides after 5 seconds
5. User can start new order immediately

**Complete!** Cart is cleared and ready for next order.

---

## Flow 2: Admin Updates Price

### User Journey: Update "Just Java" from $3.00 → $3.50

```
[Admin] → [Input Field] → [Local State] → [Save Button] → [API] → [PHP] → [Database] → [Refetch] → [UI Update]
```

### Detailed Steps

#### 1. Page Loads

```jsx
// PriceUpdatePage.jsx
const { products, loading, refetch } = useProducts();

// useProducts hook
useEffect(() => {
  async function fetchData() {
    const data = await apiService.fetchProducts();
    setProducts(data);
  }
  fetchData();
}, []);
```

**Products Loaded:**
```javascript
[
  { product_id: 1, product_name: "Just Java", price_single: 3.00, ... },
  { product_id: 2, product_name: "Cafe au Lait", price_single: 3.50, ... }
]
```

---

#### 2. Admin Edits Price

```jsx
const [prices, setPrices] = useState({});

<input
  type="number"
  value={prices[product.product_id]?.single || ''}
  onChange={(e) => setPrices(prev => ({
    ...prev,
    [product.product_id]: {
      ...prev[product.product_id],
      single: parseFloat(e.target.value)
    }
  }))}
/>
```

**State After Typing:**
```javascript
prices = { 1: { single: 3.50 } }
```

---

#### 3. Admin Clicks Save

```jsx
const handleUpdatePrice = async (productId) => {
  setUpdating(prev => ({ ...prev, [productId]: true }));
  
  try {
    await apiService.updatePrice(
      productId,
      prices[productId].single,
      prices[productId].double || null
    );
    
    await refetch();  // Reload from database
    setPrices(prev => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
    
    alert('Price updated successfully!');
  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    setUpdating(prev => ({ ...prev, [productId]: false }));
  }
};
```

---

#### 4. API Request

```javascript
// api.js
async updatePrice(productId, priceSingle, priceDouble = null) {
  const formData = new FormData();
  formData.append('product_id', productId);
  formData.append('price_single', priceSingle);
  if (priceDouble) formData.append('price_double', priceDouble);
  
  const response = await fetch(`${API_BASE_URL}/api_update_price.php`, {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
}
```

**HTTP Request:**
```
POST /backend/api_update_price.php

product_id=1
price_single=3.50
```

---

#### 5. PHP Updates Database

```php
// api_update_price.php

// Validate input
$product_id = filter_input(INPUT_POST, 'product_id', FILTER_VALIDATE_INT);
$price_single = filter_input(INPUT_POST, 'price_single', FILTER_VALIDATE_FLOAT);

// Check if product exists
$check_query = "SELECT has_options FROM products WHERE product_id = ?";
$stmt = $dbcnx->prepare($check_query);
$stmt->bind_param("i", $product_id);
$stmt->execute();

// Update price
$update_query = "UPDATE products SET price_single = ?, updated_at = NOW() WHERE product_id = ?";
$stmt = $dbcnx->prepare($update_query);
$stmt->bind_param("di", $price_single, $product_id);
$stmt->execute();

echo json_encode(['success' => true, 'message' => 'Price updated successfully']);
```

**SQL Executed:**
```sql
UPDATE products 
SET price_single = 3.50, updated_at = '2025-10-22 19:35:00' 
WHERE product_id = 1;
```

---

#### 6. Frontend Refetches Data

```jsx
await refetch();  // Calls apiService.fetchProducts() again
```

**New Products State:**
```javascript
[
  { product_id: 1, product_name: "Just Java", price_single: 3.50, ... },  // ✅ Updated
  { product_id: 2, product_name: "Cafe au Lait", price_single: 3.50, ... }
]
```

---

#### 7. React Re-renders

React detects `products` state changed → Re-renders UI → Shows new price `$3.50`

---

## State Management Patterns

### 1. Controlled Components (Used in ProductCard)

```jsx
// Parent (MenuPage) owns state
const [cart, setCart] = useState({});

// Child (ProductCard) receives value and callback
<input
  type="number"
  value={quantity}  // Controlled by parent
  onChange={(e) => onQuantityChange(product.product_id, parseInt(e.target.value))}
/>
```

**Use Case:** Form inputs where parent needs to know values in real-time

**Benefits:**
- Single source of truth (parent state)
- Easy to validate/transform input
- Parent can control child behavior

---

### 2. Parent State with Props (Cart Management)

```jsx
// Parent manages cart
const [cart, setCart] = useState({});
const [options, setOptions] = useState({});

// Pass down to children
<ProductCard 
  quantity={cart[product.product_id]} 
  option={options[product.product_id]}
  onQuantityChange={handleQuantityChange}
  onOptionChange={handleOptionChange}
/>
```

**Use Case:** Shared state between multiple child components

---

### 3. Custom Hooks

```jsx
const { products, loading, error, refetch } = useProducts();
```

**Use Case:** Reusable stateful logic across components

---

## API Communication Pattern

### Request Flow

```
Component → apiService → fetch() → PHP → MySQL
```

### Response Flow

```
MySQL → PHP → JSON → fetch() → apiService → Component State → UI Update
```

### Example Request-Response

**Request:**
```javascript
await apiService.fetchProducts();
```

**Backend:**
```php
$result = $dbcnx->query("SELECT * FROM products");
echo json_encode(['success' => true, 'products' => $data]);
```

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "product_id": 1,
      "product_name": "Just Java",
      "price_single": 3.00,
      "price_double": null,
      "has_options": false
    }
  ]
}
```

---

## Security Considerations

### 1. Price Validation on Backend

```php
// ❌ DON'T trust frontend
$total = $_POST['total'];

// ✅ DO recalculate on backend
$price_query = "SELECT price_single FROM products WHERE product_id = ?";
$real_price = $result['price_single'];
$total = $real_price * $quantity;
```

### 2. SQL Injection Prevention

```php
// ❌ Vulnerable
$query = "SELECT * FROM products WHERE id = " . $_POST['id'];

// ✅ Safe (Prepared Statements)
$stmt = $dbcnx->prepare("SELECT * FROM products WHERE id = ?");
$stmt->bind_param("i", $product_id);
```

### 3. Input Validation

```php
$product_id = filter_input(INPUT_POST, 'product_id', FILTER_VALIDATE_INT);
if (!$product_id) {
  throw new Exception('Invalid product ID');
}
```

---

## Performance Optimizations

### 1. React Optimizations

- **Lazy Loading:** Load components on demand
- **Memoization:** Cache expensive calculations with `useMemo`
- **Debouncing:** Limit API calls during typing

### 2. Database Optimizations

- **Prepared Statements:** Compiled once, executed multiple times
- **Indexing:** Fast lookups on `product_id`, `sale_date`
- **Connection Pooling:** Reuse database connections

---

## Error Handling Flow

```
User Action → API Call → Error Occurs → Catch Block → User Feedback
```

### Example

```jsx
try {
  await apiService.checkout(items);
  alert('Success!');
} catch (error) {
  console.error('Checkout error:', error);
  alert('Error: ' + error.message);
}
```

**Benefits:**
- User sees friendly error message
- Developer sees detailed error in console
- Application doesn't crash

---

## Comparison: Traditional vs React

| Aspect | Traditional (Old) | React (New) |
|--------|------------------|-------------|
| **Navigation** | Page reload | Instant (SPA) |
| **Data Flow** | Form submit → New page | State update → Re-render |
| **UI Updates** | Full page rebuild | Component re-render only |
| **State** | Server session | Client state + API |
| **Speed** | Slow (network delay) | Fast (in-memory) |
| **UX** | Clunky (loading screens) | Smooth (instant feedback) |

---

## Key Takeaways

1. **Unidirectional Data Flow:** Data flows down (props), events flow up (callbacks)
2. **Single Source of Truth:** Backend database is authoritative
3. **Declarative UI:** Describe what UI should look like, React handles updates
4. **Async Operations:** Use `async/await` for clean asynchronous code
5. **Security First:** Always validate and sanitize on backend

---

## Summary

The React version transforms JavaJam into a modern, responsive application with:

- ⚡ **Instant UI updates** (no page reloads)
- 🔄 **Efficient state management** (React hooks)
- 🛡️ **Secure backend validation** (prepared statements)
- 📱 **Better UX** (loading states, error handling)
- 🎯 **Maintainable code** (component-based architecture)

This data flow architecture follows industry best practices and provides a foundation for future enhancements.
