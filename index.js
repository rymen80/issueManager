// *** Dot env
require("dotenv").config();
const express = require("express");
const routes = require("./routes");
// *** Swagger imports
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

require("./services/passport");

const app = express();
const PORT = process.env.PORT || 3001;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "IssUse Api Document", // *** (required)
      version: "1.0.0", // *** (required)
      description: `IssUse Api Information and Tester.
      IssUse is a simple Issue Management System for your project.This swagger document will help you get acquainted with IssUse APIs, their parameters, description, responses. 
      You can also test the APIs using these api-docs`,
    },
  },
  // *** Provide the routes for API Documentation
  apis: [
    "./routes/authRoutes/index.js",
    "./routes/apiRoutes/userRoutes.js",
    "./routes/apiRoutes/issuesRoutes.js",
    "./routes/apiRoutes/projectRoutes.js",
  ],
};

// *** Custom CSS for the Swagger Documentation
const swaggerCustomOptions = {
  customCss: `
  .topbar-wrapper img {content:url(https://github.com/rymen80/issueManager/raw/master/client/src/images/issUseLogo.png); width:40px; height:50px;}
  .swagger-ui .topbar { background-color: #000000; border-bottom: 20px solid #5dc6d1; color: #ff9961}
  .topbar-wrapper:after{content:"IssUse Api | Created By IssUse Team  | © 2020-21 IssUse Team";display:inline-block}`,
  customSiteTitle: "IssUse APIs",
  explorer: false,
};
// *** Use Swagger Options
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// *** Use the swaggerUi.serve middlewares
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, swaggerCustomOptions)
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started listening on PORT : ${PORT}`);
});
