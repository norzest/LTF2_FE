import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import * as Styles from "../styles/homeStyle";
import PhoneList from "../components/PhoneList";
import Filter from "../components/Filter";
import { PageContainer } from "../components/PageContainer";
import { useState } from "react";
import { filtering } from "../util/filtering";
import useFilter from "../util/useFilter";

export default function Home({ phones, modalShow, saveCart, propsList }) {
  const [filter, setFilter] = useState({
    plan: "전체",
    disCountType: "전체",
    manufacturingCompany: "전체",
    storage: "전체",
    memory: "전체",
  });

  const { handleChange, state, list } = useFilter({
    initState: filter,
    filterModule: filtering,
  });

  return (
    <PageContainer>
      <Styles.TotalLayout>
        <Styles.FilterTitle>5G 휴대폰</Styles.FilterTitle>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <Filter phones={phones} handleChange={handleChange} />
          </Grid>
          <Grid item md={9}>
            <PhoneList
              phones={list.length === 0 ? phones : list}
              modalShow={modalShow}
              saveCart={saveCart}
              propsList={propsList}
            />
          </Grid>
        </Grid>
      </Styles.TotalLayout>
    </PageContainer>
  );
}
