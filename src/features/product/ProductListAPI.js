export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO:we will not hard-coded server URL here
    const response = await fetch("http://localhost:4000/api/v1/products");
    //TODO: Server will filter deleted products.
    const data = await response.json();
    resolve({ data });
  });
}

//done
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO:we will not hard-coded server URL here
    const response = await fetch("http://localhost:4000/api/v1/products/" + id);
    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}

//done
export function createProduct(product) {
  return new Promise(async (resolve) => {
    //TODO:we will not hard-coded server URL here
    const response = await fetch("http://localhost:4000/api/v1/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

//done
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/api/v1/products/" + update.id,
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

//done
export function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category":["smartphones","laptops",]}
  // sort= {_sort:"price",_order="desc"}
  //pagination = {_page:1,_limit=10};

  //TODO: on server we will support multi values in filter. //done
  //TODO: Server will filter deleted products in case of non-admin. //done
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if (admin) {
    queryString += `admin=true`;
  }
  return new Promise(async (resolve) => {
    //TODO:we will not hard-coded server URL here  //later
    // console.log(queryString);
    const response = await fetch(
      `http://localhost:4000/api/v1/products?` + queryString
    );
    const data = await response.json();
    // console.log("data", data);
    const totalItems = await response.headers.get("X-Total-Count");
    // console.log("TotalItems", totalItems);
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

//done
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/api/v1/categories");
    const data = await response.json();
    resolve({ data });
  });
}

//done
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/api/v1/brands");
    const data = await response.json();
    resolve({ data });
  });
}
