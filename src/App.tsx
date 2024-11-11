import WebApp from "@twa-dev/sdk";
import "./App.css";
import HomePage from "./components/homepage";
import { useState, useEffect } from "react";
import { useUserLogin } from "./hooks/useAuth";

function App() {
   const [telegramInitData, setTelegramInitData] = useState<string>("query_id=AAElBO5_AAAAACUE7n8snWsY&user=%7B%22id%22%3A2146305061%2C%22first_name%22%3A%22Crypto%22%2C%22last_name%22%3A%22Dray%22%2C%22username%22%3A%22Habibilord%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1729675461&hash=6ceaa88bb59cdf32e642c3af89b0c7eeea90a182560d64967d1d6e109d301ded");
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
      <HomePage userData={userData} />
    </>
  );
}

export default App;
