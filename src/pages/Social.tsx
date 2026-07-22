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
  { url: new URL('../assets/galeriaSocial/social1.jpeg', import.meta.url).href, alt: 'galeria1' },
  { url: new URL('../assets/galeriaSocial/social2.jpeg', import.meta.url).href, alt: 'galeria2' },
  { url: new URL('../assets/galeriaSocial/social3.jpeg', import.meta.url).href, alt: 'galeria3' },
  { url: new URL('../assets/galeriaSocial/social4.jpeg', import.meta.url).href, alt: 'galeria4' },
  { url: new URL('../assets/galeriaSocial/social5.jpeg', import.meta.url).href, alt: 'galeria5' },
  { url: new URL('../assets/galeriaSocial/social6.jpeg', import.meta.url).href, alt: 'galeria6' },
  // { url: new URL('../assets/galeriaSocial/social7.jpeg', import.meta.url).href, alt: 'galeria7' },
  { url: new URL('../assets/galeriaSocial/social8.jpeg', import.meta.url).href, alt: 'galeria8' },
  { url: new URL('../assets/galeriaSocial/social9.jpeg', import.meta.url).href, alt: 'galeria9' },
  { url: new URL('../assets/galeriaSocial/social10.jpeg', import.meta.url).href, alt: 'galeria10' },
  { url: new URL('../assets/galeriaSocial/social b.jpeg', import.meta.url).href, alt: 'galeria11' },
];

const socialHeroImage = new URL('../assets/socialG1.jpeg', import.meta.url).href;

const servicos = [
  'Casamentos',
  'Formaturas',
  'Aniversários',
  'Bailes de Debutante',
  'Festas Infantis',
  'Confraternizações',
  'Shows com Bandas',
  'Festas e Baladas',
];

function Social() {
  // Ao entrar na página, rola para o topo
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Header />

      {/* Hero interno da página */}
      <section className="page-hero" style={{
        backgroundImage: `url('${socialHeroImage}')`
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
              Somos especialistas em eventos sociais e shows com bandas. Nosso objetivo
              é transformar cada evento em um verdadeiro espetáculo visual e sonoro.
              Desde o planejamento até a execução, cuidamos de cada detalhe —
              iluminação, som, painel de LED, palco e estrutura completa.
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
                <div className="galeria__overlay"></div>
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