import { FcGoogle } from "react-icons/fc";

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";

  return (
    <div>
        <button
      className="google-signin-button flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium border rounded-lg shadow-md hover:bg-gray-100"
      onClick={handleGoogleLogin}
    >
      <FcGoogle size={20} />
      <span>Sign in with Google</span>
    </button>
    </div>
  );
}

export default Login;