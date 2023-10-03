import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ImageMap from "./ImageMap";
const gems = require("../../../assets/gems.json");
const relics = require("../../../assets/relics.json");
const spells = require("../../../assets/spells.json");
import { useDispatch, useSelector } from "react-redux";

export default function RandomMarket() {
  let dispatch = useDispatch();
  let minMax = [4, 5];
  const market = useSelector((store) => store.market);
  const newMarket = [
    // { name: "Arcane Relay", uri: require("../../assets/images/Arcane_Relay.jpg") },
    // { name: "Blast Sphere", uri: require("../../assets/images/Blast_Sphere.jpg") },
    // { name: "Bottled_Sun", uri: require("../../assets/images/Bottled_Sun.jpg") },
    // { name: "Bouncing_Boom", uri: require("../../assets/images/Bouncing_Boom.jpg") },
    // { name: "Breach_Extractor", uri: require("../../assets/images/Breach_Extractor.jpg") },
    // { name: "Breach_Seeker", uri: require("../../assets/images/Breach_Seeker.jpg") },
    // { name: "Cache_Glass", uri: require("../../assets/images/Cache_Glass.jpg") },
    // { name: "Caged_Fire", uri: require("../../assets/images/Caged_Fire.jpg") },
    // { name: "Carnivorous_Roox", uri: require("../../assets/images/Carnivorous_Roox.jpg") },
  ];
  useEffect(() => {
    initialDraw();
  }, []);

  const initialDraw = () => {
    for (let i = 0; i < 9; i++) {
      i = redraw(i);
      // console.log(newMarket);
    }
  };

  const redraw = (i) => {
    // console.log("i", i);
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
      if (newMarket[i - 1].name !== relics[random].name) {
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
    dispatch({ type: "SET_MARKET", payload: newMarket });
    return i;
  };

  const reorderNewMarket = (newMarket) => {
    console.log(newMarket);
    for (let i = 0; i < newMarket.length; i++) {
      if (i < 2 && newMarket.length > 1) {
        console.log(
          "gem parseint",
          i,
          parseInt(newMarket[i]?.cost),
          parseInt(newMarket[i + 1]?.cost)
        );
        if (parseInt(newMarket[i]?.cost) > parseInt(newMarket[i + 1]?.cost)) {
          const temp = newMarket[i];
          newMarket[i] = newMarket[i + 1];
          newMarket[i + 1] = temp;
          console.log("updated gem order");
          i = -1;
        }
      } else if (i === 3 && newMarket.length > 4) {
        console.log(
          "relic parseint",
          parseInt(newMarket[i]?.cost),
          parseInt(newMarket[i + 1]?.cost)
        );
        if (parseInt(newMarket[i]?.cost) > parseInt(newMarket[i + 1]?.cost)) {
          const temp = newMarket[i];
          newMarket[i] = newMarket[i + 1];
          newMarket[i + 1] = temp;
          console.log("updated relic order");
        }
      } else if (i >= 5 && newMarket.length > 6) {
        console.log(
          "spellparseints",
          parseInt(newMarket[i]?.cost) > parseInt(newMarket[i + 1]?.cost),
          parseInt(newMarket[i]?.cost),
          parseInt(newMarket[i + 1]?.cost)
        );
        if (parseInt(newMarket[i]?.cost) > parseInt(newMarket[i + 1]?.cost)) {
          const temp = newMarket[i];
          newMarket[i] = newMarket[i + 1];
          newMarket[i + 1] = temp;
          console.log("updated spell order");
          i = 4;
        }
      }
    }
  };

  return <ImageMap redraw={redraw} />;
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
