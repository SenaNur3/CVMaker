import React, { useRef, useState } from "react";



import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/react';
import "./RecommendationDesc.scss";

const RecommendationDesc: React.FC = () => {
  const [res, setRes] = useState("");
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<any>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  const getResult = async () => {
    const api_key = "";
    const temperature = 0.5;

    modal.current?.present()
    await fetch("https://api.openai.com/v1/engines/curie/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        prompt: "Javascript Soğukkanlı tecrübeli yazılım uzmanı önsöz",
        temperature: temperature,
        max_tokens: 150,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRes(data.choices[0].text)
        console.log(data.choices[0].text)
      });
  };

  return (
    <>
      <div className="GPT">
        <div className="container">
          <div className="isNoCv">
            <div className="title">GPT ile Ön Yazı Oluştur</div>
            <div className="btn" onClick={getResult}>
              Hemen Oluştur
            </div>
            <div className="cv-icon"></div>
          </div>
        </div>
      </div>

      <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Kapat</IonButton>
              </IonButtons>
              <IonTitle>GPT Önyazsı</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Kopyala
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonContent>
                Lorem ipsum dolar amet, Lorem ipsum dolar amet, Lorem ipsum dolar amet
              </IonContent>
            </IonItem>
          </IonContent>
        </IonModal>
    </>
  );
};
export default RecommendationDesc;
