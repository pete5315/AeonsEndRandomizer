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
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  let newMarket = [];
  useEffect(() => {
    initialDraw();
  }, []);

  const initialDraw = async () => {
    try {

      for (let i = 0; i < 9; i++) {
          await redraw(i);
          console.log(20, i, newMarket);
      }
    } catch(err) {
      console.log("error in initial draw", err)
    } finally {
      setIsLoading(false);
    }

  };

  const redraw = async (i) => {
    newMarket=market;
    // console.log("selected sets", selectedSets);
    if (i < 3) {
      let filteredGems = gems.filter((gem) => Object.keys(selectedSets).filter((key) => selectedSets[key]).includes(gem.set));
      console.log("filtered gems", filteredGems)
      let random = Math.floor(Math.random() * filteredGems.length);
      let selectedGem = filteredGems[random];
      console.log("rand", i, random, filteredGems[random]);
      console.log("gem", i, random, gems[random]);
      console.log( 42,
        newMarket[0],
        newMarket[i - 1]?.name !== selectedGem.name,
        newMarket[i - 2]?.name !== selectedGem.name, 
        selectedSets[selectedGem.set]
      );
      if (
        newMarket[i - 1]?.name !== selectedGem.name &&
        newMarket[i - 2]?.name !== selectedGem.name
      ) {
        if (newMarket[0]) {
          newMarket[i] = selectedGem;
          console.log("add44");
        } else {
          // console.log("parseint", parseInt(selectedGem.cost));
          if (parseInt(selectedGem.cost) <= 4) {
            newMarket[i] = selectedGem;
            console.log("add49");
          } else {
            console.log("miss!");
            i--;
          }
        }
      } else {
        console.log("duplicate or wrong set", i);
        i--;
      }
    }
    if (i >= 3 && i < 5) {
      let filteredRelics = relics.filter((relic) => Object.keys(selectedSets).filter((key) => selectedSets[key]).includes(relic.set));
      let random = Math.floor(Math.random() * filteredRelics.length);
      let selectedRelic = filteredRelics[random]
      // console.log("relic", i, selectedRelic);
      if (newMarket[i - 1]?.name !== selectedRelic?.name) {
        newMarket[i] = selectedRelic;
      }
    }
    if (i >= 5 && i < 9) {
      let filteredSpells = spells.filter((spell) => Object.keys(selectedSets).filter((key) => selectedSets[key]).includes(spell.set));
      let random = Math.floor(Math.random() * filteredSpells.length);
      let selectedSpell = filteredSpells[random]
      console.log("spell", random, spells[random], i);
      if (
        newMarket[i - 1]?.name !== selectedSpell.name &&
        newMarket[i - 2]?.name !== selectedSpell?.name &&
        newMarket[i - 3]?.name !== selectedSpell?.name
      ) {
        newMarket[i] = selectedSpell;
      }
    }
    reorderNewMarket(newMarket);
    newMarket = newMarket.filter((element) => element !== undefined);
    i = newMarket.length;
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
          parseInt(newMarket[j]?.cxost),
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
    // console.log("reordered market", newMarket)
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
