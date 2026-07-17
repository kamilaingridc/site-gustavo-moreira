/*
  HOME — Página principal

  Importa todos os componentes e os monta em ordem.
  Cada <section> tem um id="" para que os links de âncora (#sobre, etc.) funcionem.

  useState / useEffect são usados para:
  1. Animar os contadores (0 → valor final)
  2. Detectar quando a seção entra na tela (IntersectionObserver)
  3. Controlar o formulário de contato
*/
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import './Home.css';

/* Logos das empresas clientes — carregadas via glob do Vite */
const logoModules = import.meta.glob('../assets/companies/*.jpeg', { eager: true });
const companyLogos: string[] = Object.values(logoModules).map((m: unknown) => (m as { default: string }).default);

/* ──────────────────────────────────────────────────────────
   DADO: lista de serviços oferecidos
   Cada objeto tem: icon (SVG), title e description
   ────────────────────────────────────────────────────────── */
const servicos = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
      </svg>
    ),
    title: 'Painel de LED',
    desc: 'Alta definição para apresentações, marcas e espetáculos. Ideal para impacto visual máximo.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Palco e Estrutura',
    desc: 'Montagem completa com grid profissional, segurança premium e acabamento de alto nível.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 010 14.14"/><path d="M15.54 8.46a5 5 0 010 7.07"/>
      </svg>
    ),
    title: 'Sonorização Profissional',
    desc: 'Clareza e pressão sonora impecável. Equipamentos de alta fidelidade para shows, palestras e festas.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
    title: 'Iluminação Cênica',
    desc: 'Ambientação corporativa, efeitos especiais e valorização do espaço que criam atmosferas únicas.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
      </svg>
    ),
    title: 'Eventos Corporativos',
    desc: 'Convenções, lançamentos, congressos e eventos empresariais com infraestrutura completa.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: 'Eventos Sociais',
    desc: 'Casamentos, formaturas, aniversários e festas com o toque especial que o momento merece.',
  },
];

/* ──────────────────────────────────────────────────────────
   DADO: fotos da galeria (eventos/shows)
   ────────────────────────────────────────────────────────── */
const galeria = [
  { url: new URL('../assets/galeriaGeral/geral1.jpeg', import.meta.url).href, alt: 'Evento 1' },
  { url: new URL('../assets/galeriaGeral/geral2.jpeg', import.meta.url).href, alt: 'Evento 2' },
  { url: new URL('../assets/galeriaGeral/geral3.jpeg', import.meta.url).href, alt: 'Evento 3' },
  { url: new URL('../assets/galeriaGeral/geral4.jpeg', import.meta.url).href, alt: 'Evento 4' },
  { url: new URL('../assets/galeriaGeral/geral5.jpeg', import.meta.url).href, alt: 'Evento 5' },
  { url: new URL('../assets/galeriaGeral/geral6.jpeg', import.meta.url).href, alt: 'Evento 6' },
  { url: new URL('../assets/galeriaGeral/geral7.jpeg', import.meta.url).href, alt: 'Evento 7' },
  // { url: new URL('../assets/galeriaGeral/geral8.jpeg', import.meta.url).href, alt: 'Evento 8' },
  { url: new URL('../assets/galeriaGeral/geral9.jpeg', import.meta.url).href, alt: 'Evento 9' },
  { url: new URL('../assets/galeriaGeral/geral10.jpeg', import.meta.url).href, alt: 'Evento 10' },
];

/* ──────────────────────────────────────────────────────────
   HOOK: useCounter
   Anima um número de 0 até "target" em "duration" milissegundos
   Só começa quando "active" = true (quando entra na tela)
   ────────────────────────────────────────────────────────── */
function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return; // só anima quando visível

    let start = 0;
    const step = target / (duration / 16); // quantos números por frame (60fps ≈ 16ms)

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer); // limpa ao desmontar
  }, [active, target, duration]);

  return count;
}

/* ══════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL — Home
   ══════════════════════════════════════════════════════════ */
