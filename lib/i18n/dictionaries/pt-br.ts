import type { Dictionary } from "./en";

/**
 * Português (Brasil). Machine translated from en.ts; pending a manual review
 * (see language.machineTranslated). Must match the shape of en.ts.
 */
const ptBr: Dictionary = {
  meta: {
    title: "Breno Araujo — Product designer",
    description:
      "Product designer e design engineer em Vancouver. Primeiro escuto e reúno contexto, depois prototipo rápido, no Figma, em código ou com IA, para reduzir a ambiguidade.",
  },

  common: {
    skipToContent: "Pular para o conteúdo",
  },

  language: {
    switchLabel: "Idioma",
    short: "PT",
    name: "Português (Brasil)",
    prompt: {
      title: "Prefere ler em português?",
      body: "Este site também está disponível em português do Brasil.",
      accept: "Ver em português",
      decline: "Continuar em inglês",
      close: "Fechar",
    },
    machineTranslated: true,
    toast: {
      title: "Tradução automática",
      body: "O conteúdo em português foi traduzido automaticamente e pode conter erros. Em breve, todos os textos serão revisados manualmente.",
      close: "Fechar aviso",
    },
  },

  header: {
    nav: {
      work: "Trabalhos",
      experience: "Experiência",
      writing: "Artigos",
      off: "Fora do expediente",
    },
    pill: "Aberto a vagas de product design",
    backToWork: "← Voltar aos trabalhos",
  },

  hero: {
    eyebrow: "Product designer & design engineer",
    headline: "Da ideia à clareza, pelo design.",
    subcopy:
      "Há 16 anos ajudo equipes a decidir o que construir e desenho como tudo funciona. Sempre equilibrando as necessidades dos usuários com os objetivos do negócio.",
    cta: "Vamos conversar no LinkedIn →",
  },

  work: {
    "change-it": { tag: "UX e conversão", title: "Cadastro mais rápido em dia de jogo" },
    "on-site-ticket-sales-app": { tag: "App mobile", title: "Venda de rifas para voluntários em estádios" },
    "raffle-landing-design-system": { tag: "Design system", title: "Design system para landing pages de rifas" },
    invoice: { tag: "Financeiro", title: "Gestão de faturas" },
    "onboarding-revenue-streamline": { tag: "Fluxo e UI", title: "Onboarding para uma nova fonte de receita" },
    "sales-commission": { tag: "UX/UI design", title: "Substituindo a planilha de comissões" },
  },

  experience: {
    title: "Experiência",
    linkedin: "LinkedIn ↗",
    rows: [
      { co: "Ascend", role: "Senior Product Designer", years: "2023—26", desc: "Direção de design para ponto de venda, checkout, design systems e uma plataforma de operações de marketing." },
      { co: "VanHack", role: "Lead Designer", years: "2019—23", desc: "Os dois lados de um marketplace de talentos: mais de 500 mil engenheiros e os recrutadores que os contratam." },
      { co: "Hotmart", role: "Senior Product Designer", years: "2019", desc: "O produto de analytics que todos os times usavam para acompanhar seus indicadores, construído com o time de Data Science." },
      { co: "Siteware", role: "Lead Product Designer", years: "2012—19", desc: "Primeiro designer da empresa. Responsável pelo produto principal de KPIs, metas e planos de ação." },
    ],
  },

  writing: {
    title: "Artigos",
    substack: "Substack ↗",
  },

  localTime: {
    title: "Horário local",
    here: "Maple Ridge, CA · onde moro",
    home: "Belo Horizonte, BR • onde nasci",
    globeHint: "Moro em Maple Ridge. Passe o mouse para ver de onde eu sou",
  },

  howIWork: {
    title: "Como eu trabalho",
    steps: [
      { label: "Ouvir", text: "Reunir insights de diferentes perspectivas e mergulhar fundo na definição do problema." },
      { label: "Contexto", text: "Mapear as restrições de negócio e de tecnologia para um desenvolvimento rápido e sem atritos." },
      { label: "Prototipar", text: "Criar algo clicável rápido, no Figma, em código ou com IA, para eliminar a ambiguidade antes que ela vire uma sprint." },
      { label: "Entregar", text: "Acompanhar o PR. Trabalhar com os engenheiros nos detalhes até estar no ar e sendo medido." },
    ],
  },

  prototype: {
    title: "Prototipo em",
    tools: [
      { label: "Figma", snippet: "Frame / Checkout v3\n→ 24 variantes · auto-layout" },
      { label: "Código", snippet: '<Checkout\n  step="pay" tips={true} />' },
      { label: "IA", snippet: '› "Gere 5 estados vazios para\n  um painel de comissões"' },
    ],
  },

  offTheClock: {
    title: "Acenda o fogo da minha utopia.",
    previous: "Anterior",
    next: "Próxima",
    photos: {
      walk: "Passeio em família",
      motorcycle: "Moto",
      campfire: "Fogueira",
      brothers: "Irmãos",
      family: "Família",
      nights: "Noites tranquilas",
      speaking: "Palestrando",
      drums: "Bateria",
      stage: "No palco",
    },
  },

  contact: {
    eyebrow: "Tem um problema B2B cabeludo?",
    headline: "Vamos desatar esse nó juntos.",
    copy: "Copiar",
    copied: "Copiado ✓",
    copyAria: "Copiar o e-mail {email}",
  },

  footer: {
    left: "Obrigado pela visita · © 2026 Breno Araujo",
    back: "Voltar ao topo ↑",
  },

  caseStudy: {
    nextPrefix: "Próximo: ",
    liveLabel: "Ver o fluxo ao vivo",
    credits: { role: "Função", team: "Time", madeWith: "Ferramentas", shipped: "Lançamento" },
    decision: "Decisão",
    results: "Resultados",
    to: "para",
    before: "Antes",
    after: "Depois",
    notTranslated:
      "Este estudo de caso ainda não foi traduzido. Você está lendo a versão original em inglês.",
  },
};

export default ptBr;
