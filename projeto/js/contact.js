document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio tradicional
  
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;
  
    const responseMessage = document.createElement("p");
    responseMessage.style.marginTop = "10px";
  
    try {
      const response = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        responseMessage.textContent = "Email enviado com sucesso!";
        responseMessage.style.color = "green";
      } else {
        responseMessage.textContent = "Erro ao enviar email.";
        responseMessage.style.color = "red";
      }
    } catch (error) {
      console.error("Erro:", error);
      responseMessage.textContent = "Erro ao conectar com o servidor.";
      responseMessage.style.color = "red";
    }
  
    document.getElementById("contact-form").appendChild(responseMessage);
  });
  