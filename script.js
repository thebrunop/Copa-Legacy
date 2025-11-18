function showSection(sec) {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
  document.getElementById(sec).classList.remove('hidden');
}

let jogadores = [];

function registrarJogador() {
  let nome = document.getElementById('nome').value.trim();
  let tel = document.getElementById('telefone').value.trim();
  let msg = document.getElementById('msg');

  if (!nome || !tel) {
    msg.textContent = "Preencha todos os campos.";
    return;
  }

  if (!/^\d{11}$/.test(tel)) {
    msg.textContent = "Telefone deve ter 11 dígitos (DDD + 9).";
    return;
  }

  if (jogadores.some(j => j.nome === nome || j.tel === tel)) {
    msg.textContent = "Jogador já registrado.";
    return;
  }

  jogadores.push({ nome, tel, gols: 0 });
  msg.textContent = "Registrado!";
  atualizarTabelaJogadores();
}

function atualizarTabelaJogadores() {
  let tabela = document.getElementById('tabelaJogadores');
  tabela.innerHTML = "<tr><th>Nome</th><th>Gols</th></tr>";

  jogadores.forEach(j => {
    tabela.innerHTML += `<tr><td>${j.nome}</td><td>${j.gols}</td></tr>`;
  });
}
