import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface UserInfo {
  uid: string;
  email: string;
}

const Home: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const idToken = await auth.currentUser?.getIdToken();
        console.log("idToken:", idToken);
        if (idToken) {
          const response = await fetch(
            "http://localhost:5000/api/verify-token",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idToken }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to verify token");
          }
          const data = await response.json();
          setUserInfo(data);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Chào mừng bạn đến với ứng dụng!
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {userInfo && <p className="text-lg mb-4">Xin chào, {userInfo.email}</p>}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Home;
