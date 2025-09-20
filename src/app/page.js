import Navbar from './pages/Navbar/Navbar';
import styles from "./page.module.css";
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <h1>Agenda en Linea</h1>
        <p>Agenda tus tareas o recordatorios.</p>

        {/* Primer contenedor */}
        <div className={styles.contenedor}>
        <div className={styles.seccion}>
          <h1>Agenda de Tareas</h1>
          <p>
          Organiza tus actividades y optimiza tu tiempo. Con esta agenda de tareas,
          puedes planificar tu rutina diaria, semanal o mensual, establecer plazos y 
          llevar un control claro de tus tareas completadas
          </p>
          <button>Ir</button>
        </div>
        <div className={styles.imagenSeccion}>
          <Image src="/agendaSeccion1.png" alt="Agenda" width={600} height={400} />
        </div>
      </div>


      {/* Segundo contenedor */}
      <div className={styles.contenedor}>
         <div className={styles.imagenSeccion}>
          <Image src="/astronauta.png" alt="Agenda" width={600} height={400} />
        </div>
        <div className={styles.seccion}>
          <h1>Recordatorios</h1>
          <p>
          Crea recordatorios para tus eventos y actividades. 
          Te avisaremos en el momento que elijas para que siempre tengas todo bajo control
          </p>
          <button>Ir</button>
        </div>
       
      </div>



      </main>
    </>
  );
}
