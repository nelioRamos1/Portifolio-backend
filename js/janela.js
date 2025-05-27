function abrirModal(card) {
    const modal = document.getElementById('janela--modal');
    const titulo = card.getAttribute('data-titulo');
    const texto = card.getAttribute('data-texto');

    // Atualiza o conteúdo do modal
    modal.querySelector('h1').innerText = titulo;
    modal.querySelector('p').innerText = texto;

    // Abre o modal
    modal.classList.add('abrir');

    // Evento para fechar o modal
    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela--modal') {
            modal.classList.remove('abrir');
        }
    });
}
