import { useState } from 'react'

import './App.css'

function App() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    // const name = e.target.name; const value = e.target.value
    const { name, value } = e.target
    setFormData(prev => ({
      // copy existing keys: userName, email, password, confirmPassword
      ...prev,
      // replace just the changed one
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    // prevent page reload from clearing react state
    e.preventDefault()
    console.log('Submitted data:', formData)
  }

  // all fields non-empty?
  const isComplete = formData.userName && formData.email && formData.password && formData.confirmPassword
  
  return (
      <form onSubmit={handleSubmit} className='form'>
        <div className='field'>
          <label>Username:</label>
          <input type="text" name="userName" placeholder="username" value={formData.userName} onChange={handleChange} />
        </div>
        <div className='field'>
          <label>Email:</label>
          <input type="email" name="email" placeholder="example@gmail.com" value={formData.email} onChange={handleChange} />
        </div>
        <div className='field'>
          <label>Password:</label>
          <input type="password" name="password" placeholder="******" value={formData.password} onChange={handleChange} />
        </div>
        <div className='field'>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" placeholder="******" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <button type="submit" disabled={!isComplete}>Submit</button>
      </form>
  )
}

export default App