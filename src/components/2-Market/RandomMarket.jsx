import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ImageMap from "./ImageMap";
const gems = require("../../../assets/gems.json");
const relics = require("../../../assets/relics.json");
const spells = require("../../../assets/spells.json");
import { useDispatch, useSelector } from "react-redux";

export default function RandomMarket() {
  let dispatch = useDispatch();
  const market = useSelector((store) => store.market);
  const selectedSets = useSelector((store) => store.sets);
  const isLoading = useSelector((store) => store.marketIsLoading);

  let newMarket = [];

  useEffect(() => {
    console.log("random market use effect");
    if (market.length < 9) {
      dispatch({ type: "SET_MARKET_IS_LOADING" });
      initialDraw();
    } else {
      dispatch({ type: "RESET_MARKET_IS_LOADING" });
      console.log("Market is already loaded");
    }
  }, []);

  const initialDraw = async () => {
    try {
      dispatch({
        type: "DRAW_MARKET",
        payload: {
          market,
          selectedSets,
        },
      });
    } catch (err) {
      console.log("error in initial draw", err);
    } finally {
      dispatch({ type: "RESET_MARKET_IS_LOADING" });
    }
  };

  return { isLoading } && <ImageMap isLoading={isLoading} />;
}

const styles = StyleSheet.create({
  container: {},
  image: {
    // flex: 1,
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});
