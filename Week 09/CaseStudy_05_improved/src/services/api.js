// API Service for JavaJam Coffee House
const API_BASE_URL = 'http://localhost/ie4727/Week%2009/CaseStudy_05_improved/backend';

class ApiService {
  async fetchProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api_products.php`);
      const data = await response.json();
      if (data.success) {
        return data.products;
      }
      throw new Error(data.message || 'Failed to fetch products');
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async updatePrice(productId, priceSingle, priceDouble = null) {
    try {
      const formData = new FormData();
      formData.append('product_id', productId);
      formData.append('price_single', priceSingle);
      if (priceDouble !== null) {
        formData.append('price_double', priceDouble);
      }

      const response = await fetch(`${API_BASE_URL}/api_update_price.php`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to update price');
      }
      return data;
    } catch (error) {
      console.error('Error updating price:', error);
      throw error;
    }
  }

  async checkout(items) {
    try {
      const formData = new FormData();
      items.forEach(item => {
        formData.append('items[]', JSON.stringify(item));
      });

      const response = await fetch(`${API_BASE_URL}/api_checkout.php`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to checkout');
      }
      return data;
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  }

  async getSalesReport(date) {
    try {
      const response = await fetch(`${API_BASE_URL}/api_sales_report.php?date=${date}`);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch sales report');
      }
      return data;
    } catch (error) {
      console.error('Error fetching sales report:', error);
      throw error;
    }
  }
}

export default new ApiService();
