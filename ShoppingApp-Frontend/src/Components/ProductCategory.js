import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions/productActions";
import NavigationBar from "./NavigationBar";
import { getSearchProducts } from "../store/actions/searchProductActions";
import FooterContainer from "./Footer";

import {
  ProductImage,
  ProductItemContainer,
  ProductItemContent,
  RatingText,
  StarIcon,
  Container,
  LeftSection,
  RightSection,
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

const MenBrands = [
  "Nike",
  "Adidas",
  "Puma",
  "Reebok",
  "Calvin Klein",
  "Tommy Hilfiger",
  "Ralph Lauren",
  "Gap",
  "Zara",
  "Levi Strauss & Co.",
  "Uniqlo",
  "Marc Jacobs",
  "Armani",
  "Gucci",
  "Polo Ralph Lauren",
  "Louis Vuitton",
  "Timberland",
  "Clarks",
  "Converse",
  "Ray-Ban",
  "Oakley",
  "Other",
];

const WomenBrands = [
  "H&M",
  "BIBA",
  "Kalini",
  "Levi Strauss & Co.",
  "Zara",
  "Ralph Lauren",
  "Steve Madden",
  "ALDO",
  "Michael Kors",
  "Gucci",
  "Jimmy Choo",
  "Pandora",
  "Tanishq",
  "Tiffany & Co.",
  "Cartier",
  "Swarovski",
  "Ray-Ban",
  "Prada",
  "Versace",
  "Dolce & Gabbana",
  "Rolex",
  "Fossil",
  "Other",
];

const KidsBrands = [
  "TinyTots",
  "KiddieKraft",
  "PlayfulPals",
  "TinyTrendsetters",
  "KiddoChic",
  "LittleAngels",
  "TinyTrends",
  "CuteCouture",
  "KiddieChic",
  "LittleSteps",
  "TinyToes",
  "MiniGlam",
  "CuteKicks",
  "SnuggleBuddies",
  "BunnyBuddies",
  "GiraffeGalore",
  "BuildingBlocks",
  "UnicornMagic",
  "Other",
];

const HomeandLivingBrands = [
  "ArtisanAccents",
  "LuxuryLamps",
  "CozyThrows",
  "ChicCushions",
  "IlluminateInteriors",
  "UrbanGlow",
  "VintageVibes",
  "CoastalChic",
  "MinimalistModern",
  "RusticElegance",
  "DreamyComfort",
  "PlushHaven",
  "SerenityStyle",
  "TranquilNest",
  "CosyDreams",
  "WarmWood",
  "CosyCarpets",
  "SleekStone",
  "RoyalTiles",
  "CoastalCharm",
  "FloralFinesse",
  "Other",
];

const BeautyBrands = [
  "Versace",
  "Dior",
  "Chanel",
  "Frederic Malle",
  "Necessarie",
  "Olaplex",
  "THE Hair SHOP",
  "Laaor",
  "Garnier",
  "Sukin",
  "NARS",
  "Maybelline",
  "Revlon",
  "NYX",
  "Lumene",
  "Charlotte Tilbury",
  "OPI",
  "Essie",
  "Curology",
  "Completely Bare",
  "CLINIQUE",
  "Coppertone",
  "CeraVe",
  "Eucerin",
  "Other",
];

const Colors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Black",
  "White",
  "Gray",
  "Purple",
  "Orange",
  "Pink",
  "Brown",
  "Other",
];

const categoryBrandsMap = {
  Men: MenBrands,
  Women: WomenBrands,
  Kids: KidsBrands,
  HomeAndLiving: HomeandLivingBrands,
  Beauty: BeautyBrands,
};

