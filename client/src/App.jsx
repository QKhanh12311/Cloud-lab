import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/students')
        if (!response.ok) throw new Error('Không thể tải danh sách sinh viên.')
        const data = await response.json()
        setStudents(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Không thể thêm sinh viên.')

      const student = await response.json()
      setStudents((currentStudents) => [...currentStudents, student])
      setFormData({ studentId: '', name: '', email: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="app-shell">
      <h1>Danh sách sinh viên</h1>
      <section className="form-panel" aria-labelledby="form-title">
        <h2 id="form-title">Nhập thông tin sinh viên</h2>
        <form className="student-form" onSubmit={handleSubmit}>
          <input name="studentId" placeholder="MSSV" value={formData.studentId} onChange={handleChange} required />
          <input name="name" placeholder="Họ tên" value={formData.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <button type="submit" disabled={submitting}>{submitting ? 'Đang gửi...' : 'Nhập'}</button>
        </form>
      </section>
      <section className="student-panel" aria-label="Danh sách sinh viên">
        {loading && <p className="state-message">Đang tải danh sách...</p>}
        {!loading && error && <div className="state-message error-message" role="alert">{error}</div>}
        {!loading && !error && students.length === 0 && <p className="state-message">Chưa có sinh viên nào.</p>}
        {!loading && !error && students.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ tên</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id || student.studentId || student.mssv}>
                  <td className="id-cell">{student.studentId || student.mssv || '—'}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  )
}

export default App
