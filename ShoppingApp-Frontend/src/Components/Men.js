import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions/productActions";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";

const ProductImage = styled.img`
  width: 300px;
  height: 400px;
  object-fit: contain;
  margin-bottom: 15px;
  cursor: pointer; /* Add cursor pointer for better UX */
`;

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  width: calc(20% - 20px); /* 20% width with 20px margin */
`;

const ProductItemContent = styled.div`
  text-align: left;
  margin-left: 60px;
  padding: 10px;
`;

const RatingText = styled.span`
  margin-right: 250px;
  text-align: left;
`;

const StarIcon = styled.span`
  color: gold;
`;

const Container = styled.div`
  padding-top: 50px; /* Adjusted padding top */
  display: flex;
  justify-content: space-between;
  margin-left: 100px;
`;

const Container1 = styled.div`
  padding-top: 50px; /* Adjusted padding top */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FilterContainer = styled.div`
  margin-right: 20px;
`;

const SortByContainer = styled.div`
  margin-left: 1900px; /* Aligns to the right side */
  margin-top: 30px;
`;

const FilterTitle = styled.h3`
  margin-bottom: 10px;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const ColorCheckbox = styled.input`
  display: none;

  &:checked + span {
    background-color: ${(props) => props.color};
    border: 1px solid #000;
  }
`;

const ColorIndicator = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-right: 5px;
`;

const Text = styled.div`
  margin-bottom: 1px;
`;

const ProductName = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductDescription = styled(Text)`
  font-size: 18px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 5px;
`;

const ProductPrice = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

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
    // Apply brand filter
    if (
      selectedBrands.length > 0 &&
      !selectedBrands.includes(product.product_brand_name)
    ) {
      return false;
    }
    // Apply color filter
    if (
      selectedColors.length > 0 &&
      !selectedColors.includes(product.product_color)
    ) {
      return false;
    }
    // Apply price range filter
    const price = product.product_price;
    return price >= priceRange.min && price <= priceRange.max;
  });

  // Apply sorting
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
