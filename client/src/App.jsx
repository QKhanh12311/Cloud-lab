import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Danh sách sinh viên</h1>
      
      <h2>Nhập thông tin sinh viên</h2>
      <div className="form-group">
        <input placeholder="MSSV" />
        <input placeholder="Họ tên" />
        <input placeholder="Email" />
        <button>Nhập</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {/* Map danh sách sinh viên ở đây */}
        </tbody>
      </table>
    </div>
  );
}