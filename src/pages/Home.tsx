import CategoryCard from "../components/CategoryCard";

function Home() {
  return (
    <main>

      <section className="hero">

        <h1>Gama Eventos</h1>

        <div className="categories">

          <CategoryCard
            title="Eventos Sociais"
            image="imagem1.jpg"
            route="/social"
          />

          <CategoryCard
            title="Eventos Corporativos"
            image="imagem2.jpg"
            route="/corporativo"
          />

        </div>

      </section>

    </main>
  );
}

export default Home;