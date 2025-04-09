// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
firebase.initializeApp({
  apiKey: "AIzaSyASH6uUtJ4LRTKxysZQsvwh1tkGW5KSVMY",
  authDomain: "faive-api.firebaseapp.com",
  projectId: "faive-api",
  storageBucket: "faive-api.firebasestorage.app",
  messagingSenderId: "499364533021",
  appId: "1:499364533021:web:78038e42f41d3f5b8f47f4",
  measurementId: "G-BT8ES3CZT8",
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// Đăng ký service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      messaging.getToken({
        vapidKey:
          "BHCOD5SJwlgJw6CFVybQSgSdBZBaTKac6lKHi6mjld2Ga1ePlPY_vkHFCbUKSlHV6V1ZhUcitIN8tloVDPVk7tw",
        serviceWorkerRegistration: registration,
      });
    });
}

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon-192x192.png", // Make sure to add this icon to your public folder
    badge: "/icon-192x192.png",
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
