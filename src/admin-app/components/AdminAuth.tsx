import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const AdminAuth = ({ onAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signIn({ email });

    if (error) {
      setError(error.message);
    } else {
      onAuthenticated(true);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-spotify-black">
      <h1 className="text-4xl font-bold text-white">Admin Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-4 p-2 rounded-md"
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button
        variant="outline"
        onClick={handleLogin}
        disabled={loading}
        className="mt-4"
      >
        {loading ? "Loading..." : "Send Magic Link"}
      </Button>
    </div>
  );
};

export { AdminAuth };
