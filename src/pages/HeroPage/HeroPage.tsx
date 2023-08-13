import React, { useEffect } from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import PageTitle from "../../components/PageTitle";
import { Hero } from "../../features/heroes/types";
import { useParams } from "react-router-dom";
import { useBoolean } from "ahooks";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchHero,
  selectHero,
  setHeroesDiff,
  selectHeroesDiff,
} from "../../features/heroes/heroesSlice";
import {
  Stack,
  Button,
  InputLabel,
  FilledInput,
  FormControl,
  FormHelperText,
} from "@mui/material";

const requiredFields: (keyof Hero)[] = ["name"];
const readonlyFields: (keyof Hero)[] = [
  "created",
  "edited",
  "url",
  "homeworld",
  "films",
  "species",
  "vehicles",
  "starships",
];
const datetimeFields: (keyof Hero)[] = ["created", "edited"];

const HeroPage = () => {
  const dispatch = useAppDispatch();
  const heroSelected = useAppSelector(selectHero);
  const heroesDiffSelected = useAppSelector(selectHeroesDiff);
  const { reset, control, handleSubmit } = useForm();
  const [isFetching, { setTrue: fetchingStarted, setFalse: fetchingComleted }] =
    useBoolean();
  const { heroId: heroIdFormQuery } = useParams();
  const heroId = heroIdFormQuery || "0";

  useEffect(() => {
    fetchingStarted();
    dispatch(fetchHero(+heroId)).then(() => fetchingComleted());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reset({ ...heroSelected, ...heroesDiffSelected[heroId] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroSelected, heroesDiffSelected, heroId]);

  const formatValue = (heroKey: keyof Hero, value: Hero[keyof Hero]) => {
    if (value && datetimeFields.includes(heroKey))
      return format(parseISO(value as string), "dd.MM.yyyy HH:mm");
    return value;
  };

  return (
    <>
      <PageTitle>
        <>Hero /:{heroId}</>
      </PageTitle>
      <form
        onSubmit={handleSubmit((values) => {
          const diff = Object.entries(values)?.reduce((acc, [key, value]) => {
            const heroKey = key as keyof Hero;
            return readonlyFields.includes(heroKey) ||
              value === heroSelected[heroKey]
              ? acc
              : { ...acc, [heroKey]: value };
          }, {});
          dispatch(setHeroesDiff([heroId, diff]));
        })}
      >
        <Stack spacing={1} sx={{ maxWidth: 500, mb: 2 }}>
          {Object.entries(heroSelected)?.map(([key, value]) => {
            const heroKey = key as keyof Hero;
            return (
              <Controller
                rules={
                  requiredFields.includes(heroKey)
                    ? {
                        required: "Please enter value.",
                      }
                    : undefined
                }
                key={heroKey}
                defaultValue={value}
                control={control}
                name={heroKey}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { error },
                }) => (
                  <FormControl variant="filled">
                    <InputLabel htmlFor={`component-filled-${name}`}>
                      {name}
                    </InputLabel>
                    <FilledInput
                      id={`component-filled-${name}`}
                      disabled={isFetching || readonlyFields.includes(heroKey)}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={formatValue(heroKey, value)}
                      inputRef={ref}
                    />
                    {error && (
                      <FormHelperText required>
                        Please enter value.
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            );
          })}
        </Stack>
        <Button variant="contained" type="submit" sx={{ mr: 1 }}>
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            reset(heroSelected);
          }}
        >
          Reset
        </Button>
      </form>
    </>
  );
};

export default HeroPage;
