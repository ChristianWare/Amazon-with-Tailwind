import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
      
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Product has been added to cart");
  };

  return (
    <div>
      <Layout title='Home Page'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {products.map((product) => (
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean(); // .lean() converts it to a javascript object
  // the above mongo DB Docs have to be converted to a javascript object:

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
