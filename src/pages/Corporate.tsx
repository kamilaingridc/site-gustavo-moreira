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
  { url: new URL('../assets/galeriaCorporativa/Corporativo5.jpeg', import.meta.url).href, alt: 'galeria5' },
  { url: new URL('../assets/galeriaCorporativa/Corporativo1.jpeg', import.meta.url).href, alt: 'galeria1' },
  // { url: new URL('../assets/galeriaCorporativa/Corporativo2.jpeg', import.meta.url).href, alt: 'galeria2' },
  // { url: new URL('../assets/galeriaCorporativa/Corporativo3.jpeg', import.meta.url).href, alt: 'galeria3' },
  { url: new URL('../assets/galeriaCorporativa/Corporativo4.jpeg', import.meta.url).href, alt: 'galeria4' },
  { url: new URL('../assets/galeriaCorporativa/Corporativo6.jpeg', import.meta.url).href, alt: 'galeria6' },
  { url: new URL('../assets/galeriaCorporativa/Corporativo7.jpeg', import.meta.url).href, alt: 'galeria7' },
  { url: new URL('../assets/galeriaCorporativa/Corporativo8.jpeg', import.meta.url).href, alt: 'galeria8' },
 
];

const corporateHeroImage = new URL('../assets/Photo Gustavo.jpg', import.meta.url).href;

const servicos = [
  'Convenções e Congressos',
  'Feiras e Exposições',
  'Lançamentos de Produtos',
  'Treinamentos e Workshops',
  'Palestras e Seminários',
  'Eventos Empresariais Internos',
  'Coquetéis e Confraternizações',
  'Premiações e Eventos de Gala',
];

function Corporate() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Header />

      <section className="page-hero" style={{
        backgroundImage: `url('${corporateHeroImage}')`
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
            <h2 className="section-title">Especialistas em eventos<br />corporativos</h2>
            <div className="divider" />
            <p className="section-desc">
              Oferecemos estrutura completa para convenções, palestras, lançamentos
              de produtos e eventos empresariais. Trabalhamos com equipamentos
              profissionais e equipe qualificada, garantindo qualidade, pontualidade
              e segurança. Pensamos o evento corporativo como uma ferramenta
              estratégica para a sua empresa.
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

export default Corporate;