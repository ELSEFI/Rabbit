const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// FUNCTION TO GET A CART BY USER ID OR GUEST ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// ROUTE POST /api/cart  ADD A PRODUCT TO THE CART FOR A GUEST OR LOGGED IN USER (PUBLIC)
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // DETERMINE IF THE USER IS LOGGED-IN OR GUEST
    let cart = await getCart(userId, guestId);

    // IF THE CART EXISTS, UPDATE IT
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // IF THE PRODUCT ALREADY EXISTS, UPDATE THE QUANTITY
        cart.products[productIndex].quantity += quantity;
      } else {
        // ADD NEW PRODUCT
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // RECALCULATE THE TOTAL PRICE
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      // CREATE A NEW CART FOR THE GUEST OR USER
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// ROUTE PUT /api/cart UPDATE PRODUCT QUANTITY IN THE CART FOR A GUEST OR LOGGED-IN USER (PUBLIC)
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart Not Found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product Not Found In Cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// ROUTE DELETE /api/cart REMOVE PRODUCT FROM THE CART (PUBLIC)
router.delete("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);

    if (!cart) return res.status(404).json({ message: "Cart Not Found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product Not Found In Cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// ROUTE GET /api/cart GET CART FOR A GUEST OR LOGGED-IN USER (PUBLIC)
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// ROUTE POST /api/cart/merge MERGE GUEST CART INTO USER CART ON LOGIN (PRIVATE)
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest Cart is Empty" });
      }

      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();

        // REMOVE THE GUEST CART AFTER MERGING
        try {
          await Cart.findByIdAndDelete({ guestId });
        } catch (error) {
          console.error("Error Deleting Guest Cart: ", error);
          res.status(500).send("Server Error");
        }
        res.status(200).json(userCart);
      } else {
        // IF THE USER HAS NO EXISTING CART, ASSIGN THE GUEST CART TO THE USER
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        // GUEST CART HAS ALREADY BEEN MERGED, RETURN USER CART
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest Cart Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
