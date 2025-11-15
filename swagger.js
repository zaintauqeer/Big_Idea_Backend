import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My Backend APIs",
    description: "API Documentation for BigIdea",
  },
  host: "1mck76zh-5000.inc1.devtunnels.ms", 
  schemes: ["https"], 
};

const outputFile = "./swagger-output.json"; // ye file auto banegi
const endpointsFiles = ["./index.js"]; // routes ka entry point

swaggerAutogen()(outputFile, endpointsFiles, doc);
