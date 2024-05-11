export const ITEMS_PER_PAGE = 10;

// export function discountedPrice(item) {
//   return Math.round(item.price * (1 - item.discountPercentage / 100), 2);
// }

export function chooseColor(status) {
  switch (status) {
    case "Pending":
      return "bg-purple-200 text-purple-600";
    case "Dispatched":
      return "bg-yellow-200 text-yellow-600";
    case "Delivered":
      return "bg-green-200 text-green-600";
    case "Cancelled":
      return "bg-red-200 text-red-600";
    case "InWarehouse":
      return "bg-gray-200 text-black-600";
    case "Refunded":
      return "bg-cyan-300 text-black-500";
    case "Received":
      return "bg-orange-600 text-orange-900"
    default:
      break;
  }
}

export function chooseTextColor(status){
  switch (status) {
    case "Pending":
      return "text-purple-600";
    case "Dispatched":
      return "text-yellow-600";
    case "Delivered":
      return "text-green-600";
    case "Cancelled":
      return "text-red-600";
    case "InWarehouse":
      return "text-black-600";
    case "Refunded":
      return "text-black-500";
    default:
      break;
  }
}

export function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function getDayAndMonth() {
  const timestamp = Date.now();
  const currentDate = new Date(timestamp);
  const date = currentDate.getDate();
  const month = currentDate.getMonth(); // Months are zero-based
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month];
  return [date, monthName];
}

export function getNextDatePlusFive() {
  // Get the current date
  let currentDate = new Date();
  
  // Add 5 days to the current date
  let nextDate = new Date(currentDate.getTime() + (5 * 24 * 60 * 60 * 1000));

  // Function to get the name of the month
  function getMonthName(monthNumber) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months[monthNumber];
  }

  // Check if the next date is greater than the last day of the current month
  if (nextDate.getMonth() !== currentDate.getMonth()) {
      // If next date is in the next month, return the first day of next month
      return {
          date: 1,
          month: getMonthName(nextDate.getMonth()), // Get month name
          year: nextDate.getFullYear()
      };
  } else {
      // Otherwise, return the next date
      return {
          date: nextDate.getDate(),
          month: getMonthName(nextDate.getMonth()), // Get month name
          year: nextDate.getFullYear()
      };
  }
}