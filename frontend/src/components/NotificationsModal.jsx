import { useEffect, useState } from "react";
import axios from "axios";

const NotificationsModal = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) fetchNotifications();
    // eslint-disable-next-line
  }, [open]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("foodShareToken");
      const res = await axios.get("/api/users/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
      // Mark as read
      await axios.post(
        "/api/users/notifications/read",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      setNotifications([]);
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/30">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm mt-20 mr-8 p-6 relative border border-sage-200 animate-fade-in">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="Close notifications"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        {loading ? (
          <div>Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="text-gray-500">No notifications</div>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {notifications.map((n, i) => (
              <li
                key={i}
                className={`p-3 rounded-md border ${
                  n.read ? "bg-gray-50" : "bg-sage-50 border-sage-200"
                }`}
              >
                <div className="text-sm">{n.message}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsModal;
