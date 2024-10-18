const admin = require("firebase-admin");

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Ensure newlines are correct
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "food-planet-7a1be.appspot.com",
});

const hi = {
  notification: {
    android: {},
    body: "Your order has been placed successfully",
    title: "Order Placed",
  },
  sentTime: 1729280781620,
  data: {},
  from: "560511134779",
  messageId: "0:1729280781629861%e40f9203e40f9203",
  ttl: 2419200,
  collapseKey: "com.foodplanet",
};
const sendMessage = async (fcmToken, message) => {
  try {
    const data = {
      timestamp: Date.now().toString(),
    };
    
    const response = await admin.messaging().send({
      token: fcmToken,
      notification: {
        title: message.title,
        body: message.body,
      },
      data: data
    });
    console.log("Successfully sent message:", response);
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Throw error to handle it in calling service
  }
};

module.exports = {
  sendMessage,
};
