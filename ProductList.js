import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
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
import Header from "./Header"; // Import the Header component

// Function to truncate the description
const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + " ...";
  }
  return description;
};

const ProductList = () => {
  const fetchProducts = async () => {
    const response = await axios.get("https://fakestoreapi.com/products/");
    return response.data;
  };

  const { isLoading, error, data } = useQuery("products", fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  return (
    <>
      {/* Move the Header component outside of the Grid */}
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
              {data.map((product, index) => (
                <ListItem
                  key={product.id}
                  component="a"
                  href={`/products/${product.id}`}
                  sx={{
                    marginBottom: index < data.length - 1 ? 2 : 0,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={product.title}
                      src={product.image}
                      variant="rounded"
                      sx={{
                        width: '1.5in',
                        height: '1.5in',
                        objectFit: 'cover',
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <span>
                        <span style={{ color: 'purple' }}>
                          {product.category}
                        </span><br></br>
                        <span style={{ color: 'black', fontWeight: 'bold' }}>
                          {` ${product.title}`}
                        </span>
                      </span>
                    }
                    secondary={truncateDescription(product.description, 100)}
                    sx={{ marginLeft: 2, marginTop: 1 }} // Adjust the margins as needed
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
            <EmptyComponent />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductList;
