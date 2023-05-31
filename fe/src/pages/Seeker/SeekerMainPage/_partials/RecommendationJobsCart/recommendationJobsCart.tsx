import { IonImg, IonIcon, IonNavLink, IonRouterLink } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { searchOutline } from "ionicons/icons";

import "./recommendationJobsCart.scss";
import { useSelector } from "react-redux";

const RecommendationJobsCart: React.FC = () => {
  let serviceStates: any = useSelector((state: any) => state?.cv?.userCV);

  const serviceGet = serviceStates?.workExperience && JSON.parse(serviceStates?.workExperience)


  const titleJOB = serviceGet?.[0]?.title;
  const [searchResult, setSearchResult] = useState<any>([]);

  const getGoogleService = async () => {
    try {
      const apiKey = "AIzaSyBCLonDl1kDNnqa9G-k9Bz2FoeYBDSb1p8";
      const cx = "25e8857fdd6e24088";
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(
          titleJOB
        )}`
      );
      const data = await response.json();
      const res = data?.items;
      console.log(res)
      setSearchResult(res);
    } catch (error) {
      console.error("Error occurred while searching:", error);
    }
  };

  useEffect(() => {
    serviceStates && getGoogleService();
  }, [serviceStates]);


  return (
    <div className="RecommendationJobsCart">
      <div className="recommendation-title">Öneriler</div>
      <div className="container">
        {searchResult && searchResult?.map((job : any, index : any) => (
          <div className="recomendation-list" key={index}>
            <div className="company-logo">
              <IonImg class="img" src={`https://www.google.com/s2/favicons?sz=64&domain=${job.link}`} />
            </div>
            <div className="inside">
              <div className="company">{job?.name}</div>
              <div className="title">{job?.title}</div>
              <div className="published">{job?.published}</div>
            </div>
            <IonRouterLink class="btn" href={job?.link}><IonIcon icon={searchOutline}></IonIcon></IonRouterLink>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationJobsCart;
