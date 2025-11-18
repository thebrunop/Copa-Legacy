function showSection(sec) {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
  document.getElementById(sec).classList.remove('hidden');
}

let jogadores = JSON.parse(localStorage.getItem("jogadores") || "[]");

function salvar() {
  localStorage.setItem("jogadores", JSON.stringify(jogadores));
}

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
  salvar();
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

function carregarTimes() {
  let area = document.getElementById("listaTimes");
  area.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    area.innerHTML += `
      <div class='team'>
        <img src='escudo${i}.png'>
        <p>Time ${i}</p>
      </div>`;
  }
}

let tabelaEtapa = 0; // 0 = grupos, 1 = semi, 2 = final

function tabelaAnterior() {
  tabelaEtapa = Math.max(0, tabelaEtapa - 1);
  atualizarTabela();
}

function tabelaProxima() {
  tabelaEtapa = Math.min(2, tabelaEtapa + 1);
  atualizarTabela();
}

function atualizarTabela() {
  let titulo = document.getElementById("tituloTabela");
  let conteudo = document.getElementById("conteudoTabela");

  if (tabelaEtapa === 0) {
    titulo.textContent = "Fase de Grupos";
    conteudo.innerHTML = gerarGrupos();
  } else if (tabelaEtapa === 1) {
    titulo.textContent = "Semi-Final";
    conteudo.innerHTML = "<p>Confrontos da semi-final serão exibidos aqui.</p>";
  } else {
    titulo.textContent = "Final";
    conteudo.innerHTML = "<p>Confronto final será exibido aqui.</p>";
  }
}

function gerarGrupos() {
  let grupos = {
    A: ["Time 1", "Time 2", "Time 3"],
    B: ["Time 4", "Time 5", "Time 6"]
  };

  let tabela = `
    <h3>Grupo A</h3>
    ${gerarTabelaGrupo(grupos.A)}
    <h3>Grupo B</h3>
    ${gerarTabelaGrupo(grupos.B)}
  `;
  return tabela;
}

function gerarTabelaGrupo(times) {
  let html = "<table><tr><th>Time</th><th>Pts</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GF</th><th>GS</th><th>SG</th></tr>";
  times.forEach(t => {
    html += `<tr><td>${t}</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>`;
  });
  html += "</table>";
  return html;
}

carregarTimes();
atualizarTabelaJogadores();
atualizarTabela();
