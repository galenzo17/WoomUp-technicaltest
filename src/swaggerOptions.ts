export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WoomUp Users API",
      version: "1.0.0",
      description: "Una API para ver las usuarias y sus matchs",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
