import Toast from "@/components/commons/Toast/Toast";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
  return (
    <div className="bg-main  h-[100vh]">
      <Toast state={"success"} message="성공 메시지" />
      <Toast state={"error"} message="에러 메시지" />
      <Toast state={"warn"} message="경고 메시지" />
      <Toast state={"info"} message="정보관련 메시지" />
      <Toast state={"custom"} message="커스텀 토스트" />
    </div>
  );
};

export default Test;
