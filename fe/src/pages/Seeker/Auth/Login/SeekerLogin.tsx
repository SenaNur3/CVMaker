import {
  IonContent,
  IonPage,
  IonList,
  IonLabel,
  IonInput,
  IonItem,
  IonInfiniteScrollContent,
  IonRippleEffect,
  IonImg,
} from "@ionic/react";

import "./SeekerLogin.scss";
import { useHistory } from "react-router-dom";
import { login } from "../../../../actions/auth";
import { useDispatch } from "react-redux";
import { useState } from "react";

const SeekerLogin: React.FC = () => {
  const history = useHistory();
  const dispatch: any = useDispatch();
  const [email, setStateEmail] = useState<string>();
  const [pass, setStatePass] = useState<string>();
  const [valid, setIsValid] = useState<boolean>();
  const [validEmail, setIsValidEmail] = useState<boolean>();

  const validateEmail = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValidEmail(undefined);

    if (value === '') return;

    setStateEmail(value) !== null ? setIsValidEmail(true) : setIsValidEmail(false);
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === '') return;

    setStatePass(value) !== null ? setIsValid(true) : setIsValid(false);
  };


  const loginHandle = () => {
    dispatch(login(email, pass))
      .then(() => {
        history.push("/seekerMainPage");
        //window.location.reload();
      })
      .catch(() => {});
  };
  return (
    <IonPage>
      <IonContent className="SeekerLoginPage">
        <div className="login-img">
          <IonImg src="assets/candidate.png" class="img"></IonImg>
        </div>
        <div className="login-text-container">
          <div className="text-login">Giriş yap</div>
          <div className="text-login-second">Hemen giriş yap CV'ni oluştur</div>
        </div>

        <IonInfiniteScrollContent>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Email </IonLabel>
              <IonInput
                type="email"
                onIonInput={(event : any) => validateEmail(event)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Şifre</IonLabel>

              <IonInput
                type="password"
                onIonInput={(event : any) => validate(event)}
              ></IonInput>
            </IonItem>

            <div className="ion-activatable ripple-parent rounded-rectangle">
              <IonRippleEffect></IonRippleEffect>
            </div>
          </IonList>
        </IonInfiniteScrollContent>

        <div className="button-container">
          <div className="lgn-btn" onClick={loginHandle}>
            Giriş Yap
          </div>
        </div>

        <div className="button-container">
          <div
            className="register-btn"
            onClick={() => history.push("/seekerRegister")}
          >
            Kayıt Ol
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SeekerLogin;
