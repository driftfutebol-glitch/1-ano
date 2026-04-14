# Design das Páginas — Site 1 Ano (Rafael & Ana Clara Braga)

## Diretrizes globais (todas as páginas)
- **Abordagem**: desktop-first, com adaptação progressiva para tablet e mobile.
- **Layout**: base em CSS Grid para estrutura de seções e Flexbox para alinhamentos internos.
- **Largura de conteúdo**: container central (máx. 1100–1200px), com margens generosas.
- **Espaçamento**: escala 4/8/12/16/24/32/48px; seções separadas por 48–72px no desktop.
- **Tipografia**: 
  - Títulos: serif elegante (ou uma sans “humanista” se preferir mais moderno).
  - Texto: sans legível.
  - Escala sugerida: H1 48–56px, H2 28–32px, H3 20–22px, corpo 16–18px.
- **Cores (tokens)**:
  - background: #FFF7F2 (off-white quente)
  - surface/cards: #FFFFFF
  - text: #1F1F1F
  - muted: #6B6B6B
  - accent (principal): #D85A7F (rosa/vinho suave)
  - accent-2: #2D6A6A (verde/azul petróleo para contraste)
- **Botões/links**:
  - Primário: fundo accent, texto branco, radius 12px, hover escurece ~8%.
  - Secundário: contorno accent, fundo transparente, hover com leve preenchimento.
  - Links: sublinhado suave no hover.
- **Imagens**:
  - Sempre com bordas arredondadas (12–16px).
  - Priorizar recortes consistentes (ex.: 4:3 ou 1:1 na Galeria).
- **Microinterações**:
  - Transições 150–200ms (opacity/transform).
  - Cards com hover: elevar 2–4px e sombra leve.

## Metadados (SEO/compartilhamento)
- **Title base**: “1 Ano de Namoro — Rafael & Ana Clara Braga”.
- **Description**: “Um site temporário para celebrar 1 ano de namoro com fotos e nossa história.”
- **Open Graph**:
  - og:title = Title base
  - og:description = Description
  - og:image = 1 foto principal (corte 1200×630)

---

## Página: Página Inicial
### Estrutura (stacked sections)
1. **Topbar (fixa opcional, não obrigatória)**
   - Esquerda: “Rafael & Ana Clara Braga”.
   - Direita: links “Nossa História” e “Galeria”.
2. **Hero**
   - H1: “1 ano de nós”.
   - Subtexto: frase curta (ex.: “365 dias de amor, risadas e parceria.”).
   - Foto destaque (1 imagem grande) + selo “1 ano” (badge discreto).
   - CTAs: “Ver nossa história” (primário) e “Abrir galeria” (secundário).
3. **Destaques do ano (cards)**
   - Grade 3 colunas no desktop (quebra para 1 coluna no mobile).
   - Cada card: data (pequena), título do marco, texto 1–2 linhas.
4. **Carta final (seção emocional)**
   - Fundo “surface” com sombra leve.
   - Título: “Pra você, com amor”.
   - Texto em parágrafos curtos (melhor leitura).
   - Assinatura no rodapé do bloco.
5. **Rodapé**
   - Texto curto: “Site comemorativo disponível por 1 mês.”

### Responsividade
- Hero passa de layout “texto à esquerda + foto à direita” (desktop) para “texto acima + foto abaixo” (mobile).
- Destaques: 3 → 2 → 1 coluna.

---

## Página: Nossa História
### Estrutura (timeline)
1. **Header da página**
   - H1: “Nossa História”.
   - Subtexto: “Alguns capítulos do nosso primeiro ano”.
2. **Linha do tempo (vertical no desktop, colapsável no mobile)**
   - Eixo central/à esquerda com pontos (milestones).
   - Cada item:
     - Data (opcional)
     - Título do momento
     - Texto 2–5 linhas
     - Foto opcional (miniatura com clique abre modal simples)
3. **Encerramento**
   - Bloco “o que vem por aí” (1 parágrafo) + botão para Galeria.

### Interações
- Ao rolar, realçar o item ativo (mudança sutil de cor do ponto).
- Fotos opcionais abrem em modal (mesmo componente do lightbox).

---

## Página: Galeria
### Estrutura (grid + lightbox)
1. **Header da página**
   - H1: “Galeria”.
   - Subtexto: “Momentos que viraram memória”.
2. **Grid de fotos**
   - Desktop: 3–4 colunas (dependendo do tamanho das imagens).
   - Cada item: foto + legenda curta abaixo (muted).
3. **Lightbox (modal)**
   - Foto grande central.
   - Controles: fechar (X), anterior, próxima.
   - Legenda e contador “3/24”.

### Acessibilidade (mínimo essencial)
- Navegação por teclado no modal (Esc fecha; setas navegam).
- Textos alternativos (alt) descritivos nas imagens.
