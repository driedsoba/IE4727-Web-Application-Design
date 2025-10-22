import { Briefcase, DollarSign, Clock, Users } from 'lucide-react';

const JobsPage = () => {
  const positions = [
    {
      title: 'Barista',
      pay: '$12-15/hour',
      hours: 'Part-time & Full-time',
      description: 'Prepare and serve coffee drinks, maintain cleanliness, provide excellent customer service'
    },
    {
      title: 'Shift Supervisor',
      pay: '$16-18/hour',
      hours: 'Full-time',
      description: 'Oversee daily operations, manage staff, handle customer concerns, inventory management'
    },
    {
      title: 'Baker',
      pay: '$14-16/hour',
      hours: 'Early morning shifts',
      description: 'Prepare fresh pastries and baked goods, maintain kitchen cleanliness, follow recipes'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Briefcase className="w-10 h-10 text-amber-800" />
          <h1 className="text-4xl font-bold text-amber-900">Join Our Team</h1>
        </div>
        <p className="text-gray-600">Be part of the JavaJam family</p>
      </div>

      <div className="card bg-gradient-to-r from-amber-50 to-orange-50">
        <h2 className="text-2xl font-bold text-amber-900 mb-3">Why Work at JavaJam?</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2">
            <span className="text-amber-800">✓</span> Competitive wages and tips
          </li>
          <li className="flex items-center gap-2">
            <span className="text-amber-800">✓</span> Flexible scheduling
          </li>
          <li className="flex items-center gap-2">
            <span className="text-amber-800">✓</span> Free coffee and meals during shifts
          </li>
          <li className="flex items-center gap-2">
            <span className="text-amber-800">✓</span> Friendly work environment
          </li>
          <li className="flex items-center gap-2">
            <span className="text-amber-800">✓</span> Growth opportunities
          </li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {positions.map((position, index) => (
          <div key={index} className="card hover:scale-105 transition-transform">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">{position.title}</h3>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-semibold">{position.pay}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>{position.hours}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{position.description}</p>

            <button className="w-full btn-primary">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-amber-900 mb-3">How to Apply</h2>
        <p className="text-gray-700 mb-4">
          Interested in joining our team? Send your resume and cover letter to:
        </p>
        <a
          href="mailto:jobs@javajamcoffeehouse.com"
          className="text-amber-800 hover:text-amber-900 font-semibold underline"
        >
          jobs@javajamcoffeehouse.com
        </a>
      </div>
    </div>
  );
};

export default JobsPage;
