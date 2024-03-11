const Mpesa  =require("mpesa-node");

const mpesa = new Mpesa({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  environment: "sandbox", // Use 'sandbox' for testing and 'production' for live
  shortCode: "YOUR_SHORTCODE",
  lipaNaMpesaShortCode: "YOUR_LNM_SHORTCODE",
  lipaNaMpesaShortPass: "YOUR_LNM_PASSKEY",
  securityCredential: "YOUR_SECURITY_CREDENTIAL", // This is only required for some APIs
  initiatorName: "YOUR_INITIATOR_NAME",
  testPhoneNumber: "YOUR_TEST_PHONE_NUMBER", // This is the phone number that will receive the STK push
});
