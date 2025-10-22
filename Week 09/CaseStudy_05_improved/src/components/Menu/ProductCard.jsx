import { Coffee } from 'lucide-react';

const ProductCard = ({ product, quantity, option, onQuantityChange, onOptionChange }) => {
  const hasOptions = product.has_options;
  const priceDisplay = hasOptions
    ? `Single $${parseFloat(product.price_single).toFixed(2)} | Double $${parseFloat(product.price_double).toFixed(2)}`
    : `Endless Cup $${parseFloat(product.price_single).toFixed(2)}`;

  const calculateSubtotal = () => {
    if (quantity === 0) return 0;
    if (!hasOptions) {
      return quantity * parseFloat(product.price_single);
    }
    const price = option === 'double' ? product.price_double : product.price_single;
    return quantity * parseFloat(price);
  };

  return (
    <div className="card hover:scale-[1.02] transition-transform">
      <div className="flex items-start gap-4">
        <div className="bg-amber-100 p-3 rounded-lg">
          <Coffee className="w-8 h-8 text-amber-800" />
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-amber-900 mb-2">{product.product_name}</h3>
          <p className="text-gray-600 mb-3">{product.description}</p>
          <p className="text-lg font-semibold text-amber-800 mb-4">{priceDisplay}</p>

          {hasOptions && (
            <div className="flex gap-4 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`option-${product.product_id}`}
                  value="single"
                  checked={option === 'single'}
                  onChange={(e) => onOptionChange(product.product_id, e.target.value)}
                  className="w-4 h-4 text-amber-800 focus:ring-amber-500"
                />
                <span className="text-gray-700">Single Shot</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`option-${product.product_id}`}
                  value="double"
                  checked={option === 'double'}
                  onChange={(e) => onOptionChange(product.product_id, e.target.value)}
                  className="w-4 h-4 text-amber-800 focus:ring-amber-500"
                />
                <span className="text-gray-700">Double Shot</span>
              </label>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => onQuantityChange(product.product_id, parseInt(e.target.value) || 0)}
                className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-800 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-gray-700 font-medium">Subtotal:</span>
              <span className="text-xl font-bold text-amber-900">
                ${calculateSubtotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