function Home() {
  const location = useLocation();

  // Controla se a seção "sobre" está visível para ativar contadores
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Estado do formulário de contato
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', mensagem: '' });
  const [enviado, setEnviado] = useState(false);

  // IntersectionObserver: detecta quando a seção entra na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 } // ativa quando 30% da seção está visível
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Se chegar na Home com hash (#sobre, #contato...), rola até a seção alvo.
  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 96;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [location.hash]);

  // Valores dos contadores
  const eventos      = useCounter(1500, 2000, statsVisible);
  const equipamentos = useCounter(1000, 2000, statsVisible);
  const servicos_n   = useCounter(10,   2000, statsVisible);

  // Atualiza o estado do formulário ao digitar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ao enviar o formulário, abre o WhatsApp com mensagem pronta
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // evita recarregar a página

    const linhas = [
      'Olá! Vim pelo site e gostaria de um orçamento.',
      '',
      `Nome: ${form.nome}`,
      `E-mail: ${form.email}`,
      `Telefone: ${form.telefone || 'Não informado'}`,
      '',
      'Mensagem:',
      form.mensagem,
    ];

    const mensagem = encodeURIComponent(linhas.join('\n'));
    const whatsappUrl = `https://wa.me/5519992359630?text=${mensagem}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setForm({ nome: '', email: '', telefone: '', mensagem: '' });
    setEnviado(true);
  };

  return (
    <>
      {/* Header fixo no topo */}
      <Header />

      {/* ── HERO ── */}
      <Hero />

      {/* ════════════════════════════════════════
          SEÇÃO SOBRE — id="sobre"
          ════════════════════════════════════════ */}
      <section id="sobre" className="section sobre">
        <div className="container sobre__grid">


          {/* Coluna dos contadores */}
          <div className="sobre__stats" ref={statsRef}>
            <div className="stat-card">
              <span className="stat-numero">+{eventos}</span>
              <span className="stat-label">Eventos</span>
            </div>
            <div className="stat-card">
              <span className="stat-numero">+{equipamentos}</span>
              <span className="stat-label">Equipamentos</span>
            </div>
            <div className="stat-card">
              <span className="stat-numero">+{servicos_n}</span>
              <span className="stat-label">Anos de experiência</span>
            </div>
          </div>

          {/* Coluna de texto */}
          <div className="sobre__texto">
            <span className="section-tag">Sobre nós</span>
            <h2 className="section-title">Mais de 10 anos<br />transformando eventos</h2>
            <div className="divider" />
            <p className="section-desc">
              Com mais de 10 anos de experiência e mais de 1.500 eventos realizados,
              somos especialistas em sonorização, iluminação e produção técnica para
              eventos corporativos, sociais e shows com bandas. Nosso compromisso é
              transformar cada evento em uma experiência marcante, com excelência
              técnica, impacto visual e organização profissional.
            </p>
            <a href="#servicos" className="btn-primary" style={{ marginTop: '32px' }}>
              Conheça nossos serviços
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SEÇÃO SERVIÇOS — id="servicos"
          ════════════════════════════════════════ */}
      <section id="servicos" className="section servicos" style={{ backgroundColor: 'var(--cor-fundo-alt)' }}>
        <div className="container">

          <div className="section-header">
            <span className="section-tag">O que fazemos</span>
            <h2 className="section-title">O que oferecemos<br />aos nossos clientes</h2>
            <div className="divider" />
          </div>

          {/* Grade de cards de serviços */}
          <div className="servicos__grid">
            {servicos.map((s, i) => (
              <div key={i} className="servico-card">
                <div className="servico-card__icon">{s.icon}</div>
                <h3 className="servico-card__title">{s.title}</h3>
                <p className="servico-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Botões para as páginas específicas */}
          <div className="servicos__ctas">
            <Link to="/social" className="btn-outline">Eventos Sociais</Link>
            <Link to="/corporativo" className="btn-outline">Eventos Corporativos</Link>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          SEÇÃO GALERIA — id="galeria"
          ════════════════════════════════════════ */}
      <section id="galeria" className="section galeria">
        <div className="container">

          <div className="section-header">
            <span className="section-tag">Portfólio</span>
            <h2 className="section-title">Transformamos eventos<br />em experiências inesquecíveis</h2>
            <div className="divider" />
          </div>

          {/* Grade de 3 colunas com fotos */}
          <div className="galeria__grid">
            {galeria.map((foto, i) => (
              <div key={i} className="galeria__item">
                <img src={foto.url} alt={foto.alt} loading="lazy" />
                <div className="galeria__overlay"></div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          SEÇÃO EMPRESA — banner com fundo escuro
          ════════════════════════════════════════ */}
      <section className="empresa-banner">
        <div className="empresa-banner__overlay" />
        <div className="container empresa-banner__content">
          <span className="section-tag">Nossa empresa</span>
          <h2 className="section-title">Mais que uma empresa<br />de eventos</h2>
          <div className="divider" />
          <p className="section-desc">
            Gustavo Moreira Produção e Eventos conta com a melhor estrutura, sempre
            zelando pela sua segurança e lazer. Entre em contato e veja como fazemos
            a diferença.
          </p>
          <a href="#contato" className="btn-primary" style={{ marginTop: '32px' }}>
            Fale conosco
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SEÇÃO CONTATO — id="contato"
          ════════════════════════════════════════ */}
      <section id="contato" className="section contato" style={{ backgroundColor: 'var(--cor-fundo-alt)' }}>
        <div className="container contato__grid">

          {/* Coluna de texto + WhatsApp */}
          <div className="contato__info">
            <span className="section-tag">Contato</span>
            <h2 className="section-title">Está pronto para<br />transformar seu evento?</h2>
            <div className="divider" />
            <p className="section-desc">Entre em contato! Será um prazer atender você.</p>

            {/* Botão WhatsApp grande */}
            <a
              href={`https://wa.me/5519992359630?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contato__whatsapp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chamar no WhatsApp
            </a>
          </div>

          {/* Coluna do formulário */}
          <div className="contato__form-wrap">
            {enviado ? (
              // Mensagem de sucesso após envio
              <div className="contato__sucesso">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--cor-ouro)" strokeWidth="2" width="48" height="48">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <h3>Mensagem enviada!</h3>
                <p>Em breve entraremos em contato.</p>
                <button className="btn-outline" onClick={() => setEnviado(false)}>Enviar outra</button>
              </div>
            ) : (
              <form className="contato__form" onSubmit={handleSubmit}>
                <h3 className="contato__form-titulo">Envie-nos uma mensagem</h3>

                {/* Campo Nome */}
                <div className="form-group">
                  <label htmlFor="nome">Nome completo</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Campo E-mail */}
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Campo Telefone */}
                <div className="form-group">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    placeholder="(00) 90000-0000"
                    value={form.telefone}
                    onChange={handleChange}
                  />
                </div>

                {/* Campo Mensagem */}
                <div className="form-group">
                  <label htmlFor="mensagem">Mensagem</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    placeholder="Conte-nos sobre seu evento..."
                    value={form.mensagem}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Enviar mensagem
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          SEÇÃO CLIENTES — logos rolando antes do footer
          ════════════════════════════════════════ */}
      <section className="section clientes" style={{ backgroundColor: 'var(--cor-fundo-alt)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Quem confiou em nós</span>
            <h2 className="section-title">Empresas que já contrataram<br />nossos serviços</h2>
            <div className="divider" />
          </div>
        </div>
        <div className="clientes__track-wrap">
          <div className="clientes__track">
            {/* duplicamos para criar o loop infinito seamless */}
            {[...companyLogos, ...companyLogos].map((logo, i) => (
              <div key={i} className="clientes__logo">
                <img src={logo} alt={`Empresa parceira ${(i % companyLogos.length) + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* ── Botão flutuante do WhatsApp (canto inferior direito) ── */}
      <a
        href="https://wa.me/5519992359630"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </>
  );
}

export default Home;
