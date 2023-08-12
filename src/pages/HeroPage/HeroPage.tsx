import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { fetchHero, selectHero } from "../../features/heroes/heroesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Box, Stack, Typography } from "@mui/material";
import PageTitle from "../../components/PageTitle";

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
      <PageTitle>
        <>Hero /:{heroId}</>
      </PageTitle>
      <Stack>
        {Object.entries(hero)?.map(([key, value], index) => {
          return (
            <Box sx={{ mt: 2, mb: 2 }} key={index}>
              <Typography variant="body1">
                {key}:{" "}
                {(key === "created" || key === "edited") && value
                  ? format(parseISO(value as string), "dd.MM.yyyy HH:mm")
                  : value}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

export default HeroPage;
