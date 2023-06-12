import React, { useEffect, useRef, useState } from "react";



import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
} from '@ionic/react';
import "./RecommendationDesc.scss";

const RecommendationDesc: React.FC = () => {
  const [res, setRes] = useState("");
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  useEffect(() => {
    generateText()
  }, []);


  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<any>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  
  const generateText = () => {
    
    var basliklar = [
      "Sevgili Müşteri,",
      "Sayın Bay/Bayan,",
      "Merhaba,",
      "Selam,",
      "Değerli Üyemiz,"
    ];

    var aciklamalar = [
      "Size bu mektubu yazmamızın sebebi,",
      "Bu e-postayı size gönderme amacımız,",
      "Sizi bu yazıyla bilgilendirmek istiyoruz,",
      "Size önemli bir konuda bilgi vermek istiyoruz,",
      "Yeni gelişmeleri sizinle paylaşmak istiyoruz,"
    ];

    var vurgular = [
      "önemli bir duyuru yapmak",
      "size bir teklif sunmak",
      "sizi bilgilendirmek",
      "sorununuzu çözmek",
      "yeni bir ürün tanıtmak"
    ];

    var bitisler = [
      "için bu mektubu yazıyoruz.",
      "hakkında sizi bilgilendirmek istiyoruz.",
      "sorununuzu çözmek için buradayız.",
      "size özel bir teklif sunmak istiyoruz.",
      "sizi bilgilendirmek istediğimiz bir konu var."
    ];

    var uzunOnYazi = "";
    while (uzunOnYazi.length < 300) {
      var randomBaslikIndex = Math.floor(Math.random() * basliklar.length);
      var randomAciklamaIndex = Math.floor(Math.random() * aciklamalar.length);
      var randomVurguIndex = Math.floor(Math.random() * vurgular.length);
      var randomBitisIndex = Math.floor(Math.random() * bitisler.length);

      var secilenBaslik = basliklar[randomBaslikIndex];
      var secilenAciklama = aciklamalar[randomAciklamaIndex];
      var secilenVurgu = vurgular[randomVurguIndex];
      var secilenBitis = bitisler[randomBitisIndex];

      var tempOnYazi = secilenBaslik + " " + secilenAciklama + " " + secilenVurgu + ". " + secilenBitis;
      uzunOnYazi += tempOnYazi + " ";
    }
    modal.current?.present()
    setMessage(uzunOnYazi.trim())

}

 // const getResult = async () => {
 //   const api_key = "";
 //   const temperature = 0.5;
//
 //   modal.current?.present()
 //   await fetch("https://api.openai.com/v1/engines/curie/completions", {
 //     method: "POST",
 //     headers: {
 //       "Content-Type": "application/json",
 //       'Authorization': `Bearer ${api_key}`,
 //     },
 //     body: JSON.stringify({
 //       prompt: "Javascript Soğukkanlı tecrübeli yazılım uzmanı önsöz",
 //       temperature: temperature,
 //       max_tokens: 150,
 //     }),
 //   })
 //     .then((response) => response.json())
 //     .then((data) => {
 //       setRes(data.choices[0].text)
 //       console.log(data.choices[0].text)
 //     });
 // };

  return (
    <>
      <div className="GPT">
        <div className="container">
          <div className="isNoCv">
            <div className="title">GPT ile Ön Yazı Oluştur</div>
            <div className="btn" onClick={generateText}>
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
              <p className="msg-gpt">
                {message}
              </p>
            </IonItem>
          </IonContent>
        </IonModal>
    </>
  );
};
export default RecommendationDesc;
