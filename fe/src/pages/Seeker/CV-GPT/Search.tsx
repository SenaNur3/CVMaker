import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/react";

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [res, setRes] = useState("");

  const handleSearch = async () => {
    const api_key = "";
    const prompt = keyword;
    const temperature = 0.5;
    
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>İş Arama</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Anahtar kelime</IonLabel>
          <IonInput
            value={keyword}
            onIonChange={(e) => setKeyword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonButton expand="full" onClick={handleSearch}>
          Ara
        </IonButton>

        <IonContent>{res}</IonContent>
      </IonContent>
    </IonPage>
  );
};
export default Search;
