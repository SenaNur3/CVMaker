import {
  IonContent,
  IonPage,
  IonInfiniteScrollContent,
  IonImg,
} from "@ionic/react";
import "./SeekerRegister.scss";

import { IonButton, IonLabel, IonItem, IonInput, IonList } from "@ionic/react";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../../../actions/auth";

const SeekerRegister: React.FC = () => {
  const history = useHistory();
  const dispatch: any = useDispatch();
  const [email, setStateEmail] = useState<any>();
  const [pass, setStatePass] = useState<any>();
  const [name, setStateUsername] = useState<any>();

  const handleRegister = () => {
    dispatch(
      register(
        name?.target?.value,
        email?.target?.value,
        pass?.target?.value,
        2
      )
    )
      .then(() => {
        history.push("/seekerLogin");
        //window.location.reload();
      })
      .catch(() => {});
  };

  return (
    <IonPage className="SeekerRegister">
      <IonContent>
        <IonInfiniteScrollContent>
          <div className="login-img">
            <IonImg src="assets/candidate.png" class="img"></IonImg>
          </div>
          <div className="login-text-container">
            <div className="text-login">Kayıt ol</div>
            <div className="text-login-second">
              Hemen kayıt ol CV'ni oluştur
            </div>
          </div>
          <IonList lines="full">
            <IonItem>
              <IonLabel position="stacked" className="label">
                İsim
              </IonLabel>
              <IonInput
                onIonInput={(event: any) => setStateUsername(event)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                onIonInput={(event: any) => setStateEmail(event)}
                type="email"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating"> Şifre </IonLabel>
              <IonInput
                type="password"
                onIonInput={(event: any) => setStatePass(event)}
              ></IonInput>
            </IonItem>
          </IonList>
        </IonInfiniteScrollContent>

        <div className="button-container">
          <div className="lgn-btn" onClick={handleRegister}>
            Tamamla
          </div>
        </div>

        <div className="button-container">
          <div
            className="register-btn"
            onClick={() => history.push("/seekerLogin")}
          >
            Zaten bir hesabım var
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SeekerRegister;
