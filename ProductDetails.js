import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from '@emotion/styled';
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Rating,
} from "@mui/material";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Card>
      <CardMedia
        component="img"
        style={{
          aspectRatio: "1.88",
          objectFit: "contain",
          objectPosition: "center",
          width: "100%",
          alignSelf: "stretch",
          overflow: "hidden",
          maxWidth: "864px"
        }}

        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <br />
        <Typography variant="body1">Price: ${product.price}</Typography>
        <Typography variant="body1">Category: {product.category}</Typography>
        <Rating name="rating" value={product.rating} />
      </CardContent>
    </Card>
  );
}

export default ProductDetails;
