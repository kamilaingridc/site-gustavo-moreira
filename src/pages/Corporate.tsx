/*
  PÁGINA EVENTOS CORPORATIVOS
  Mesma estrutura da Social, mas com conteúdo corporativo.
*/
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './EventPage.css';

const fotos = [
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=75', alt: 'Congresso' },
  { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=75', alt: 'Palestra' },
  { url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=75', alt: 'Evento corporativo' },
  { url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=75', alt: 'Lançamento' },
  { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=75', alt: 'Festa corporativa' },
  { url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=75', alt: 'Show corporativo' },
];

const servicos = [
  'Congressos e Convenções',
  'Lançamentos de Produtos',
  'Seminários e Palestras',
  'Team Building',
  'Festas de Confraternização',
  'Feiras e Exposições',
];

function Corporate() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Header />

      <section className="page-hero" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80')"
      }}>
        <div className="page-hero__overlay" />
        <div className="container page-hero__content">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Eventos Corporativos</span>
          </nav>
          <span className="section-tag">Portfólio</span>
          <h1 className="page-hero__title">Eventos Corporativos</h1>
        </div>
      </section>

      <section className="section">
        <div className="container event-layout">

          <div className="event-text">
            <span className="section-tag">O que fazemos</span>
            <h2 className="section-title">Transformamos eventos<br />em resultados</h2>
            <div className="divider" />
            <p className="section-desc">
              Pensamos o evento corporativo como uma ferramenta estratégica para sua empresa.
              Infraestrutura completa, equipe técnica especializada e toda a logística
              para que seu evento transmita profissionalismo e impacto.
            </p>
          </div>

          <div className="event-list">
            <h3 className="event-list__titulo">Atendemos</h3>
            <ul>
              {servicos.map((s, i) => (
                <li key={i}>
                  <span className="event-list__icon">◆</span>
                  {s}
                </li>
              ))}
            </ul>
            <a href="/#contato" className="btn-primary" style={{ marginTop: '28px' }}>
              Solicitar orçamento
            </a>
          </div>

        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Galeria</span>
            <h2 className="section-title">Nossos trabalhos</h2>
            <div className="divider" style={{ margin: '20px auto' }} />
          </div>
          <div className="event-galeria">
            {fotos.map((f, i) => (
              <div key={i} className="event-galeria__item">
                <img src={f.url} alt={f.alt} loading="lazy" />
                <div className="galeria__overlay">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="32" height="32">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Corporate;