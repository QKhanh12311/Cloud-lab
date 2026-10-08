const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ==============================
// CẤU HÌNH CORS CHO PRODUCTION
// ==============================
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      process.env.NODE_ENV !== 'production'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// ==============================
// KẾT NỐI MONGODB ATLAS
// ==============================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) =>
    console.error('MongoDB connection error:', err)
  );

// ==============================
// MODEL STUDENT
// ==============================
const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const Student = mongoose.model('Student', studentSchema);

// ==============================
// API HELLO
// ==============================
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Backend đang hoạt động ngon lành!'
  });
});

// ==============================
// GET - LẤY DANH SÁCH SINH VIÊN
// ==============================
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// ==============================
// POST - THÊM SINH VIÊN
// ==============================
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);

    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
});

// ==============================
// PUT - CẬP NHẬT SINH VIÊN
// ==============================
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent =
      await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
});

// ==============================
// DELETE - XÓA SINH VIÊN
// ==============================
app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Xóa sinh viên thành công'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// ==============================
// START SERVER
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Backend Server is running on port ${PORT}`
  );
});