import {
  IonCol,
  IonGrid,
  IonRow,
  IonContent,
  IonPage,
  IonButton,
} from "@ionic/react";

import { Route } from "react-router-dom";

import "./Home.scss";
const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="Home" fullscreen>
        <IonGrid style={{ height: "100%", padding: "0px" }}>
          <IonRow style={{ height: "100%" }}>
            <IonCol style={{ margin: "0px", padding: "0px" }}>
              <div className="homeBox">
                <div className="first-text">CV'ye mi ihtiyacın var ?</div>
                <div className="second-text">
                  Hemen CV oluştur, sana uygun işi hemen bul
                </div>
                <Route
                  render={({ history }) => (
                    <IonButton
                      onClick={() => {
                        history.push("/SeekerLogin");
                      }}
                      className="link-text"
                    >
                      Başla
                    </IonButton>
                  )}
                />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
