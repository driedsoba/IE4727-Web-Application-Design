import { Music2, Calendar } from 'lucide-react';

const MusicPage = () => {
  const events = [
    { date: 'October 25', artist: 'Melanie Morris', genre: 'Contemporary Folk' },
    { date: 'November 1', artist: 'Tahoe Greg', genre: 'Eclectic Guitar' },
    { date: 'November 8', artist: 'The Tone Rangers', genre: 'Western Swing' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Music2 className="w-10 h-10 text-amber-800" />
          <h1 className="text-4xl font-bold text-amber-900">Live Music Events</h1>
        </div>
        <p className="text-gray-600">Enjoy live music every Friday and Saturday evening</p>
      </div>

      <div className="card">
        <p className="text-lg text-gray-700 text-center mb-6">
          JavaJam features live music every Friday and Saturday evening from 8pm to 11pm.
          Come and enjoy our cozy atmosphere with great music!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div key={index} className="card hover:scale-105 transition-transform">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-amber-800" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">{event.date}</p>
                <p className="text-xs text-gray-500">8pm - 11pm</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-2">{event.artist}</h3>
            <p className="text-gray-600">{event.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPage;
