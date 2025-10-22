import { Coffee, MapPin, Clock } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-amber-900">Welcome to JavaJam Coffee House</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Relax at JavaJam with a specialty coffee drink, a snack, and a good conversation.
          We feature live music every Friday and Saturday evening.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-4 rounded-full">
              <Coffee className="w-12 h-12 text-amber-800" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-amber-900 mb-2">Specialty Coffee</h3>
          <p className="text-gray-600">
            Locally roasted, fair trade coffee beans
          </p>
        </div>

        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-4 rounded-full">
              <MapPin className="w-12 h-12 text-amber-800" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-amber-900 mb-2">Great Location</h3>
          <p className="text-gray-600">
            12010 Garrett Bay Road, Ellison Bay, WI 54210
          </p>
        </div>

        <div className="card text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-4 rounded-full">
              <Clock className="w-12 h-12 text-amber-800" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-amber-900 mb-2">Open Daily</h3>
          <p className="text-gray-600">
            Monday - Friday: 6am - 8pm<br />
            Saturday - Sunday: 7am - 9pm
          </p>
        </div>
      </div>

      <div className="card bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="flex items-center justify-center">
          <img
            src="/coffee.jpg"
            alt="Fresh coffee"
            className="rounded-lg shadow-lg max-w-full h-auto"
            style={{ maxHeight: '400px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
