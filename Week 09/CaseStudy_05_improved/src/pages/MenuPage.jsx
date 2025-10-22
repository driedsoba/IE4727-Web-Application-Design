import { useState, useEffect } from 'react';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/Menu/ProductCard';
import apiService from '../services/api';

const MenuPage = () => {
  const { products, loading, error } = useProducts();
  const [cart, setCart] = useState({});
  const [options, setOptions] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const initialCart = {};
      const initialOptions = {};
      products.forEach(product => {
        initialCart[product.product_id] = 0;
        initialOptions[product.product_id] = 'single';
      });
      setCart(initialCart);
      setOptions(initialOptions);
    }
  }, [products]);

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

  const handleCheckout = async () => {
    const items = products
      .filter(product => cart[product.product_id] > 0)
      .map(product => ({
        product_id: product.product_id,
        product_name: product.product_name,
        quantity: cart[product.product_id],
        option: product.has_options ? options[product.product_id] : null
      }));

    if (items.length === 0) {
      setMessage({ type: 'error', text: 'Please add items to your order before checking out.' });
      return;
    }

    try {
      const result = await apiService.checkout(items);
      setMessage({ type: 'success', text: `Order placed successfully! Total: $${result.total}` });

      // Reset cart
      const resetCart = {};
      products.forEach(product => {
        resetCart[product.product_id] = 0;
      });
      setCart(resetCart);

      // Hide message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-bold">Error loading menu</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-2">Coffee at JavaJam</h1>
        <p className="text-gray-600">Indulge in our locally roasted, fair trade coffee</p>
      </div>

      {message && (
        <div className={`flex items-center gap-3 p-4 rounded-lg ${message.type === 'success'
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      <div className="space-y-4">
        {products.map(product => (
          <ProductCard
            key={product.product_id}
            product={product}
            quantity={cart[product.product_id] || 0}
            option={options[product.product_id] || 'single'}
            onQuantityChange={handleQuantityChange}
            onOptionChange={handleOptionChange}
          />
        ))}
      </div>

      <div className="card bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-amber-900 mb-1">Order Total</h3>
            <p className="text-gray-600">Ready to checkout?</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-amber-900 mb-3">
              ${calculateTotal().toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="btn-primary flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
