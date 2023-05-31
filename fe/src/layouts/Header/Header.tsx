import { IonBackButton, IonButtons, IonIcon, IonToolbar } from "@ionic/react";
import React from "react";
import { cloudDownload, personCircle } from "ionicons/icons";

import "./Header.scss";
import { useHistory } from "react-router-dom";

const Header: any = ({ title, isHasBack = true }: any) => {
  const history = useHistory();

  return (
    <div className="Header">
      <div className="container">
        {/* <div className="left"> */}
        {/* <IonIcon icon={chevronBack} class="size"></IonIcon> */}
        {/* </div> */}

        {isHasBack ? (
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="#"
              text=""
              className="back-btn"
            ></IonBackButton>
          </IonButtons>
        ) : (
          <></>
        )}

        <div className="logo">{title}</div>
        <div className="right">
          <IonIcon icon={cloudDownload}
            onClick={() => history.push("/PdfPage")}
            class="size"></IonIcon>

          <IonIcon
            icon={personCircle}
            onClick={() => history.push("/Profile")}
            class="size spacer-icons"
          ></IonIcon>
        </div>
      </div>
    </div>
  );
};

export default Header;
