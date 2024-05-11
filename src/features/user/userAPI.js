// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/api/v1/orders/own/");
    const data = await response.json();
    resolve({ data });

    // console.log("From userAPI ", data);
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/api/v1/users/own");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(updateUser) {
  // console.log(updateUser);
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/api/v1/users/" + updateUser.id,
      {
        method: "PATCH",
        body: JSON.stringify(updateUser),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
