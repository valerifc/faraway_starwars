import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HeroPage = () => {
  const [hero, setHero] = useState<any>({});
  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/${heroId}`).then((res: any) => {
      console.log(res);
      setHero(res?.data || []);
    });
  }, []);
  const { id: heroId } = useParams();
  return (
    <>
      <h1>
        Cтраница с подробной информацией по выбранному персонажу /:{heroId}
      </h1>
      <>
        {Object.entries(hero)?.map((pair: any) => {
          const [key, value] = pair;
          return (
            <p>
              {key}: {value}
            </p>
          );
        })}
      </>
    </>
  );
};

export default HeroPage;
