
import Card from "@/app/components/Card/Card";
import CardList from "./components/CardList/CardList";
import Hero from "./components/Hero/Hero";
import { getFeaturedProducts } from "./services/products";



const page = async () => {

   const products = await getFeaturedProducts();
       
    return (
        <>
           <Hero />
            <CardList>
            {products.map((product, i) => (
                <Card key={i} {...product} variant="secondary" />
            ))}
            </CardList>
        </>
    );
};

export default page;