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
      src: "https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20romantic%20couple%20silhouette%20at%20sunset%2C%20warm%20peach%20and%20rose%20color%20palette%2C%20soft%20film%20grain%2C%20bokeh%20lights%2C%20dreamy%20atmosphere%2C%20high%20detail%2C%20photoreal%2C%2085mm%2C%20natural%20light&image_size=landscape_16_9",
      alt: "Foto 1",
    },
    {
      src: "https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=close-up%20hands%20holding%20with%20wedding%20rings%20style%20jewelry%2C%20romantic%20soft%20lighting%2C%20warm%20tones%2C%20minimal%20background%2C%20film%20photography%20look%2C%20high%20detail%2C%20photoreal&image_size=landscape_16_9",
      alt: "Foto 2",
    },
    {
      src: "https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=romantic%20street%20night%20walk%2C%20city%20lights%2C%20soft%20rain%20reflections%2C%20cozy%20hoodies%2C%20candid%20moment%2C%20cinematic%2C%20warm%20neon%2C%20film%20grain%2C%20photoreal&image_size=landscape_16_9",
      alt: "Foto 3",
    },
    {
      src: "https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=polaroid%20photo%20collage%20on%20a%20table%2C%20romantic%20memories%2C%20flowers%2C%20handwritten%20notes%2C%20warm%20soft%20light%2C%20high%20detail%2C%20photoreal&image_size=landscape_16_9",
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

