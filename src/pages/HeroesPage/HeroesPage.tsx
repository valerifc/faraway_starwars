import React, { useEffect } from "react";
import { webRoutes } from "../../constants/webRoutes";
import { fetchHeroes, selectHeroes } from "../../features/heroes/heroesSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Box, Grid, Stack, Typography, TablePagination } from "@mui/material";

const HeroesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const heroes = useAppSelector(selectHeroes);

  const page = searchParams.get("page");

  useEffect(() => {
    if (!page) {
      navigate(`/${webRoutes.heroes}?page=1`);
      return;
    }
    dispatch(fetchHeroes(+(page || 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChangePage = (newPage: number) => {
    navigate(`/${webRoutes.heroes}?page=${newPage + 1}`);
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mt: 2,
          mb: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
        }}
      >
        Character List
      </Typography>
      <Stack>
        {(heroes?.results || []).map(
          ({ name, gender, height, mass, url }, index) => {
            return (
              <Box sx={{ mt: 1, mb: 1 }} key={index}>
                <Typography
                  variant="h6"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/${webRoutes.hero}/${url.split("/")[5]}`);
                  }}
                >
                  {name}
                </Typography>
                <Typography variant="caption">
                  {gender}
                  {mass === "unknown" ? "" : ` • ${mass} kg`}
                  {height === "unknown" ? "" : ` • ${height} cm`}
                </Typography>
              </Box>
            );
          }
        )}
      </Stack>
      {heroes?.count > 10 && (
        <Grid container justifyContent="start" sx={{ mt: 4 }}>
          <Grid item>
            <TablePagination
              component="div"
              count={heroes.count}
              page={+(page || 1) - 1}
              nextIconButtonProps={{ disabled: !heroes?.next }}
              onPageChange={(_event, newPage) => handleChangePage(newPage)}
              rowsPerPage={10}
              rowsPerPageOptions={[]}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default HeroesPage;
