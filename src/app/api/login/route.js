import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ ok: false, message: "Email y contraseña requeridos" }), { status: 400 });
    }
    // valida el email
    if (!ValidEmail(email)) {
      return new Response(JSON.stringify({ ok: false, message: "Formato de email inválido" }), { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const users = db.collection("usuarios");
    // encuentra el usuario
    const user = await users.findOne({email});
    // dummy para asegurar que las operaciones tarden lo mismo
    const dummy = "$2b$10$dummyhashdummyhashdummyhashdu";
    const comparacion = user ? user.password : dummy;
    const isValid = await bcrypt.compare(password, comparacion);

    if (!user || !isValid) {
      return new Response(JSON.stringify({ ok: false, message: "Datos incorrectos" }), { status: 401 });
    }

    return new Response(
      JSON.stringify({ ok: true, message: "Usuario autenticado", user: { email: user.email, role: user.role } }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error login:", error);
    return new Response(JSON.stringify({ ok: false, message: "Error interno" }), { status: 500 });
  }
}
 // funcion para validar el email
function ValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}