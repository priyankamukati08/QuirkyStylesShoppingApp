import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductSizeAndColor } from "../store/actions/productQuantityActions";

const ProductQuantityManagement = () => {
  const dispatch = useDispatch();
  const quantities = useSelector((state) => state.quantities);

  useEffect(() => {
    dispatch(getProductSizeAndColor());
  }, [dispatch]);

  return (
    <div>
      <h2>Quantity Management</h2>
      {/* Display quantity data */}
    </div>
  );
};

export default ProductQuantityManagement;
