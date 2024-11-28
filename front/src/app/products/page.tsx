import CardList from "../components/CardList/CardList";
import Card from "../components/Card/Card";
import { getProducts } from "../services/products";

const page = async () => {
  const products = await getProducts();
  
  return (
    <>
      <CardList>
        {products.map((product) => (
          <Card key={product.id} {...product} variant="secondary" /> 
        ))}
      </CardList>
    </>
  );
};

export default page;
