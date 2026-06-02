/*
  PÁGINA EVENTOS SOCIAIS

  Tem seu próprio Header e Footer.
  O hero desta página é menor (não fullscreen).
  useEffect(() => { window.scrollTo(0,0) }) → rola para o topo
  ao navegar para esta página (comportamento padrão de navegação).
*/
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './EventPage.css';

const fotos = [
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=75', alt: 'Casamento' },
  { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=75', alt: 'Festa' },
  { url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=75', alt: 'Formatura' },
  { url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=75', alt: 'Celebração' },
  { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=75', alt: 'Show' },
  { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=75', alt: 'Evento social' },
];

const servicos = [
  'Casamentos',
  'Formaturas',
  'Aniversários',
  'Bailes de Debutante',
  'Festas Infantis',
  'Confraternizações',
];

function Social() {
  // Ao entrar na página, rola para o topo
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Header />

      {/* Hero interno da página */}
      <section className="page-hero" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80')"
      }}>
        <div className="page-hero__overlay" />
        <div className="container page-hero__content">
          {/* Breadcrumb: Home > Eventos Sociais */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Eventos Sociais</span>
          </nav>
          <span className="section-tag">Portfólio</span>
          <h1 className="page-hero__title">Eventos Sociais</h1>
        </div>
      </section>

      {/* Seção de descrição */}
      <section className="section">
        <div className="container event-layout">

          <div className="event-text">
            <span className="section-tag">O que fazemos</span>
            <h2 className="section-title">Momentos que ficam<br />para sempre</h2>
            <div className="divider" />
            <p className="section-desc">
              Cada evento social é único. Desde o planejamento até a execução,
              cuidamos de cada detalhe para que você e seus convidados vivam
              momentos inesquecíveis. Iluminação, som, palco e estrutura completa.
            </p>
          </div>

          {/* Lista de tipos de evento */}
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

      {/* Galeria de fotos */}
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

export default Social;