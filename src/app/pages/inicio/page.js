"use client";
import { useState } from "react";
import "./inicio.css";

export default function Inicio() {
  const [view, setView] = useState("calendar");

  return (
    <main className="main">
      <h1>Bienvenido a tu Agenda</h1>
      <p>¡Manos a la obra!</p>

      <div className="contenedor">
        {/* Contenedor de imágenes  */}
        <div className="contenedorImagen">
          <img
            src="/calendario.png"
            alt="Calendario"
            className={`imagen ${view === "calendar" ? "active" : ""}`}
            onClick={() => setView("calendar")}
          />
          <img
            src="/agenda.png"
            alt="Agenda"
            className={`imagen ${view === "agenda" ? "active" : ""}`}
            onClick={() => setView("agenda")}
          />
          <img
            src="/eventos.png"
            alt="Eventos"
            className={`imagen ${view === "events" ? "active" : ""}`}
            onClick={() => setView("events")}
          />
        </div>
        {/* Contenedor de vista dinámica */}
        <div className="viewContainer">
          {view === "calendar" && <div className="placeholder">Calendario vacío</div>}
          {view === "agenda" && <div className="placeholder">Agenda vacía</div>}
          {view === "events" && <div className="placeholder">Eventos vacíos</div>}
        </div>
      </div>
    </main>
  );
}
