/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// import Cors from "cors";

// // Initializing the cors middleware
// const cors = Cors({
//   methods: ["GET", "HEAD"],
// });

// // Helper method to wait for a middleware to execute before continuing
// // And to throw an error when an error happens in a middleware
// function runMiddleware(req, res, fn) {
// console.log("hit middleware");

//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }

//       return resolve(result);
//     });
//   });
// }

// async function handler(req, res) {
// console.log("hit the handler");
//   // Run the middleware
//   await runMiddleware(req, res, cors);

//   // Rest of the API logic
//   res.json({ message: "Hello Everyone!" });
// }

// export default handler;
