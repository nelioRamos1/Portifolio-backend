require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Configuração do transporte de email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Rota para enviar emails
app.post("/send", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Você pode trocar por outro destino se quiser
    subject: `Novo contato de ${nome}`,
    text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    res.status(500).json({ success: false, message: "Erro ao enviar email." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
