import React, { useEffect } from "react";
import { webRoutes } from "../../constants/webRoutes";
import { useNavigate } from "react-router-dom";
import { fetchHeroes, selectHeroes } from "../../features/heroes/heroesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Box, Stack, Typography } from "@mui/material";

const HeroesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const heroes = useAppSelector(selectHeroes);

  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <div className="StarWars">TEST</div> */}
      <Typography variant="h4" sx={{ m: 2 }} className="StarWars">
        Список персонажей
      </Typography>
      <Stack>
        {(heroes?.results || []).map(({ name, url }, index) => {
          return (
            <Box sx={{ m: 2 }} key={index}>
              <Typography
                variant="body1"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/${webRoutes.heroes}/${url.split("/")[5]}`); // TODO: via regex
                }}
              >
                {name}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

export default HeroesPage;
