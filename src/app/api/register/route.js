import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ ok: false, message: "Email y contraseña requeridos" }), { status: 400 });
    }

    // valida el email y contrasenia
    if (!ValidEmail(email)) {
      return new Response(JSON.stringify({ ok: false, message: "Formato de email inválido" }), { status: 400 });
    }
    if(EmailPasswordLength(password, email)){
      return new Response(JSON.stringify({ ok: false, message: "Correo y/o contrasena de longitud invalida" }), { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const users = db.collection("usuarios");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ ok: false, message: "Usuario ya existe" }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date()
    };

    await users.insertOne(newUser);

    return new Response(JSON.stringify({ ok: true, message: "Usuario registrado" }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ ok: false, message: "Error interno" }), { status: 500 });
  }
}

 // funcion para validar el email
function ValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function EmailPasswordLength(password, email) {
  return password && password.length >= 8 && password.length <= 100 && email.length <= 250;
}