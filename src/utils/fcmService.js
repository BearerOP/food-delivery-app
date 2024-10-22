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

const sendMessage = async (fcmTokens, message) => {
  try {
    const data = {
      timestamp: Date.now().toString(),
    };

    const validTokens = fcmTokens.filter(token => token);
    if (validTokens.length === 0) {
      return {
        success: false,
        message: "No valid FCM tokens provided",
      };
    }
    const responses = await Promise.all(
      validTokens.map(fcmToken =>
        admin.messaging().send({
          token: fcmToken,
          notification: {
            title: message.title,
            body: message.body,
          },
          data: data,
        })
      )
    );

    console.log("Successfully sent messages:", responses);

    return {
      success: true,
      message: "Messages sent successfully",
      responses, 
    };
  } catch (error) {
    console.error("Error sending messages:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  sendMessage,
};
