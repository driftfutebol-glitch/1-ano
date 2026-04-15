export type PhotoItem = {
  src: string;
  alt: string;
};

export type MusicProvider = "spotify" | "ytmusic";

export type MusicConfig = {
  provider: MusicProvider;
  trackLabel: string;
  embedUrl: string;
  openUrl: string;
};

export type BackgroundAudioConfig =
  | {
      provider: "file";
      src: string;
      label: string;
      loop: boolean;
      coverImageUrl?: string;
    }
  | {
      provider: "youtube";
      videoId: string;
      label: string;
      loop: boolean;
      startSeconds?: number;
      coverImageUrl?: string;
    };

export type SiteContent = {
  coupleNameLine: string;
  heroTitle: string;
  heroSubtitle: string;
  messageTitle: string;
  messageBody: string;
  sliderIntervalMs: number;
  photos: PhotoItem[];
  music: MusicConfig;
  backgroundAudio?: BackgroundAudioConfig;
  owner: {
    displayName: string;
    adminPassphrase: string;
  };
  timeline: Array<{
    date: string;
    title: string;
    body: string;
  }>;
  surprise: {
    buttonLabel: string;
    title: string;
    body: string;
  };
  gift: {
    ctaLabel: string;
    pageTitle: string;
    pageSubtitle: string;
    formEmailLabel: string;
    formScoreLabel: string;
    formSubmitLabel: string;
    resultTitle: string;
    resultBody: string;
    resultCopyLabel: string;
    resultSendLabel: string;
    resultHint: string;
  };
  roulette: {
    spins: number;
    prizes: Array<{
      title: string;
      body: string;
    }>;
  };
};

export const siteContent: SiteContent = {
  coupleNameLine: "Pedro Ferraz & Ana Clara Braga Rafaela",
  heroTitle: "Feliz 1 ano de namoro",
  heroSubtitle: "Que venham muitos outros capítulos lindos da nossa história.",
  messageTitle: "Hoje faz 1 ano de nós dois",
  messageBody:
    "Hoje faz 1 ano de nós dois… 1 ano desde que nossas vidas se cruzaram e tudo começou a fazer mais sentido. ❤️\n\nNesse tempo eu descobri que amar você é uma das melhores coisas que já aconteceram comigo. Cada conversa, cada risada, cada momento juntos ficou guardado no meu coração. Você não é só minha namorada, você é minha companheira, minha paz e alguém que eu quero ter sempre ao meu lado.\n\nPassamos por momentos bons, desafios, aprendizados… e mesmo assim continuamos juntos, mais fortes e mais unidos. Isso mostra o quanto o nosso amor é verdadeiro.\n\nEu sou muito grato por ter você na minha vida, por todo carinho, paciência e por cada momento que você me faz feliz. Que esse seja apenas o primeiro de muitos anos que ainda vamos comemorar juntos.\n\nEu te amo muito, Ana Clara Braga Rafaela. 💖\n\nFeliz 1 ano de namoro para nós. Que venham muitos outros capítulos lindos da nossa história. ✨",
  sliderIntervalMs: 4500,
  photos: [
    {
      src:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Cdefs%3E%3CradialGradient id='g' cx='30%25' cy='20%25' r='90%25'%3E%3Cstop offset='0%25' stop-color='%23ffd1dc' stop-opacity='0.55'/%3E%3Cstop offset='45%25' stop-color='%23fb7185' stop-opacity='0.20'/%3E%3Cstop offset='100%25' stop-color='%230b0b0c'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E",
      alt: "Foto 1",
    },
    {
      src:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Cdefs%3E%3CradialGradient id='g' cx='80%25' cy='30%25' r='90%25'%3E%3Cstop offset='0%25' stop-color='%23fde68a' stop-opacity='0.35'/%3E%3Cstop offset='45%25' stop-color='%23f472b6' stop-opacity='0.22'/%3E%3Cstop offset='100%25' stop-color='%230b0b0c'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E",
      alt: "Foto 2",
    },
    {
      src:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Cdefs%3E%3CradialGradient id='g' cx='45%25' cy='85%25' r='100%25'%3E%3Cstop offset='0%25' stop-color='%23d8b4fe' stop-opacity='0.30'/%3E%3Cstop offset='50%25' stop-color='%23f472b6' stop-opacity='0.18'/%3E%3Cstop offset='100%25' stop-color='%230b0b0c'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E",
      alt: "Foto 3",
    },
    {
      src:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Cdefs%3E%3CradialGradient id='g' cx='20%25' cy='60%25' r='95%25'%3E%3Cstop offset='0%25' stop-color='%23ffe4e6' stop-opacity='0.35'/%3E%3Cstop offset='45%25' stop-color='%23fb7185' stop-opacity='0.16'/%3E%3Cstop offset='100%25' stop-color='%230b0b0c'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E",
      alt: "Foto 4",
    },
  ],
  music: {
    provider: "ytmusic",
    trackLabel: "Velha Infância",
    embedUrl: "https://www.youtube.com/embed/iyJDuJggiEM?rel=0",
    openUrl: "https://music.youtube.com/watch?v=iyJDuJggiEM",
  },
  backgroundAudio: {
    provider: "youtube",
    videoId: "iyJDuJggiEM",
    label: "Velha Infância",
    loop: true,
    coverImageUrl: "https://i.ytimg.com/vi/iyJDuJggiEM/hqdefault.jpg",
  },
  owner: {
    displayName: "Pedro",
    adminPassphrase: "pedro-ana-12-04-2024",
  },
  timeline: [
    {
      date: "12/04/2023",
      title: "O começo",
      body: "O dia em que a gente virou ‘nós’.",
    },
    {
      date: "—",
      title: "Os detalhes",
      body: "As conversas, os risos, os cuidados pequenos que viraram nosso jeito.",
    },
    {
      date: "12/04/2024",
      title: "1 ano",
      body: "365 dias de parceria, amor e história.",
    },
  ],
  surprise: {
    buttonLabel: "Botão surpresa",
    title: "Pra sempre eu e você",
    body: "Se eu pudesse te dar um presente todos os dias, seria a certeza de que eu escolho você — sempre. 💖",
  },
  gift: {
    ctaLabel: "Ir para o presente",
    pageTitle: "Seu presente",
    pageSubtitle: "Responde rapidinho e copia a chave pra me mandar.",
    formEmailLabel: "Seu e-mail",
    formScoreLabel: "De 0 a 100: quanto você me ama hoje?",
    formSubmitLabel: "Gerar minha chave",
    resultTitle: "Chave gerada",
    resultBody: "Copia a chave abaixo e me manda por mensagem.",
    resultCopyLabel: "Copiar chave",
    resultSendLabel: "Enviar no WhatsApp",
    resultHint: "Depois de copiar, me manda a chave pra eu confirmar o presente.",
  },
  roulette: {
    spins: 3,
    prizes: [
      { title: "Beijo + abraço", body: "Um beijo demorado e um abraço apertado." },
      { title: "Pedido especial", body: "Você pode me pedir qualquer coisa (dentro do possível).", },
      { title: "Encontro surpresa", body: "Um date surpresa marcado por mim.", },
      { title: "Mimo", body: "Um mimo simples pra você (do jeitinho que você gosta).", },
      { title: "Carta extra", body: "Uma carta curtinha escrita só pra você.", },
    ],
  },
};

