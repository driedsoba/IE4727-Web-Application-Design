import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Jobs() {
  const [formData, setFormData] = useState({ CustName: '', CustEmail: '', startdate: '', comments: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverResponse, setServerResponse] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!/^[a-zA-Z\s]{2,}$/.test(formData.CustName)) newErrors.CustName = 'Enter a valid name (letters and spaces)'
    if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/.test(formData.CustEmail)) newErrors.CustEmail = 'Enter a valid email'
    if (!formData.comments || formData.comments.trim().length < 10) newErrors.comments = 'Please describe your experience (10+ chars)'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      // post to server-side handler
      setSubmitting(true)
      setServerResponse(null)
      const body = new URLSearchParams()
      body.append('CustName', formData.CustName)
      body.append('CustEmail', formData.CustEmail)
      body.append('startdate', formData.startdate)
      body.append('comments', formData.comments)
      fetch('/show_post.php', { method: 'POST', body, headers: { 'Accept': 'application/json, text/plain' } })
        .then(async (r) => {
          const text = await r.text()
          // try parse JSON
          try {
            const data = JSON.parse(text)
            return { ok: r.ok, data }
          } catch {
            return { ok: r.ok, data: { raw: text } }
          }
        })
        .then((res) => {
          if (res.data && res.data.success) {
            // success from server: redirect to thanks
            setFormData({ CustName: '', CustEmail: '', startdate: '', comments: '' })
            if (navigate) navigate('/thanks')
            return
          }

          // if server sent validation errors, show inline
          if (res.data && res.data.errors) {
            setErrors(res.data.errors)
            setServerResponse({ ok: false, text: 'Please fix the errors below.' })
          } else {
            // fallback: show raw server reply
            setServerResponse({ ok: false, text: res.data && res.data.raw ? res.data.raw : 'Unexpected server response' })
          }
        })
        .catch((err) => setServerResponse({ ok: false, text: String(err) }))
        .finally(() => setSubmitting(false))
    }
  }

  return (
    <div className="container py-4">
      <h2>Jobs at JavaJam</h2>
      <p>Want to work at JavaJam? Fill out the form below to start your application. Required fields are marked with an asterisk *</p>

      <form onSubmit={handleSubmit} className="job-form">
        <div className="mb-3 row">
          <label htmlFor="CustName" className="col-sm-2 col-form-label text-sm-end">*Name:</label>
          <div className="col-sm-6">
            <input id="CustName" name="CustName" type="text" className="form-control" value={formData.CustName} onChange={handleChange} placeholder="Enter your name here" />
            {errors.CustName && <div className="form-text text-danger">{errors.CustName}</div>}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="CustEmail" className="col-sm-2 col-form-label text-sm-end">*E-mail:</label>
          <div className="col-sm-6">
            <input id="CustEmail" name="CustEmail" type="email" className="form-control" value={formData.CustEmail} onChange={handleChange} placeholder="Enter your Email-ID here" />
            {errors.CustEmail && <div className="form-text text-danger">{errors.CustEmail}</div>}
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="startdate" className="col-sm-2 col-form-label text-sm-end">Start Date:</label>
          <div className="col-sm-4">
            <input id="startdate" name="startdate" type="date" className="form-control" value={formData.startdate} onChange={handleChange} />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="comments" className="col-sm-2 col-form-label text-sm-end">*Experience:</label>
          <div className="col-sm-8">
            <textarea id="comments" name="comments" rows="4" className="form-control" value={formData.comments} onChange={handleChange} placeholder="Enter your past experience here"></textarea>
            {errors.comments && <div className="form-text text-danger">{errors.comments}</div>}
          </div>
        </div>

        <div className="row">
          <div className="offset-sm-2 col-sm-8">
            <button type="button" className="btn btn-secondary me-2" onClick={() => setFormData({ CustName: '', CustEmail: '', startdate: '', comments: '' })}>Clear</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Submitting…' : 'Apply Now'}</button>
          </div>
        </div>
      </form>
      {serverResponse && (
        <div className={`mt-3 alert ${serverResponse.ok ? 'alert-success' : 'alert-danger'}`} role="alert">
          <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{serverResponse.text}</pre>
        </div>
      )}
    </div>
  )
}
