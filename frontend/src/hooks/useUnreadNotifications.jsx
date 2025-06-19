import { useState, useEffect } from "react";
import apiClient from "@/lib/apiClient";

export default function useUnreadNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("foodShareToken");
    if (!token) {
      setUnreadCount(0);
      return;
    }
    const fetchCount = async () => {
      try {
        const res = await apiClient.get("/users/notifications");
        if (isMounted) {
          setUnreadCount(res.data.filter((n) => !n.read).length);
        }
      } catch {
        if (isMounted) setUnreadCount(0);
      }
    };
    fetchCount();
    // Optionally, poll every 30s for new notifications
    const interval = setInterval(fetchCount, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return unreadCount;
}
