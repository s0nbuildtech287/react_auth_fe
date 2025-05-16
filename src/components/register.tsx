import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../index"; // Import auth và db từ index.tsx

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Tạo người dùng với email và mật khẩu
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Đã tạo user:", user.uid);

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        username: username,
        phone: phone,
        age: parseInt(age),
        address: address,
        createdAt: new Date(),
      });
      console.log("Đã ghi vào Firestore");
      navigate("/");
    } catch (err: any) {
      console.error("Lỗi đăng ký:", err.code, err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Tên người dùng</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
              placeholder="Nhập tên người dùng"
              title="Tên người dùng"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Số điện thoại</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
              placeholder="Nhập số điện thoại"
              title="Số điện thoại"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tuổi</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border rounded"
              required
              placeholder="Nhập tuổi"
              title="Tuổi"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Địa chỉ</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded"
              required
              placeholder="Nhập địa chỉ"
              title="Địa chỉ"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
              placeholder="Nhập email của bạn"
              title="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
              placeholder="Nhập mật khẩu của bạn"
              title="Mật khẩu"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Đăng ký
          </button>
        </form>
        <p className="mt-4 text-center">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-500">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
