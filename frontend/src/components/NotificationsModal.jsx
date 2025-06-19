import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationsThunk,
  clearAllNotificationsThunk,
  deleteNotificationThunk,
} from "@/slices/notificationsSlice";

const NotificationsModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(
    (state) => state.notifications
  );
  const [deletingIndex, setDeletingIndex] = useState(null);

  useEffect(() => {
    if (open) dispatch(fetchNotificationsThunk());
    setDeletingIndex(null);
    // eslint-disable-next-line
  }, [open, dispatch]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-black/30"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-sm mt-20 mr-8 p-6 relative border border-sage-200 animate-fade-in sm:mt-20 sm:mr-8 sm:max-w-sm max-w-full mx-2"
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: "auto" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          {notifications.length > 0 && (
            <span
              className="text-xs text-red-600 cursor-pointer hover:underline transition-all select-none ml-4"
              style={{ userSelect: "none" }}
              onClick={() => dispatch(clearAllNotificationsThunk())}
              disabled={loading}
            >
              Clear All
            </span>
          )}
        </div>
        {loading && deletingIndex === null ? (
          <div>Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="text-gray-500">No notifications</div>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {notifications.map((n, i) => (
              <li
                key={i}
                className={`relative p-3 rounded-md border ${
                  n.read ? "bg-gray-50" : "bg-sage-50 border-sage-200"
                }`}
              >
                <div className="text-sm pr-8">{n.message}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </div>
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                  aria-label="Delete notification"
                  onClick={async () => {
                    setDeletingIndex(i);
                    await dispatch(deleteNotificationThunk(i));
                    setDeletingIndex(null);
                  }}
                  disabled={deletingIndex === i || loading}
                >
                  {deletingIndex === i ? (
                    <span className="w-4 h-4 inline-block animate-spin border-2 border-gray-400 border-t-transparent rounded-full"></span>
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsModal;
