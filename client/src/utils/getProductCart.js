const getProductCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null;

export default getProductCart;
