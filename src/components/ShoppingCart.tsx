import { CartItem } from "../types/Product";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface ShoppingCartProps {
  cartItems: CartItem[];
  onIncreaseQuantity: (id: number) => void;
  onDecreaseQuantity: (id: number) => void;
  onConfirmOrder: () => void;
}

function ShoppingCart({
  cartItems,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onConfirmOrder,
}: ShoppingCartProps) {
  function calculateOrderTotal(): number {
    return cartItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  return (
    <Box>
      <Card
        sx={{
          width: 395,
          // height: "auto",
          bgcolor: "#FFFFFF",
          color: "#C56B4F",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Your Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            )
          </Typography>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box>
                  <Typography>
                    {item.quantity} x {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${(item.quantity * item.price).toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="small"
                    onClick={() => onDecreaseQuantity(item.id)}
                  >
                    <RemoveIcon sx={{}} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onIncreaseQuantity(item.id)}
                  >
                    <AddIcon sx={{}} />
                  </IconButton>
                </Box>
              </Box>
            ))
          ) : (
            <p>Please select your desserts.</p>
          )}
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
            Order Total: ${calculateOrderTotal().toFixed(2)}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1 }}
          >
            This is a carbon-neutral delivery
          </Typography>
          <Button
            sx={{
              width: "336px",
              height: "53px",
              color: "#FFFFFF",
              backgroundColor: "#C73B0E",
              borderRadius: "23px",
              mt: "23px",

              "&.Mui-disabled": {
                backgroundColor: "lightgray",
              },
            }}
            onClick={onConfirmOrder}
            disabled={cartItems.length == 0}
          >
            <Typography sx={{ fontSize: "14.5px", color: "#E7AB91" }}>
              Confirm Order
            </Typography>
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ShoppingCart;
