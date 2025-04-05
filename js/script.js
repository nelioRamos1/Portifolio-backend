function toggleMenu() {
    var menu = document.getElementById("menu");
    
    // Alterna a visibilidade do menu
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Função para movimentar os ícones aleatoriamente
function moveIcons() {
    const icons = document.querySelectorAll('.icone i');
    const container = document.querySelector('.bemVindo');

    icons.forEach(icon => {
        let maxX = container.clientWidth - 50; // Evita que o ícone saia da tela
        let maxY = container.clientHeight - 50;

        let newX = getRandom(0, maxX);
        let newY = getRandom(0, maxY);

        icon.style.top = `${newY}px`;
        icon.style.left = `${newX}px`;
    });
}

// Inicia o movimento e repete a cada 3 segundos
setInterval(moveIcons, 3000);

// Chama a função assim que a página carrega
document.addEventListener("DOMContentLoaded", moveIcons);

document.addEventListener("DOMContentLoaded", function() {
    let h1 = document.querySelector(".animado");
    let text = h1.innerText;
    h1.innerHTML = ""; // Limpa o texto original

    // Cria um <span> para cada letra
    text.split("").forEach((char, index) => {
        let span = document.createElement("span");
        span.innerText = char;
        h1.appendChild(span);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    new Splide('#carrossel', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      autoplay: true,
      interval: 3000,
      focus: 'center',  // <- Garante que o slide central esteja bem posicionado
      pagination: false,
      arrows: true,
      breakpoints: {
        1024: { perPage: 2 },
        768: { perPage: 1 }
      }
    }).mount();
  });

  particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ff0000"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 4,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ff0000",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            }
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// backend/server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor rodando 🟢");
});

// Rota de envio do formulário
app.post("/send", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Configura o transporte
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,     // seu email
      pass: process.env.EMAIL_PASS      // sua senha ou app password
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Mensagem de ${nome}`,
      text: mensagem,
    });

    res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    res.status(500).json({ message: "Erro ao enviar email." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
