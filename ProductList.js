import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Avatar,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import EmptyComponent from "./EmptyComponent";
import Header from "./Header";
import ProductDetails from "./ProductDetails";
import { useNavigate, useParams } from "react-router-dom";

const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + " ...";
  }
  return description;
};

const ProductList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/");
        setProducts(response.data);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleItemClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header />

      <Grid container spacing={0} maxWidth="100%">
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            style={{
              position: "sticky",
              top: 0,
              maxHeight: "calc(100vh - 64px)",
              overflowY: "auto",
            }}
            elevation={3}
          >
            <List>
              {products.map((product, index) => (
                <ListItem
                  key={product.id}
                  onClick={() => handleItemClick(product.id)}
                  sx={{
                    marginBottom: index < products.length - 1 ? 2 : 0,
                    cursor: "pointer",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={product.title}
                      src={product.image}
                      variant="rounded"
                      sx={{
                        width: "1.5in",
                        height: "1.5in",
                        objectFit: "cover",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <span>
                        <span style={{ color: "purple" }}>
                          {product.category}
                        </span>
                        <br />
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          {` ${product.title}`}
                        </span>
                      </span>
                    }
                    secondary={truncateDescription(product.description, 100)}
                    sx={{ marginLeft: 2, marginTop: 1 }}
                  />
                </ListItem>
              ))}
              <Divider />
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflow: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {id ? (
              <ProductDetails productId={id} />
            ) : (
              <EmptyComponent />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductList;
