import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchHero, selectHero } from "../../features/heroes/heroesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Box, Stack, Typography } from "@mui/material";

const HeroPage = () => {
  const dispatch = useAppDispatch();
  const { heroId } = useParams();
  const hero = useAppSelector(selectHero);

  useEffect(() => {
    dispatch(fetchHero(+(heroId || 0)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        Hero /:{heroId}
      </Typography>
      <Stack>
        {Object.entries(hero)?.map(([key, value], index) => {
          return (
            <Box sx={{ mt: 2, mb: 2 }} key={index}>
              <Typography variant="body1">
                {key}: {value}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

export default HeroPage;
