import { Link } from "react-router-dom";
import LazyImage from "./LazyImages";

function ItemCard({ item }) {
  return (
    <Link to={`/product/${item.slug.current}`}>
      <div className="cursor-pointer rounded-xl shadow overflow-hidden transition transform hover:scale-105">
        <LazyImage
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-2 text-center font-medium">{item.title}</div>
      </div>
    </Link>
  );
}
export default ItemCard;