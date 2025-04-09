"use client";

import { useState, useEffect } from "react";
import {
  requestNotificationPermission,
  onMessageListener,
} from "@/lib/firebase";
import { toast } from "react-hot-toast";

interface NotificationPayload {
  notification?: {
    title?: string;
    body?: string;
  };
  data?: Record<string, string>;
}

export const useNotifications = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationPayload | null>(
    null
  );

  useEffect(() => {
    // Request permission and get token
    const setupNotifications = async () => {
      try {
        const token = await requestNotificationPermission();
        if (token) {
          setFcmToken(token);
          // Here you can send the token to your backend
          console.log("FCM Token:", token);
        }
      } catch (error) {
        console.error("Error setting up notifications:", error);
      }
    };

    setupNotifications();
  }, []);

  useEffect(() => {
    // Handle foreground messages
    const messageListener = onMessageListener()
      .then((payload) => {
        const notificationPayload = payload as NotificationPayload;
        setNotification(notificationPayload);
        // Show toast notification
        toast(notificationPayload?.notification?.body || "New notification");
      })
      .catch((err) => console.error("Failed to setup message listener:", err));

    return () => {
      messageListener.catch(() => {}); // Handle promise rejection
    };
  }, []);

  return { fcmToken, notification };
};
