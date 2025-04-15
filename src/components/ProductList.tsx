import ProductItem from "./ProductItem";
import { Product } from "../types/Product";
import { useQuery } from "@tanstack/react-query";
import { Box, Grid, Typography } from "@mui/material";
import config from "../app/config";

interface ProductListProps {
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  const fetchProducts = async () => {
    const response = await fetch(config.apiURL + "/product");

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json() as Promise<Product[]>;
  };
  const { data: products, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    // <div className="product-list">
    //   <h2>Desserts</h2>
    //   <div className="products-grid">
    //     {products?.map((item) => (
    //       <ProductItem key={item.id} product={item} onAddToCart={onAddToCart} />
    //     ))}
    //   </div>
    // </div>

    <Box sx={{width: "80%", mr: 2}}>
      <Typography variant="h4" gutterBottom color="#3F2D28">
        Desserts
      </Typography>
      <Grid container spacing={2}>
        {products?.map((item) => (
          <ProductItem
            key={item.id}
            product={item}
            onAddToCart={onAddToCart}
          ></ProductItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
