import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getWelcomeMessage } from "../../../../../helpers/wel-cart";

import "./welcomeCart.scss";

const WelcomeCart: React.FC = () => {
  const [welcartType, setWelcartType] = useState("morning");
  // Store States
  const loginState = useSelector((state: any) => state?.auth?.user);
  useEffect(() => {
    const res: any = getWelcomeMessage();
    setWelcartType(res?.type);
  }, []);

  return (
    <div className="WelcomeCart">
      <div className="container">
        <div className="cart">
          {welcartType === "morning" ? (
            <>
              <div className="title">Günaydın, {loginState?.username}.</div>
              <div className="btn">Bugün Nasılsın ?</div>
              <div className="morning-icon"></div>{" "}
            </>
          ) : (
            <></>
          )}

          {welcartType === "day" ? (
            <>
              <div className="title">İyi günler, {loginState?.username}.</div>
              <div className="btn">Bugün Nasılsın ?</div>
              <div className="day-icon"></div>{" "}
            </>
          ) : (
            <></>
          )}

          {welcartType === "evening" ? (
            <>
              <div className="title">İyi Akşamlar, {loginState?.username}.</div>
              <div className="btn">Bugün Nasılsın ?</div>
              <div className="evening-icon"></div>{" "}
            </>
          ) : (
            <></>
          )}

          {welcartType === "night" ? (
            <>
              <div className="title">İyi Geceler, {loginState?.username}.</div>
              <div className="btn">Bugün Nasılsın ?</div>
              <div className="night-icon"></div>{" "}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeCart;
