import axios from "axios";
import React, { useEffect, useState } from "react";

const HeroesPage = () => {
  const [heroes, setHeroes] = useState<any>([]);
  useEffect(() => {
    axios.get("https://swapi.dev/api/people").then((res: any) => {
      console.log(res);
      setHeroes(res?.data?.results || []);
    });
  }, []);
  return (
    <>
      <h1>
        Главная страница, где нужно отобразить список или карточки персонажей
      </h1>
      {heroes?.map((hero: any) => {
        const { name } = hero;
        return (
          <>
            <h5>{name}</h5>
            <br />
          </>
        );
      })}
    </>
  );
};

export default HeroesPage;
