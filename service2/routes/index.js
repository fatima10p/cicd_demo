const router = require("express").Router();

const ServiceController = require("./api/service/controller/ServiceController");

router.post(
  "/v1/service",
  ServiceController.Service
);

// SW API call
router.post("/service/test", function (req, res, next) {
  console.log("Request land");

  const respData = {
    ResponseCode: "0000",
    ResponseDescription: "Request successfully executed",
    CustomerData: {
      CardData: [],
      AccountData: [],
    },
  };
  res.status(200).send(respData);
});

module.exports = router;
