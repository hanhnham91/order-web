import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CartItem } from "../types/Product";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";

interface ConfirmDialogProps {
  open: boolean;
  cartItems: CartItem[];
  handleStartNewOrder: () => void;
}

function ConfirmDialog({
  open,
  cartItems,
  handleStartNewOrder,
}: ConfirmDialogProps) {
  function calculateOrderTotal(): number {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{ bgcolor: "#1e1e1e", color: "white", py: 2, textAlign: "center" }}
      >
        <Typography variant="h6" sx={{ color: "#ff6d00" }}>
          Order Confirmed
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#1e1e1e", color: "white", p: 3 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          We hope you enjoy your food!
        </Typography>

        {cartItems.length > 0 ? (
          <List sx={{ width: "100%", mt: 2 }}>
            {cartItems.map((item) => (
              <ListItem>
                <Grid container sx={{ width: "100%" }}>
                  <Grid size={{ xs: 6, md: 8 }}>
                    <ListItemText
                      primary={item.name}
                      secondary={item.quantity + "x $" + item.price.toFixed(2)}
                      slotProps={{
                        primary: {
                          color: "#716764",
                          fontWeight: "600",
                          fontSize: "11.6px",
                        },
                        secondary: {
                          color: "#C9BFBC",
                          fontWeight: "600",
                          fontSize: "11.2px",
                        },
                      }}
                    />
                  </Grid>

                  <Grid sx={{ xs: 6, md: 4, textAlign: "right" }}>
                    <Typography
                      sx={{
                        fontSize: "14.6px",
                        color: "#635957",
                      }}
                    >
                      ${(item.quantity * item.price).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No items in your order.</Typography>
        )}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "#8F8784",
              fontSize: "12.8px",
            }}
          >
            Order Total
          </Typography>
          <Typography
            sx={{
              color: "#493935",
              fontSize: "22.6px",
            }}
          >
            ${calculateOrderTotal().toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ bgcolor: "#1e1e1e", p: 3, justifyContent: "center" }}
      >
        <Button
          sx={{
            width: "336px",
            height: "53px",
            color: "#FFFFFF",
            backgroundColor: "#C73B0E",
            borderRadius: "23px",
            mt: "23px",
          }}
          onClick={handleStartNewOrder}
        >
          Start New Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
