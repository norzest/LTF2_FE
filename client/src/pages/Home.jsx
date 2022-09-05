/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import * as Styles from "../styles/homeStyle";
import PhoneList from "../components/PhoneList";
import Filter from "../components/Filter";
import { PageContainer } from "../components/PageContainer";
import PlanModal from "../components/PlanModal";
import { filtering } from "../util/filtering";
import sortPhoneList from "../util/sortPhoneList";
import NoResult from "../components/NoResult";

export default function Home({
  phones,
  plans,
  modalShow,
  setModalShow,
  saveCart,
  propsList,
}) {
  const navigate = useNavigate();
  const goToNotFound = () => navigate("/notfound");

  const { tech } = useParams();

  const [isDefault, setIsDefault] = useState(true);
  const [filterOpt, setFilterOpt] = useState({ planId: 1, disCountType: -1 });
  const [sortId, setSortId] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [phoneArr, setPhoneArr] = useState([]);
  const [defaultValue, setDefaultValue] = useState("전체");
  const [filteredList, setFilteredList] = useState([]);

  const handleFilterOpt = (key, value) =>
    setFilterOpt({ ...filterOpt, [key]: value });

  const techArr = ["5G", "LTE"];

  const notFoundCondition = techArr.indexOf(tech) === -1;

  const handleModal = () =>
    setModalShow((prev) => ({ ...prev, plan: !prev.plan }));

  const phoneList = phones.filter((row) => row.telecomTech === tech);
  const planList = plans.filter((row) => row.telecomTech === tech);

  useEffect(() => {
    if (notFoundCondition) {
      goToNotFound();
    } else {
      handleFilterOpt("planId", tech === "5G" ? 1 : 17);
      setPhoneArr(phoneList);
    }
  }, [phones]);

  ////////////////////////////////////////////////

  const [filter, setFilter] = useState({
    plan: "전체",
    disCountType: "전체",
    manufacturingCompany: "전체",
    storage: "전체",
    memory: "전체",
  });

  const callback = (key, data) => {
    const { id, value } = data;
    switch (key) {
      case "plan":
        setFilterOpt(() => ({ ...filterOpt, planId: id }));
        setDefaultValue(value);
        break;
      case "disCountType":
        setFilterOpt(() => ({ ...filterOpt, disCountType: Number(id) }));
        break;
      default:
        break;
    }
  };

  const handleChange = (e, phones) => {
    const { name, value } = e.target;
    setFilter(phones);
    setFilter(() => ({
      ...filter,
      [name]: value,
    }));

    switch (name) {
      case "plan":
        callback("plan", e.target);
        break;
      case "disCountType":
        callback("disCountType", e.target);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const id = tech === "5G" ? 1 : 17;
    setFilterOpt(() => ({ ...filterOpt, planId: id }));
    sortPhoneList(
      sortBy,
      phoneList,
      filterOpt.planId,
      filterOpt.disCountType,
      filterOpt.disCountType,
      setSortId
    );
    setDefaultValue("전체");
    setIsDefault(true);
  }, [tech, sortBy]);

  useEffect(() => {
    const filteredList = filtering(filter, phoneArr);
    setFilteredList(filteredList);
  }, [filter]);

  useEffect(() => {
    const sortArr = () => {
      let returnArr = [];
      sortId.forEach((row) =>
        returnArr.push(phoneList.find((obj) => obj.phoneId === row))
      );
      return returnArr;
    };

    setPhoneArr(sortArr());
    const filteredList = filtering(filter, sortArr());
    setFilteredList(filteredList);
  }, [sortId]);

  return (
    <PageContainer>
      <PlanModal
        tech={tech}
        modalShow={modalShow}
        setModalShow={setModalShow}
        nowPlanId={filterOpt.planId}
        handleFilterOpt={handleFilterOpt}
        setDefaultValue={setDefaultValue}
        plans={planList}
      />
      <Styles.TotalLayout>
        <Styles.FilterTitle>{tech} 휴대폰</Styles.FilterTitle>
        <Grid container spacing={4}>
          <Grid item md={2}>
            <Filter
              filter={filter}
              handleModal={handleModal}
              phones={phoneArr}
              defaultValue={defaultValue}
              tech={tech}
              handleChange={handleChange}
              setIsDefault={setIsDefault}
            />
          </Grid>
          <Grid item md={10}>
            {isDefault || filteredList.length !== 0 ? (
              <PhoneList
                phones={filteredList.length === 0 ? phoneArr : filteredList}
                modalShow={modalShow}
                saveCart={saveCart}
                propsList={propsList}
                filterOpt={filterOpt}
                planList={planList}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            ) : (
              <NoResult
                setDefaultValue={setDefaultValue}
                setFilter={setFilter}
                setFilterOpt={setFilterOpt}
                tech={tech}
              />
            )}
          </Grid>
        </Grid>
      </Styles.TotalLayout>
    </PageContainer>
  );
}
