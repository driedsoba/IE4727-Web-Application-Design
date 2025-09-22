export default function Music() {
  return (
    <div className="py-4">
      <h2 className="mb-3">Music at JavaJam</h2>
      <p className="mb-4">The first Friday night each month at JavaJam is a special night. Join us from 8pm to 11pm for some music you won't want to miss.</p>

      <div className="mb-5">
        <h5>January</h5>
        <div className="row align-items-center">
          <div className="col-md-3">
            <img src="/coffee.jpg" alt="artist" className="img-fluid interactive" />
          </div>
          <div className="col-md-9">
            <p>Melanie Morris entertains with her melodic folk style.</p>
            <p className="fw-semibold">CDs are available now!</p>
            <audio controls className="w-100" />
          </div>
        </div>
      </div>

      <div>
        <h5>February</h5>
        <div className="row align-items-center">
          <div className="col-md-3">
            <img src="/coffee.jpg" alt="artist" className="img-fluid interactive" />
          </div>
          <div className="col-md-9">
            <p>Tahoe Greg is back from his tour. New songs. New stories.</p>
            <p className="fw-semibold">CDs are available now!</p>
            <audio controls className="w-100" />
          </div>
        </div>
      </div>
    </div>
  )
}
