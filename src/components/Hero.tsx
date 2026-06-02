/*
  HERO — Seção de abertura fullscreen

  O background-image usa uma foto de eventos.
  A div "overlay" fica por cima com fundo semi-transparente
  para garantir contraste entre a foto e o texto branco.
*/
import './Hero.css';

function Hero() {
  return (
    <section className="hero">

      {/* Camada escura sobre a imagem de fundo */}
      <div className="hero__overlay" />

      <div className="hero__content container">

        {/* Tag pequena acima do título */}
        <span className="hero__tag">Produção & Eventos</span>

        {/* Título principal — frase de impacto */}
        <h1 className="hero__title">
          Cuidamos dos detalhes<br />
          <span>pra você celebrar</span><br />
          o sucesso
        </h1>

        {/* Descrição curta */}
        <p className="hero__desc">
          Montagem de palco, iluminação, sonorização e muito mais.<br />
          Toda estrutura e responsabilidade com Gustavo Moreira.
        </p>

        {/* Dois botões de ação */}
        <div className="hero__actions">
          <a href="#contato" className="btn-primary">
            Solicitar Orçamento
          </a>
          <a href="#servicos" className="btn-outline">
            Nossos Serviços
          </a>
        </div>

      </div>

      {/* Seta animada que indica para rolar a página */}
      <a href="#sobre" className="hero__scroll" aria-label="Rolar para baixo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>

    </section>
  );
}

export default Hero;
