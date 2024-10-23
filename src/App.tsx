import WebApp from "@twa-dev/sdk";
import "./App.css";
import HomePage from "./components/homepage";
import { useState, useEffect } from "react";
import { useUserLogin } from "./hooks/useAuth";

function App() {
   const [telegramInitData, setTelegramInitData] = useState<string>("");
   const queryString = window.location.search; // Get the query string
   const urlParams = new URLSearchParams(queryString);
   const referralId = urlParams.get("referralCode")!;

    useEffect(() => {
      WebApp.expand();
      const initData = WebApp.initData;
      setTelegramInitData(initData);
    }, []);

    const { userData } = useUserLogin(telegramInitData, referralId);
    console.log("userdata from app.tx", userData);

       if (!userData) {
         return "Loading....."; // Better loading indication
       }
  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
