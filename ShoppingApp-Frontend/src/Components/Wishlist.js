import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationBar from "./NavigationBar";
import {
  fetchUserWishlist,
  deleteProductsFromUserWishlist,
} from "../store/actions/userWishlistActions";
import { addProductToUserCart } from "../store/actions/userCartActions";
import Cookies from "js-cookie";
import Modal from "./Modal";
import { getProductById } from "../store/actions/productActions";
//import { useNavigate } from "react-router-dom";
import {
  Container,
  WishlistHeading,
  WishlistGrid,
  WishlistItem,
  ProductImage,
  ProductInfo,
  ProductDescription,
  ProductPrice,
  ButtonContainer,
  Button,
  RemoveIcon,
  ShoppingCartHeadingWhenEmpty,
  ShoppingCartHeadingWhenEmpty1,
} from "./WishlistDesign"; // Import the styled components
import CustomToast from "./ToastMessage";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { loading, wishlistItems, error } = useSelector(
    (state) => state.userWishlist
  );
  const userID = Cookies.get("userID");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  //const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const { product } = useSelector((state) => state.productbyid);


  const showToast = (message) => {
    setToastMessage(message); // Set the toast message
  };

useEffect(() => {
  // Check if selectedProduct is not null
  if (selectedProduct) {
    const parsedProductId = parseInt(selectedProduct.product_id, 10);
    dispatch(getProductById(parsedProductId));
  }
}, [dispatch, selectedProduct, userID]);

  useEffect(() => {
    if (userID) {
      dispatch(fetchUserWishlist(userID));
    }
  }, [dispatch, userID]);

  const handleMoveToBag = (product) => {
    setSelectedProduct(product);
    setSelectedSize("");
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(deleteProductsFromUserWishlist(userID, productId))
      .then(() => {
        dispatch(fetchUserWishlist(userID));
        showToast("Item removed from wishlist");
        //navigate("/wishlistpage");
      })
      .catch((error) =>
        console.error("Failed to remove product from wishlist:", error)
      );
  };

  const handleAddToBag = () => {
    dispatch(
      addProductToUserCart(userID, selectedProduct.product_id, 1, selectedSize),
      showToast("Item successfully added to bag")
    )
      .then(() => {
        dispatch(
          deleteProductsFromUserWishlist(userID, selectedProduct.product_id)
        )
          .then(() => {
            dispatch(fetchUserWishlist(userID));
            //navigate("/wishlistpage");
          })
          .catch((error) => {
            console.error("Failed to remove product from wishlist:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to move product to bag:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !wishlistItems) {
    return <div>Error: {error}</div>;
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <>
        <NavigationBar />
        <ShoppingCartHeadingWhenEmpty>Wishlist</ShoppingCartHeadingWhenEmpty>
        <ShoppingCartHeadingWhenEmpty1>
          Your Wishlist is empty. Start shopping now!
        </ShoppingCartHeadingWhenEmpty1>
      </>
    );
  }

  const baseURL = "http://localhost:3001";

  return (
    <>
      <NavigationBar />

      <Container>
        <WishlistHeading>
          My Wishlist({wishlistItems.length} items)
        </WishlistHeading>
        <CustomToast
          message={toastMessage}
          productImage={
            toastMessage === "Item successfully added to bag" 
              ? `${baseURL}${product.product_image_url}`
              : null
          }
        />
        <WishlistGrid>
          {wishlistItems.map((item) => (
            <WishlistItem key={item.id}>
              <ProductImage
                src={`${baseURL}${item.product_image_url}`}
                alt={item.product_name}
              />
              <RemoveIcon
                onClick={() => handleRemoveFromWishlist(item.product_id)}
              >
                &#10006; {/* Unicode character for cross icon */}
              </RemoveIcon>
              <ProductInfo>
                <ProductDescription>
                  {item.product_description}
                </ProductDescription>
                <ProductPrice>Price: ${item.product_price}</ProductPrice>
                <hr></hr>
                <ButtonContainer>
                  <Button onClick={() => handleMoveToBag(item)}>
                    Move to bag
                  </Button>
                </ButtonContainer>
              </ProductInfo>
            </WishlistItem>
          ))}
        </WishlistGrid>
        <Modal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={
            selectedProduct
              ? {
                  image: `${baseURL}${selectedProduct.product_image_url}`,
                  description: selectedProduct.product_description,
                  sizes: ["S", "M", "L", "XL", "XXL"], // Assuming you have sizes available
                }
              : null
          }
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          onSizeChange={handleAddToBag}
        />
      </Container>
    </>
  );
};

export default WishlistPage;
