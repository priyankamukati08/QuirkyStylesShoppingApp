import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions/productActions";
import NavigationBar from "./NavigationBar";

import {
  ProductImage,
  ProductItemContainer,
  ProductItemContent,
  RatingText,
  StarIcon,
  Container,
  Container1,
  FilterContainer,
  SortByContainer,
  FilterTitle,
  CheckboxLabel,
  ColorCheckbox,
  ColorIndicator, 
  ProductName,
  ProductDescription,
  ProductPrice,
} from "./ProductDesign";

const truncateDescription = (description, maxLength) => {
  if (description.length <= maxLength) {
    return description;
  } else {
    return description.slice(0, maxLength).trim() + "...";
  }
};

const ProductsGrid = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleBrandCheckboxChange = (brand, isChecked) => {
    if (isChecked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(
        selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      );
    }
  };

  const handleColorCheckboxChange = (color, isChecked) => {
    if (isChecked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(
        selectedColors.filter((selectedColor) => selectedColor !== color)
      );
    }
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange({ ...priceRange, [e.target.name]: e.target.value });
  };

  const handleProductClick = (brandName, productId) => {
    window.location.href = `http://localhost:3000/Mens/${brandName}/${productId}`;
  };

  const filteredProducts = products.filter((product) => {
    // Filter by product category (menCategory)
    if (product.product_category !== "menCategory") {
      return false;
    }

    // Apply other filters
    if (
      selectedBrands.length > 0 &&
      !selectedBrands.includes(product.product_brand_name)
    ) {
      return false;
    }

    if (
      selectedColors.length > 0 &&
      !selectedColors.includes(product.product_color)
    ) {
      return false;
    }

    const price = product.product_price;
    return price >= priceRange.min && price <= priceRange.max;
  });

  filteredProducts.sort((a, b) => {
    if (sortBy === "customerRating") {
      return b.product_rating - a.product_rating;
    } else if (sortBy === "priceLowToHigh") {
      return a.product_price - b.product_price;
    } else if (sortBy === "priceHighToLow") {
      return b.product_price - a.product_price;
    } else {
      return 0;
    }
  });

  const baseURL = "http://localhost:3001";

  return (
    <>
      <NavigationBar />
      <Container1>
        <SortByContainer>
          <FilterTitle>Sort By</FilterTitle>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="customerRating">Customer Rating</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </SortByContainer>
      </Container1>
      <Container>
        <FilterContainer>
          <FilterTitle>Filters</FilterTitle>
          <FilterTitle>Brand</FilterTitle>
          {["Nike", "Adidas", "Puma", "Reebok"].map((brand) => (
            <CheckboxLabel key={brand}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={(e) =>
                  handleBrandCheckboxChange(brand, e.target.checked)
                }
              />
              {brand}
            </CheckboxLabel>
          ))}
          <FilterTitle>Color</FilterTitle>
          {["Red", "Blue", "Green", "Yellow"].map((color) => (
            <CheckboxLabel key={color}>
              <ColorCheckbox
                type="checkbox"
                color={color}
                checked={selectedColors.includes(color)}
                onChange={(e) =>
                  handleColorCheckboxChange(color, e.target.checked)
                }
              />
              <ColorIndicator color={color} />
              {color}
            </CheckboxLabel>
          ))}
          <FilterTitle>Price Range</FilterTitle>
          <input
            type="number"
            name="min"
            value={priceRange.min}
            onChange={handlePriceRangeChange}
            placeholder="Min"
          />
          <input
            type="number"
            name="max"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
            placeholder="Max"
          />
        </FilterContainer>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {filteredProducts.map((product, index) => (
            <ProductItemContainer
              key={product.id}
              className="product-item"
              style={{ marginRight: index % 5 === 4 ? 0 : "20px" }}
              onClick={() =>
                handleProductClick(
                  product.product_brand_name.toLowerCase(),
                  product.id
                )
              }
            >
              <ProductImage
                src={`${baseURL}${product.product_image_url}`}
                alt={product.product_brand_name}
              />
              <ProductItemContent>
                <ProductName>{product.product_brand_name}</ProductName>
                <ProductDescription>
                  {truncateDescription(product.product_description, 40)}
                </ProductDescription>
                <ProductPrice>${product.product_price}</ProductPrice>

                <RatingText>
                  {product.product_rating}
                  <StarIcon>&#9733;</StarIcon>
                </RatingText>
              </ProductItemContent>
            </ProductItemContainer>
          ))}
        </div>
      </Container>
    </>
  );
};

export default ProductsGrid;
