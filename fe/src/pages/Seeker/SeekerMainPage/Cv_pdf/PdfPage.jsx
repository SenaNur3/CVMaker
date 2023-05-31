import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useSelector } from "react-redux";
import { IonPage } from "@ionic/react";
import "./PdfPage.scss";

export default function PdfComponent({ children }: any) {
  const linkToPrint = () => {
    return (
      <IonPage className="create-page">
        <button className="create-btn">Tıkla Kaydet</button>
      </IonPage>
    );
  };
  const componentRef = useRef();
  const cv = useSelector((state) => state?.cv?.userCV);

  return (
    <>
      <ReactToPrint
        trigger={linkToPrint}
        content={() => componentRef.current}
        copyStyles={false}
        pageStyle="@page {   size: 300mm 500mm; }"
       
      />
      <div ref={componentRef}>
        <div id="pdf-content">
          <div
            style={{
              margin: "0 auto",
              padding: "20px",
              height: "auto",
              overflowY: "scroll",
              listStyleType: "none",
            }}
          >
            <header
              style={{
                backgroundColor: "#2d4059",
                color: "#fff",
                textAlign: "center",
                padding: "20px",
                
              }}
            >
              <h1
                style={{
                  fontSize: "28px",
                  marginBottom: "5px",
                }}
              >
                {cv?.name} {cv?.surname}
              </h1>
              <p className="title-m">{cv?.description}</p>
            </header>
            <main>
              <section
                style={{
                  margin: "20px 0",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  padding: "20px"
                }}
              >
                <h2
                  style={{
                    fontSize: "24px",
                    marginBottom: "10px",
                    color: "#2d4059",
                  }}
                >
                  Bilgiler
                </h2>

                <ul className="mb-10">
                  <li>E-Posta : {cv?.email}</li>
                </ul>

                <ul className="mb-10">
                  <li>Adres : {cv?.adres}</li>
                </ul>

                <ul className="mb-10">
                  <li>Sürücü Belgesi : {cv?.driverLicance}</li>
                </ul>

                <ul className="mb-10">
                  <li>
                    Medeni Hali : {cv?.martialStatus === "B" ? "Bekar" : "Evli"}
                  </li>
                </ul>

                <ul className="mb-10">
                  <li>Cinsiyet : {cv?.gender === "E" ? "Erkek" : "Kadın"}</li>
                </ul>

                <ul className="mb-10">
                  <li>Doğum Tarihi : {cv?.birthday}</li>
                </ul>

                {cv?.gender === "E" ? (
                  <ul>
                    <li className="mb-10">
                      Askerlik Durumu : {cv?.armyStatus}
                    </li>
                  </ul>
                ) : null}
              </section>

              <section style={{
                  margin: "20px 0",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  padding: "20px"
                }}>
                <h2
                  style={{
                    fontSize: "24px",
                    marginBottom: "10px",
                    color: "#2d4059",
                  }}
                >
                  Eğitim
                </h2>
                {cv?.educationExperience && JSON.parse(cv?.educationExperience)?.map(
                  (education, index) => (
                    <ul key={index}>
                      <li className="mb-10">
                        Okul: {education?.schoolName} - {education?.city}
                      </li>
                      <li className="mb-10">Derece: {education?.level}</li>
                      <li className="mb-10">
                        Başlama ve Bitiş Tarihi:: {education?.startDate} -{" "}
                        {education?.endDate}
                      </li>
                    </ul>
                  )
                )}
              </section>
              <section style={{
                  margin: "20px 0",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  padding: "20px"
                }}>
                <h2
                  style={{
                    fontSize: "24px",
                    marginBottom: "10px",
                    color: "#2d4059",
                  }}
                >
                  Yetenekler
                </h2>

                {cv?.skills &&  JSON.parse(cv?.skills)?.map((s, index) => (
                  <ul key={index}>
                    <li>
                      {s?.ability} - {s?.level}
                    </li>
                  </ul>
                ))}
              </section>
              <section style={{
                  margin: "20px 0",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  padding: "20px"
                }}>
                <h2
                  style={{
                    fontSize: "24px",
                    marginBottom: "10px",
                    color: "#2d4059",
                  }}
                >
                  İş Deneyimleri
                </h2>

                {cv?.workExperience && JSON.parse(cv?.workExperience)?.map((experice, index) => (
                  <ul key={index}>
                    <li>
                      <strong>{experice?.title}</strong>
                      <p>
                        {experice?.companyName}, {experice?.startDate}{" "}
                        {experice?.endDate}
                      </p>
                      <ul>
                        <li>{experice?.description}</li>
                        <li>{experice?.city}</li>
                      </ul>
                    </li>
                  </ul>
                ))}
              </section>

              <section style={{
                  margin: "20px 0",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  padding: "20px"
                }}>
                <h2
                  style={{
                    fontSize: "24px",
                    marginBottom: "10px",
                    color: "#2d4059",
                  }}
                >
                  Hobiler
                </h2>
                {cv?.interests && JSON.parse(cv?.interests)?.map((hb, index) => (
                  <ul key={index}>
                    <li>{hb?.interest}</li>
                  </ul>
                ))}
              </section>

 
              <section style={{
                  margin: "20px 0",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  padding: "20px"
                }}>
                <h2
                  style={{
                    fontSize: "24px",
                    marginBottom: "10px",
                    color: "#2d4059",
                  }}
                >
                  Referanslar
                </h2>
                {cv?.references && JSON.parse(cv?.references)?.map((ref, index) => (
                  <ul key={index}>
                    <li>
                      {ref?.companyName} - {ref?.title}
                    </li>
                    <li>{ref?.name}</li>
                  </ul>
                ))}
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
