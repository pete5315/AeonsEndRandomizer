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
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  let newMarket = [];
  useEffect(() => {
    initialDraw();
  }, []);

  const initialDraw = async () => {
    try {

      for (let i = 0; i < 9; i++) {
        redraw(i);
        console.log(20, i);
      }
    } catch {
      console.log("error in initial draw")
    } finally {
      setIsLoading(false);
    }

  };

  const redraw = async (i) => {
    newMarket=market;
    console.log("i", i);
    if (i < 3) {
      let random = Math.floor(Math.random() * gems.length);
      console.log("rand", i, random, gems[random]);
      // console.log("gem", i, random, gems[random]);
      console.log(
        newMarket[0],
        newMarket[i - 1]?.name !== gems[random].name,
        newMarket[i - 2]?.name !== gems[random].name
      );
      if (
        newMarket[i - 1]?.name !== gems[random].name &&
        newMarket[i - 2]?.name !== gems[random].name
      ) {
        if (newMarket[0]) {
          newMarket[i] = gems[random];
          console.log("add44");
        } else {
          // console.log("parseint", parseInt(gems[random].cost));
          if (parseInt(gems[random].cost) <= 4) {
            newMarket[i] = gems[random];
            console.log("add49");
          } else {
            console.log("miss!");
            i--;
          }
        }
      } else {
        console.log("duplicate");
        i--;
      }
    }
    if (i >= 3 && i < 5) {
      let random = Math.floor(Math.random() * relics.length);
      // console.log("relic", i, relics[random]);
      if (newMarket[i - 1]?.name !== relics[random]?.name) {
        newMarket[i] = relics[random];
      }
    }
    if (i >= 5 && i < 9) {
      let random = Math.floor(Math.random() * spells.length);
      console.log("spell", random, spells[random], i);
      if (
        newMarket[i - 1]?.name !== spells[random].name &&
        newMarket[i - 2]?.name !== spells[random]?.name &&
        newMarket[i - 3]?.name !== spells[random]?.name
      ) {
        newMarket[i] = spells[random];
      }
    }
    reorderNewMarket(newMarket);
    dispatch({ type: "UPDATE_MARKET", payload: newMarket });
    console.log("i", i) ;
    let output = i
    return output;
  };

  const reorderNewMarket = (newMarket) => {
    console.log(newMarket);
    for (let j = 0; j < newMarket.length; j++) {
      if (j < 2 && newMarket.length > 1) {
        console.log(
          "gem parseint",
          j,
          parseInt(newMarket[j]?.cost),
          parseInt(newMarket[j + 1]?.cost)
        );
        if (parseInt(newMarket[j]?.cost) > parseInt(newMarket[j + 1]?.cost)) {
          const temp = newMarket[j];
          newMarket[j] = newMarket[j + 1];
          newMarket[j + 1] = temp;
          console.log("updated gem order");
          j = -1;
        }
      } else if (j === 3 && newMarket.length > 4) {
        console.log(
          "relic parseint",
          parseInt(newMarket[j]?.cost),
          parseInt(newMarket[j + 1]?.cost)
        );
        if (parseInt(newMarket[j]?.cost) > parseInt(newMarket[j + 1]?.cost)) {
          const temp = newMarket[j];
          newMarket[j] = newMarket[j + 1];
          newMarket[j + 1] = temp;
          console.log("updated relic order");
        }
      } else if (j >= 5 && newMarket.length > 6) {
        console.log(
          "spellparseints",
          parseInt(newMarket[j]?.cost) > parseInt(newMarket[j + 1]?.cost),
          parseInt(newMarket[j]?.cost),
          parseInt(newMarket[j + 1]?.cost)
        );
        if (parseInt(newMarket[j]?.cost) > parseInt(newMarket[j + 1]?.cost)) {
          const temp = newMarket[j];
          newMarket[j] = newMarket[j + 1];
          newMarket[j + 1] = temp;
          console.log("updated spell order");
          j = 4;
        }
      }
      console.log("j", j);
    }
    console.log("reordered market", newMarket)
  };

  return ({isLoading} && <ImageMap redraw={redraw} />);
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