const ProductsGrid = (props) => {
  //console.log("category : ", props.category);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const searchproducts = useSelector(
    (state) => state.searchProduct.searchproducts
  );
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { category } = props;
  const Brands = categoryBrandsMap[category];

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(searchproducts.products);
    console.log("searchproducts:", searchproducts);
  }, [searchproducts]);

  const searchButtonClicked = useCallback(
    (searchQuery) => {
      if (searchQuery.trim() !== "") {
        dispatch(getSearchProducts(searchQuery));
      } else {
        dispatch(getProducts());
      }
    },
    [dispatch]
  );

  const uiDBCategoryMapping = new Map([
    ["Men", "menCategory"],
    ["Women", "womenCategory"],
    ["Kids", "kidsCategory"],
    ["HomeAndLiving", "homeAndLivingCategory"],
    ["Beauty", "beautyCategory"],
  ]);

  const handleBrandCheckboxChange = (brand, isChecked) => {
    console.log("Brand:", brand, "isChecked:", isChecked);
    if (isChecked) {
      setSelectedBrands((prevSelectedBrands) => [...prevSelectedBrands, brand]);
    } else {
      setSelectedBrands((prevSelectedBrands) =>
        prevSelectedBrands.filter((selectedBrand) => selectedBrand !== brand)
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

  const handlePriceGoClick = useCallback(() => {
    // Ensure minPrice is less than or equal to maxPrice before filtering
    if (minPrice <= maxPrice) {
      var fP = filteredProducts.filter((product) => {
        return (
          product.product_price >= minPrice && product.product_price <= maxPrice
        );
      });
      setFilteredProducts(fP);
    } else {
      setMinPrice(0);
      setMaxPrice(1000);
    }
  }, [filteredProducts, minPrice, maxPrice]);

  const handleProductClick = (brandName, productId) => {
    window.location.href = `http://localhost:3000/${brandName}/${productId}`;
  };

  const handleSeeMoreBrands = () => {
    setShowAllBrands(true);
  };

  const handleSeeMoreColors = () => {
    setShowAllColors(true);
  };

  useEffect(() => {
    setSelectedBrands([]);
  }, [category]);

  // useEffect to clear selected brands only if the last visible brand is not selected
  useEffect(() => {
    if (!showAllBrands) {
      const lastDisplayedBrands = Brands.slice(0, 10); // Brands displayed without "See More"
      const isAnySelectedBrandNotDisplayed = selectedBrands.some(
        (selectedBrand) => !lastDisplayedBrands.includes(selectedBrand)
      );

      if (isAnySelectedBrandNotDisplayed && selectedBrands.length > 0) {
        setSelectedBrands([]);
      }
    }
  }, [selectedBrands, showAllBrands]);

  // useEffect to clear selected colors only if the last visible color is not selected
  useEffect(() => {
    if (!showAllColors) {
      const lastDisplayedColors = Colors.slice(0, 5); // Colors displayed without "See More"
      const isAnySelectedColorNotDisplayed = selectedColors.some(
        (selectedColor) => !lastDisplayedColors.includes(selectedColor)
      );

      if (isAnySelectedColorNotDisplayed && selectedColors.length > 0) {
        setSelectedColors([]);
      }
    }
  }, [selectedColors, showAllColors]);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      console.log(
        "uiDBCategoryMapping.get(props.category) : ",
        props?.category,
        uiDBCategoryMapping.get(props?.category)
      );
      if (
        product.product_category !== uiDBCategoryMapping.get(props?.category)
      ) {
        return false;
      }

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

      return true;
    });

    setFilteredProducts(filteredProducts);
  }, [products, selectedBrands, selectedColors, props]);

  let sortedProducts = [...filteredProducts];

  if (sortBy === "customerRating") {
    sortedProducts.sort((a, b) => b.product_rating - a.product_rating);
  } else if (sortBy === "priceLowToHigh") {
    sortedProducts.sort((a, b) => a.product_price - b.product_price);
  } else if (sortBy === "priceHighToLow") {
    sortedProducts.sort((a, b) => b.product_price - a.product_price);
  }

  if (!sortBy) {
    sortedProducts.sort((a, b) => a.id - b.id);
  }

  const baseURL = "http://localhost:3001";

  return (
    <>
      <NavigationBar
        searchButtonClicked={searchButtonClicked}
        showSearchBar={true}
      />

      <Container>
        <LeftSection>
          <FilterContainer>
            <FilterTitle>FILTERS</FilterTitle>
            <FilterTitle>BRAND</FilterTitle>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {(showAllBrands ? Brands : Brands.slice(0, 10)).map((brand) => (
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
              {!showAllBrands && (
                <span
                  style={{
                    color: "green",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  onClick={handleSeeMoreBrands}
                >
                  See More
                </span>
              )}
            </div>

            <FilterTitle>COLOR</FilterTitle>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {(showAllColors ? Colors : Colors.slice(0, 5)).map((color) => (
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
              {!showAllColors && (
                <span
                  style={{
                    color: "green",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  onClick={handleSeeMoreColors}
                >
                  See More
                </span>
              )}
            </div>
            <FilterTitle>PRICE RANGE</FilterTitle>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: "300px",
              }}
            >
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                placeholder="Min"
                min={0}
                style={{ marginRight: "10px", width: "80px" }} // Adjust width as needed
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                placeholder="Max"
                min={minPrice}
                style={{ marginRight: "10px", width: "80px" }} // Adjust width as needed
              />
              <button style={{ width: "50px" }} onClick={handlePriceGoClick}>
                Go
              </button>{" "}
              {/* Adjust width as needed */}
            </div>
          </FilterContainer>
        </LeftSection>
        <RightSection>
          <SortByContainer>
            <FilterTitle>Sort By</FilterTitle>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">None</option>
              <option value="customerRating">Customer Rating</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </SortByContainer>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {sortedProducts.map((product, index) => (
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
        </RightSection>
      </Container>
     
    </>
  );
};

export default ProductsGrid;
