import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ModalAttention from "../../components/modals/Attention/Attention";
import { webRoutes } from "../../constants/webRoutes";
import { useBoolean } from "ahooks";
import { openModalAttention } from "../../features/modals/modalsSlice";
import { fetchHeroes, selectHeroes } from "../../features/heroes/heroesSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Skeleton,
  InputBase,
  IconButton,
  Typography,
  TablePagination,
} from "@mui/material";
import PageTitle from "../../components/PageTitle";

const HeroesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const heroes = useAppSelector(selectHeroes);
  const [searchText, setSearchText] = useState("");
  const [isFetching, { setTrue: fetchingStarted, setFalse: fetchingComleted }] =
    useBoolean();

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const queryPage = +(page || 1);
  const muiPage = queryPage - 1;
  const search = searchParams.get("search");

  useEffect(() => {
    if (!page) {
      navigate(`/${webRoutes.heroes}?page=1`);
      return;
    }
    setSearchText(search || "");
    fetchingStarted();
    dispatch(fetchHeroes({ page: queryPage, search })).then(() =>
      fetchingComleted()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleChangePage = (newPage: number) => {
    if (searchText && searchText !== search)
      dispatch(
        openModalAttention({
          context:
            "Search Hero text will be lost. To avoid this, click on the button next to the Search Hero text.",
        })
      );
    else
      navigate(
        `/${webRoutes.heroes}?page=${newPage + 1}${
          search ? `&search=${search}` : ""
        }`
      );
  };

  return (
    <>
      <ModalAttention />
      <PageTitle>Character List</PageTitle>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 325,
          mb: 2,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Your Hero"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() =>
            navigate(`/${webRoutes.heroes}?page=1&search=${searchText}`)
          }
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {isFetching ? (
        <>
          {Array.from({ length: 10 }).map((item, index) => (
            <Skeleton key={index} sx={{ width: 334, height: 60 }} />
          ))}
        </>
      ) : (
        <Stack>
          {(heroes?.results || []).map(
            ({ name, gender, height, mass, url }, index) => {
              return (
                <Box sx={{ mt: 1, mb: 1 }} key={index}>
                  <Typography
                    variant="h6"
                    sx={{ mb: -1, cursor: "pointer" }}
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
      )}
      {heroes?.count > 10 && (
        <Grid container justifyContent="start" sx={{ mt: 4 }}>
          <Grid item>
            <TablePagination
              component="div"
              backIconButtonProps={{ disabled: isFetching || muiPage < 1 }}
              nextIconButtonProps={{
                disabled: isFetching || !heroes?.next,
              }}
              showFirstButton={true}
              showLastButton={true}
              sx={{
                // custom disabling of all buttons; because there are no 'backFirstIconButtonProps', 'backLastIconButtonProps'
                "& .MuiButtonBase-root": {
                  pointerEvents: isFetching ? "none" : "initial",
                  cursor: isFetching ? "default" : "pointer",
                  opacity: isFetching ? "0.26" : "inherit",
                },
              }}
              page={muiPage}
              count={heroes.count}
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
