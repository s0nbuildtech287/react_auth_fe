import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
              placeholder="Nhập email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mật khẩu</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Đăng nhập
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Đăng nhập bằng Google Login
        </button>
        <p className="mt-4 text-center">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
