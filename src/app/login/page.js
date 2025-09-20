"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();  

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.ok) {
      // 🔹 Redirigir a la página de inicio
      router.push("/pages/inicio");
    }
  };

  return (
    <main className="main">
      <div className="contenedor">
        <div className="seccion">
          <h1>Inicia Sesión</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="inputField"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="inputField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="botonLogin">Ingresar</button>
          </form>
          {message && (
            <p className={`message ${message.includes("exitoso") || message.includes("autenticado") ? "success" : "error"}`}>
              {message}
            </p>
          )}
          <p className="registro">
            ¿No tienes cuenta? <a href="/Registro">Regístrate aquí</a>
          </p>
        </div>
      </div>
    </main>
  );
}
