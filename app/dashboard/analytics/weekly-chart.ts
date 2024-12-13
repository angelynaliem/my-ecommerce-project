import checkDate from "./check-date";

export const weeklyChart = (chartItems: { date: Date; revenue: number }[]) => {
  return [
    {
      date: "6 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 6))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "6 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 5))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "6 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 4))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "6 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 3))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "6 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 2))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "6 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 1))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "6 days ago",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 0))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
  ];
};
