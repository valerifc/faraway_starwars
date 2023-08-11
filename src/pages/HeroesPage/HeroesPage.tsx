import React, { useEffect } from "react";
import { fetchHeroes, selectHeroes } from "../../features/heroes/heroesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Box, Stack, Typography } from "@mui/material";

const HeroesPage = () => {
  const dispatch = useAppDispatch();
  const heroes = useAppSelector(selectHeroes);

  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ m: 2 }}>
        Список персонажей
      </Typography>
      <Stack>
        {(heroes?.results || []).map(({ name }, index) => {
          return (
            <Box sx={{ m: 2 }} key={index}>
              <Typography variant="body1">{name}</Typography>
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

export default HeroesPage;
