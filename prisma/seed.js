const prisma = require("../prisma");

const seed = async () => {
  console.log('start');

  const createCustomers = async () => {
    const customers = [
      { name: "nepeta" },
      { name: "lady" },
      { name: "nudacris" },
      { name: "charlie" },
      { name: "ollie" },
    ];
    const createdCustomers = await prisma.customer.createMany({ data: customers });
    // fetch inserted customers with IDs
    return await prisma.customer.findMany();
  };

  const createRestaurants = async () => {
    const restaurants = [
      { name: "shrimp shack" },
      { name: "pancake paradise" },
      { name: "beer bar" },
      { name: "big bite burgers" },
      { name: "spaghetti and sauce sanctuary" },
    ];
    const createdRestaurants = await prisma.restaurant.createMany({ data: restaurants });
    // fetch inserted restaurants with IDs
    return await prisma.restaurant.findMany();
  };

  const createReservations = async (customers, restaurants) => {
    const reservations = [
      {
        customerId: customers[1].id,
        restaurantId: restaurants[1].id,
        partyCount: 5,
        date: new Date("2024-12-24"),
      },
      {
        customerId: customers[2].id,
        restaurantId: restaurants[2].id,
        partyCount: 4,
        date: new Date("2024-12-25"),
      },
      {
        customerId: customers[3].id,
        restaurantId: restaurants[4].id,
        partyCount: 3,
        date: new Date("2024-12-26"),
      },
      {
        customerId: customers[4].id,
        restaurantId: restaurants[4].id,
        partyCount: 2,
        date: new Date("2024-12-27"),
      },
      {
        customerId: customers[5].id,
        restaurantId: restaurants[5].id,
        partyCount: 1,
        date: new Date("2024-12-28"),
      },
    ];
    await prisma.reservation.createMany({ data: reservations });
  };

  const customers = await createCustomers();
  const restaurants = await createRestaurants();
  await createReservations(customers, restaurants);

  console.log("Database seeded!");
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });