import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { List, ListItem, ListItemText, Divider } from "@mui/material";

const fetchProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products/");
  return response.data;
};

function ProductList() {
  const { isLoading, error, data } = useQuery(
    "products",
    fetchProducts
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  return (
    <List>
      {data.map((product) => (
        <ListItem
          key={product.id}
          component="a"
          href={`/products/${product.id}`}
        >
          <ListItemText
            primary={product.title}
            secondary={product.description}
          />
        </ListItem>
      ))}
      <Divider />
    </List>
  );
}

export default ProductList;
