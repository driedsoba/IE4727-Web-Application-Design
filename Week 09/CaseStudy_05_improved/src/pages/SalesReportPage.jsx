import { useState } from 'react';
import { BarChart3, Calendar, TrendingUp } from 'lucide-react';
import apiService from '../services/api';

const SalesReportPage = () => {
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getSalesReport(reportDate);
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <BarChart3 className="w-10 h-10 text-amber-800" />
          <h1 className="text-4xl font-bold text-amber-900">Sales Report</h1>
        </div>
        <p className="text-gray-600">View daily sales analytics and performance metrics</p>
      </div>

      <div className="card">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Calendar className="w-5 h-5 text-amber-800" />
            <label className="font-medium text-gray-700">Select Date:</label>
            <input
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="input-field"
            />
          </div>
          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
        </div>
      )}

      {report && !loading && (
        <div className="space-y-6">
          {/* Sales by Product */}
          <div className="card">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Sales by Product</h2>
            {report.sales_by_product.length === 0 ? (
              <p className="text-gray-600">No sales data available for this date.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-amber-900">Product</th>
                      <th className="px-4 py-3 text-right font-semibold text-amber-900">Total Revenue</th>
                      <th className="px-4 py-3 text-right font-semibold text-amber-900">Quantity Sold</th>
                      <th className="px-4 py-3 text-left font-semibold text-amber-900">Breakdown</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {report.sales_by_product.map((product, index) => {
                      const details = report.product_details.filter(
                        d => d.product_name === product.product_name
                      );
                      const breakdown = details.map(d => {
                        const option = d.option_type === null ? 'endless' : d.option_type;
                        return `${option}: ${d.qty}`;
                      }).join(', ');

                      return (
                        <tr key={index} className="hover:bg-amber-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900">{product.product_name}</td>
                          <td className="px-4 py-3 text-right text-green-600 font-semibold">
                            ${parseFloat(product.total_revenue).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right font-medium">{product.total_qty}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{breakdown}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Sales by Category */}
          <div className="card">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Sales by Category</h2>
            {report.sales_by_category.length === 0 ? (
              <p className="text-gray-600">No sales data available for this date.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-amber-900">Category</th>
                      <th className="px-4 py-3 text-right font-semibold text-amber-900">Total Revenue</th>
                      <th className="px-4 py-3 text-right font-semibold text-amber-900">Quantity Sold</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {report.sales_by_category.map((category, index) => {
                      const categoryDisplay = category.category === 'Null' ? 'endless' : category.category;
                      return (
                        <tr key={index} className="hover:bg-amber-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900 capitalize">{categoryDisplay}</td>
                          <td className="px-4 py-3 text-right text-green-600 font-semibold">
                            ${parseFloat(category.total_revenue).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right font-medium">{category.total_qty}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Best Selling Product */}
          {report.best_selling && (
            <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-700" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-green-900 mb-2">Best Selling Product</h2>
                  <p className="text-lg text-gray-700 mb-3">
                    Popular option (with highest quantity sold) of best selling (highest revenue) product:
                  </p>
                  <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                    <p className="text-2xl font-bold text-green-800">
                      {report.best_selling.popular_option === 'null' ||
                        report.best_selling.popular_option === 'N/A' ||
                        report.best_selling.popular_option === null
                        ? 'Endless'
                        : report.best_selling.popular_option.charAt(0).toUpperCase() +
                        report.best_selling.popular_option.slice(1)
                      } of {report.best_selling.product_name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    <strong>Note:</strong> "{report.best_selling.product_name}" had the highest revenue
                    (${parseFloat(report.best_selling.total_revenue).toFixed(2)}),
                    and this option had the highest quantity sold ({report.best_selling.popular_option_qty} units).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SalesReportPage;
