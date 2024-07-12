"use client";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type ToastProps = {
  state: string;
  message: string;
  onClear?: () => void;
};

const Toast: React.FC<ToastProps> = ({ state, message, onClear }) => {
  useEffect(() => {
    if (state && message) {
      const notify = () => {
        switch (state) {
          case "error":
            toast.error(`${message}`, {
              position: "bottom-right",
            });
            break;
          case "warn":
            toast.warn(`${message}`, {
              position: "bottom-right",
            });
            break;
          case "info":
            toast.info(`${message}`, {
              position: "bottom-right",
            });
            break;
          case "success":
            toast.success(`${message}`, {
              position: "top-center",
            });
            break;
          case "custom": // 커스텀 Toast 입니다.
            toast(`${message}`, {
              position: "bottom-right",
              style: {
                backgroundColor: "#A16040",
                color: "#FFF7DB",
                fontSize: "16px",
              },
              progressStyle: {
                background: "white",
              },
            });
          default:
            break;
        }
      };
      notify();
      // 일정 시간이 지난 후 상태 초기화
      if (onClear!!) {
        const timer = setTimeout(onClear, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [state, message, onClear]);

  /*
    대표색상 코드
    main: "#FFF7DB",
    base: "#FBF8EE",
    point: "#A16040",
  */
  return (
    <div>
      <ToastContainer role="alert" position="bottom-right" />
    </div>
  );
};

export default Toast;
