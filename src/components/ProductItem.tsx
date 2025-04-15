import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "../types/Product";

interface ProductproductProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function Productproduct({ product, onAddToCart }: ProductproductProps) {
  return (
    <Grid>
      <Card sx={{ width: 266, height: 365, bgcolor: "#333", color: "white" }}>
        <CardMedia
          component="img"
          height="240"
          width="251"
          image={product.image.thumbnail}
          alt="Placeholder Image"
        />

        <CardContent>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FDFDFC",
              color: "#766F6D",
              width: "159px",
              "&:hover": {
                backgroundColor: "#BC7863",
              },
              borderRadius: "19px",
            }}
            startIcon={<ShoppingCartIcon />}
            onClick={() => onAddToCart(product)}
          >
            <Typography sx={{ fontSize: "13.5px" }}>Add to Cart</Typography>
          </Button>
          <Typography variant="h6" sx={{ fontSize: "12px", color: "#A49995" }}>
            {product.category}
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#6F6461" }}>
            {product.name}
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "#BC7863" }}>
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Productproduct;
