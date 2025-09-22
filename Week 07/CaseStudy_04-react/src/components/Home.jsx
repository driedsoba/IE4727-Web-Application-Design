export default function Home() {
  return (
    <div className="row align-items-center py-4">
      <div className="col-md-3 col-lg-3">
        <img src="/coffee.jpg" alt="Coffee cup" className="feature-img mb-3" />
      </div>
      <div className="col-md-9 col-lg-9">
        <h2 className="mb-3">Follow the Winding Road to JavaJam</h2>
        <p className="lead">Warm drinks, tasty treats, and live music—your neighbourhood spot to unwind.</p>
        <ul className="mb-3">
          <li>Specialty Coffee and Tea</li>
          <li>Bagel, Muffins, and Organic Snacks</li>
          <li>Music and Poetry Readings</li>
          <li>Open Mic Night Every Friday</li>
        </ul>

        <address>
          54321 Route 42<br />
          Elison Bay, WI 54210<br />
          <abbr title="Phone">P:</abbr> 888-555-8888
        </address>
        <p className="mt-3">
          <a href="/menu" className="btn btn-primary">View menu</a>
        </p>
      </div>
    </div>
  )
}
