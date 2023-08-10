import React from "react";
import { useParams } from "react-router-dom";

const HeroPage = () => {
  const { id: heroId } = useParams();
  return (
    <h1>Cтраница с подробной информацией по выбранному персонажу /:{heroId}</h1>
  );
};

export default HeroPage;
