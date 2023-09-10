// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/api/v1/orders/user/" + userId
    );
    const data = await response.json();
    resolve({ data });

    console.log("From userAPI " , data);
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/api/v1/users/" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  console.log(update);
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/api/v1/users/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
