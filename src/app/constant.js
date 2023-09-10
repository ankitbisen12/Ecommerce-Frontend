export const ITEMS_PER_PAGE = 10;

export function discountedPrice(item) {
  return Math.round(item.price * (1 - item.discountPercentage / 100), 2);
}

export function chooseColor(status) {
  switch (status) {
    case "pending":
      return "bg-purple-200 text-purple-600";
    case "dispatched":
      return "bg-yellow-200 text-yellow-600";
    case "delivered":
      return "bg-green-200 text-green-600";
    case "cancelled":
      return "bg-red-200 text-red-600";
    case "inWarehouse":
      return "bg-gray-200 text-black-600";
    default:
      break;
  }
}
