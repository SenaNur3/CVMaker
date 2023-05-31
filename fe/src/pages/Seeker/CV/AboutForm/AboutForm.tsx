import Header from "../../../../layouts/Header/Header";
import { IonContent, IonHeader, IonPage, IonInfiniteScrollContent } from "@ionic/react";
import "./AboutForm.scss";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { OverlayEventDetail } from '@ionic/core/components';
import { add, save, close } from 'ionicons/icons';
import axios from "axios";
import { getUserCVFunc } from "../../../../actions/cv";
import {
  IonButton,
  IonLabel,
  IonItem,
  IonInput,
  IonList,
  IonCard,
  IonIcon,
  IonTextarea,
  IonButtons,
  IonModal,
  IonToolbar,
  IonTitle,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from "@ionic/react";

const AboutForm: any = () => {

  let serviceStates: any = useSelector((state: any) => state?.cv?.userCV
  );
  let userCV: any = useSelector((state: any) => state?.cv?.userCV);
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const ionInputEl = useRef<HTMLIonInputElement>(null);

  const API_URL = "http://localhost:3000/cv/";
  const dispatch: any = useDispatch();
  const loginState = useSelector((state: any) => state?.auth?.user);
  const user: any = JSON.parse(localStorage.getItem("user") || '{}');
  const [inputModel, setInputModel] = useState('');

  const onInput = (ev: Event) => {
    const value = (ev.target as HTMLIonInputElement).value as string;

    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    setInputModel(filteredValue);

    const inputCmp = ionInputEl.current;
    if (inputCmp !== null) {
      inputCmp.value = filteredValue;
    }
  }

  const callServiceExperience = () => {
    const config = {
      headers: { token: `${JSON.stringify(user.token)}` }
    };

    console.log(inputModel)
    let bodyParameters = {
      ...userCV,
      description: inputModel
    };

    return axios.post(API_URL + loginState?.email, bodyParameters,
      config
    ).then((response: any) => {
      dispatch(getUserCVFunc(loginState?.email));
      modal.current?.dismiss(input.current?.value, 'confirm');
    });
  }

  const handleUpdateAbout = () => {
    modal.current?.present()
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <Header
            title="Güncelle"
          />
        </IonHeader>

        <IonCard>
          <IonCardContent>
            <IonList>
              <IonItem >
                <IonLabel>Hakkında</IonLabel>
                <IonLabel>{serviceStates?.description}</IonLabel>
              </IonItem>

              <IonButton className="update-button" fill="outline" expand="block" onClick={() => handleUpdateAbout()}>
                <IonIcon slot="start" icon={save}></IonIcon>
                Güncelle
              </IonButton>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonModal ref={modal}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Geri</IonButton>
              </IonButtons>
              <IonTitle>Düzenle</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>


            <IonList>
              <IonItem>
                <IonLabel>Açıklama: </IonLabel>
                <IonInput
                  placeholder={serviceStates?.description}
                  value={inputModel}
                  onIonInput={onInput}
                  ref={ionInputEl}
                ></IonInput>
              </IonItem>
            </IonList>

            <div className="buttonContainer">
              <IonButton className="width100" strong={true} onClick={() => callServiceExperience()}>Kaydet</IonButton>
            </div>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};
export default AboutForm;











