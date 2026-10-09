// Mostra os usuários na página
function mostrarUsuarios(usuarios) {
  const lista = document.getElementById("listaUsuarios");

  // Limpa os cartões anteriores
  lista.innerHTML = "";

  if (usuarios.length === 0) {
    const mensagem = document.createElement("li");

    mensagem.textContent = "Nenhum usuário encontrado.";

    lista.appendChild(mensagem);
    return;
  }

  usuarios.forEach((usuario) => {
    const item = document.createElement("li");

    const nome = document.createElement("h2");
    nome.textContent = usuario.name;

    const telefone = document.createElement("p");
    telefone.textContent = `Telefone: ${usuario.phone}`;

    item.appendChild(nome);
    item.appendChild(telefone);

    lista.appendChild(item);
  });
}

// Busca os usuários na API
async function buscarUsuarios() {

    const lista = document.getElementById("listaUsuarios");
    lista.textContent = "Carregando usuários...";

  try {
    const resposta = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar usuários");
    }

    const usuarios = await resposta.json();

    // Mostra todos os usuários inicialmente
    mostrarUsuarios(usuarios);

    const pesquisa = document.getElementById("pesquisa");

    pesquisa.addEventListener("input", () => {
      const texto = pesquisa.value.toLowerCase();

      const filtrados = usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(texto),
      );

      mostrarUsuarios(filtrados);
    });
  } catch (erro) {
    console.log("Erro ao buscar usuários:", erro);
    
    lista.textContent = "Não foi possivel carregar os usuario.";
  }
}

buscarUsuarios();
