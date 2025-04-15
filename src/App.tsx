import ShoppingCart from "./components/ShoppingCart";
import ProductList from "./components/ProductList";
import { useState } from "react";
import { CartItem, Product } from "./types/Product";
import { Order, OrderItem } from "./types/Order";
import { Box } from "@mui/material";
import config from "./app/config";
import ConfirmDialog from "./components/ConfirmDialog";

function App() {
  const [openConfirmDiaglog, setOpenConfirmDiaglog] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("shoppingCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((cartItem) =>
        cartItem.id === product.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (id: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (id: number) => {
    let updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
        : item
    );

    if (updatedCart.some((item) => item.id === id && item.quantity === 0)) {
      updatedCart = updatedCart.filter((item) => item.id !== id);
    }

    setCartItems(updatedCart);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
  };

  const handleConfirmOrder = async () => {
    try {
      const response = await fetch(config.apiURL + "/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })) as OrderItem[],
        } as Order),
      });

      if (response.ok) {
        setOpenConfirmDiaglog(true);
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      alert(
        "Error occurred while placing order." +
          (error instanceof Error ? error.message : "")
      );
    }
  };

  const handleStartNewOrder = () => {
    setCartItems([]);
    localStorage.removeItem("shoppingCart");
    setOpenConfirmDiaglog(false);
  };

  return (
    <Box
      sx={{
        maxWidth: "1440px",
        display: "flex",
        direction: "row",
        backgroundColor: "#00000000",
        pt: 10,
        pl: 20,
        pb: 10,
      }}
    >
      <ProductList cartItems={cartItems} onAddToCart={handleAddToCart} />
      <ShoppingCart
        cartItems={cartItems}
        onDecreaseQuantity={handleDecreaseQuantity}
        onIncreaseQuantity={handleIncreaseQuantity}
        onConfirmOrder={handleConfirmOrder}
      />

      <ConfirmDialog
        open={openConfirmDiaglog}
        cartItems={cartItems}
        handleStartNewOrder={handleStartNewOrder}
      />
    </Box>
  );
}

export default App;
