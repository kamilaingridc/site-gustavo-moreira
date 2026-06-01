import { Link } from "react-router-dom";

interface Props {
  title: string;
  image: string;
  route: string;
}

function CategoryCard({ title, image, route }: Props) {
  return (
    <Link to={route} className="card">

      <img src={image} alt={title} />

      <div className="overlay">
        <h2>{title}</h2>
      </div>

    </Link>
  );
}

export default CategoryCard;