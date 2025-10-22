import { useState } from 'react';
import { DollarSign, Save, CheckCircle, XCircle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import apiService from '../services/api';

const PriceUpdatePage = () => {
  const { products, loading, error, refetch } = useProducts();
  const [prices, setPrices] = useState({});
  const [message, setMessage] = useState(null);
  const [updating, setUpdating] = useState(null);

  const handlePriceChange = (productId, field, value) => {
    setPrices(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  };

  const handleUpdate = async (product) => {
    setUpdating(product.product_id);
    try {
      const newPrices = prices[product.product_id] || {};
      const priceSingle = newPrices.single !== undefined ? newPrices.single : product.price_single;
      const priceDouble = product.has_options
        ? (newPrices.double !== undefined ? newPrices.double : product.price_double)
        : null;

      await apiService.updatePrice(product.product_id, priceSingle, priceDouble);
      setMessage({ type: 'success', text: `Price updated successfully for ${product.product_name}!` });

      // Refetch products to show updated prices
      await refetch();

      // Clear the local price state for this product
      setPrices(prev => {
        const newPrices = { ...prev };
        delete newPrices[product.product_id];
        return newPrices;
      });

      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    } finally {
      setUpdating(null);
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
        <p className="font-bold">Error loading products</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <DollarSign className="w-10 h-10 text-amber-800" />
          <h1 className="text-4xl font-bold text-amber-900">Product Price Update</h1>
        </div>
        <p className="text-gray-600">Click on a product to update its pricing</p>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => {
          const currentPrices = prices[product.product_id] || {};
          const displaySingle = currentPrices.single !== undefined ? currentPrices.single : product.price_single;
          const displayDouble = currentPrices.double !== undefined ? currentPrices.double : product.price_double;

          return (
            <div key={product.product_id} className="card">
              <h3 className="text-2xl font-bold text-amber-900 mb-2">{product.product_name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>

              <div className="space-y-4">
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-1">Current Prices:</p>
                  {product.has_options ? (
                    <p className="text-amber-900">
                      Single: ${parseFloat(product.price_single).toFixed(2)} |
                      Double: ${parseFloat(product.price_double).toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-amber-900">
                      Price: ${parseFloat(product.price_single).toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {product.has_options ? 'Single Price:' : 'Price:'}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={displaySingle}
                      onChange={(e) => handlePriceChange(product.product_id, 'single', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  {product.has_options && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Double Price:
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={displayDouble}
                        onChange={(e) => handlePriceChange(product.product_id, 'double', e.target.value)}
                        className="input-field"
                      />
                    </div>
                  )}

                  <button
                    onClick={() => handleUpdate(product)}
                    disabled={updating === product.product_id}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    {updating === product.product_id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Update Price
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceUpdatePage;
