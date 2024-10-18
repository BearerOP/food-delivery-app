const admin = require('firebase-admin');

const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'food-planet-7a1be.appspot.com'
});

const sendMessage = async (fcmToken, message) => {
  try {
    const response = await admin.messaging().send({
      token: fcmToken,
      notification: {
        title: message.title,
        body: message.body
      }
    });
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error; // Throw error to handle it in calling service
  }
};

module.exports = {
  sendMessage
};
