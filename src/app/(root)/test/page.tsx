"use client";
import Toast from "@/components/commons/toast/Toast";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
  const [toastState, setToastState] = useState({ state: "", message: "" });

  // 상태 초기화 함수
  const clearToastState = () => {
    setToastState({ state: "", message: "" });
  };

  const handleClick = () => {
    setToastState({ state: "custom", message: "컴스텀 토스트" });
  };
  return (
    <div className="bg-main  h-[100vh]">
      {/* <Toast state={"success"} message="성공 메시지" />
      <Toast state={"error"} message="에러 메시지" />
      <Toast state={"warn"} message="경고 메시지" />
      <Toast state={"info"} message="정보관련 메시지" /> */}
      <button onClick={handleClick} className="p-5 border hover:brightness-90">
        토스트 버튼
      </button>
      {toastState.state && <Toast state={toastState.state} message={toastState.message} onClear={clearToastState} />}
      {/* <ConfirmToast content={"정말로 삭제하시겠습니까?"} buttonName="삭제" handleFunction={handleClick} /> */}
    </div>
  );
};

export default Test;
