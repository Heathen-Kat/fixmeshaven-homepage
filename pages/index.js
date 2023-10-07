import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import {Product} from "@/models/product";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/Footer";


export default function HomePage({featuredProduct,newProducts}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
      <Footer />      
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductID = '646d856a7f15d9956d98c1db';
  await mongooseConnect ();
  const featuredProduct = await Product.findById(featuredProductID);
  const newProducts= await Product.find({}, null,{sort: {'_id':-1}, limit:9});
 return {
  props: {featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
  newProducts: JSON.parse(JSON.stringify(newProducts)),
  },
 };
}