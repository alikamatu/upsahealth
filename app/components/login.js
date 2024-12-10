import { FcGoogle } from "react-icons/fc";

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "https://healthbackend.vercel.app/auth/google";
  }
  return (
    <div className="flex w-full pl-4 md:pl-0 justify-start items-start">
        <button
      className="google-signin-button flex items-start justify-start gap-3 px-6 py-2 text-sm font-medium border rounded-lg shadow-md hover:bg-gray-100"
      onClick={handleGoogleLogin}
    >
      <FcGoogle size={20} />
      <span>Sign in with Google</span>
    </button>
    </div>
  );
}

export default Login;
