// method for adding items to cart ,the catch is that we don't need to pass id here 
// for fetching particular customer data it is reterive from backend
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/api/v1/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

// method for fetching cart items
export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    //TODO:we will not hard-coded server URL here
    const response = await fetch(
      "http://localhost:4000/api/v1/cart"
    );
    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}

// method for updating cart 
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/api/v1/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  // console.log(itemId);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/api/v1/cart/" + itemId, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data: { id: itemId } });
  });
}

export function resetCart() {
  // get all items of user's cart - and then delete the cart.
  return new Promise(async (resolve) => {
    //Step 1:- Get all items of user's cart
    const response = await fetchItemsByUserId();
    const items = response.data;
    //Step 2:- delete all items of cart 
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
