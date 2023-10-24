import { put, takeLatest } from "redux-saga/effects";
const gems = require("../../../assets/gems.json");
const relics = require("../../../assets/relics.json");
const spells = require("../../../assets/spells.json");

// worker Saga: will be fired on "FETCH_USER" actions
function* redrawMarket(action) {
  console.log("8",action.payload);

  try {
    for (let k = 0; k < 9; k++) {
      const result = yield redraw({
        payload: {
          iterator: k,
          market: action.payload.market,
          selectedSets: action.payload.selectedSets,
        },
      });
      k = result;
      console.log("k", k);
    }
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* redraw(action) {
  console.log("28",action);
  let newMarket = action.payload.market;
  let i = action.payload.iterator;
  let selectedSets = action.payload.selectedSets;
  let repeatedCard = false;
  console.log("top of function", newMarket, i);
  // console.log("selected sets", selectedSets);
  if (i < 3) {
    let filteredGems = gems.filter((gem) =>
      Object.keys(selectedSets)
        .filter((key) => selectedSets[key])
        .includes(gem.set)
    );
    // console.log("filtered gems", filteredGems)
    let random = Math.floor(Math.random() * filteredGems.length);
    let selectedGem = filteredGems[random];
    while (!repeatedCard) {
      random = Math.floor(Math.random() * filteredGems.length);
      selectedGem = filteredGems[random];
      console.log(
        "a gem!",
        newMarket.filter((card) => card.name === selectedGem.name).length > 0,
        selectedGem
      );
      if (
        !(newMarket.filter((card) => card.name === selectedGem.name).length > 0)
      ) {
        repeatedCard = true;
      }
    }
    // console.log("rand", i, random, filteredGems[random]);
    console.log(
      59,i,
      !(newMarket.filter((card) => card.name === selectedGem.name).length > 0),
      !newMarket[0]
    );
    if (
      !(newMarket.filter((card) => card.name === selectedGem.name).length > 0)
    ) {
      if (newMarket[0]) {
        newMarket[i] = selectedGem;
        console.log("add44");
      } else {
        // console.log("parseint", parseInt(selectedGem.cost));
        if (parseInt(selectedGem.cost) <= 4) {
          newMarket[i] = selectedGem;
          // console.log("add49");
          // console.log(newMarket);
        } else {
          i--;
          console.log("miss!", i);
        }
      }
    } else {
      i--;
      console.log("duplicate or wrong set", i);
    }
  }
  console.log("a relic?");
  if (i >= 3 && i < 5) {
    let filteredRelics = relics.filter((relic) =>
      Object.keys(selectedSets)
        .filter((key) => selectedSets[key])
        .includes(relic.set)
    );
    let random = Math.floor(Math.random() * filteredRelics.length);
    let selectedRelic = filteredRelics[random];
    while (!repeatedCard) {
      random = Math.floor(Math.random() * filteredRelics.length);
      selectedRelic = filteredRelics[random];
      console.log(
        "a gem!",
        newMarket.filter((card) => card.name === selectedRelic.name).length > 0,
        selectedRelic
      );
      if (
        !(
          newMarket.filter((card) => card.name === selectedRelic.name).length >
          0
        )
      ) {
        repeatedCard = true;
      }
    }
    // console.log("relic", i, selectedRelic);
    if (
      !(newMarket.filter((card) => card.name === selectedRelic.name).length > 0)
    ) {
      newMarket[i] = selectedRelic;
      // console.log(77, selectedRelic)
    } else {
      i--;
    }
  }
  console.log("a spell?");
  if (i >= 5) {
    let filteredSpells = spells.filter((spell) =>
      Object.keys(selectedSets)
        .filter((key) => selectedSets[key])
        .includes(spell.set)
    );
    let random, selectedSpell;
    // console.log("spell", random, filteredSpells[random], i);
    while (!repeatedCard) {
      random = Math.floor(Math.random() * filteredSpells.length);
      selectedSpell = filteredSpells[random];
      console.log(
        "a spell!",
        newMarket.filter((card) => card.name === selectedSpell.name).length > 0,
        selectedSpell
      );
      if (
        !(
          newMarket.filter((card) => card.name === selectedSpell.name).length >
          0
        )
      ) {
        repeatedCard = true;
      }
    }
    // if (
    //   !(
    //     newMarket.filter((card) => card.name === selectedSpell.name).length >
    //     0
    //   )
    // ) {
    newMarket[i] = selectedSpell;
    console.log(94, selectedSpell, i);
    // } else {
    //   i--;
    // }
  }
  console.log("pre-reordered market", newMarket)
  loggg();
  reorderNewMarket(newMarket);
  console.log("reordered market", newMarket)
  newMarket = newMarket.filter((element) => element !== undefined);
  i = newMarket.length;
  try {
    yield put({ type: "UPDATE_MARKET", payload: newMarket });
  } catch (error) {
    console.log("Market update error", error);
  }

  console.log("i", i);
  let output = i - 1;
  return output;
}

function* loggg() {
  console.log("loggg");
}

function reorderNewMarket(newMarket) {
  console.log("175", newMarket);
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
      // console.log(
      //   "relic parseint",
      //   parseInt(newMarket[j]?.cost),
      //   parseInt(newMarket[j + 1]?.cost)
      // );
      if (parseInt(newMarket[j]?.cost) > parseInt(newMarket[j + 1]?.cost)) {
        const temp = newMarket[j];
        newMarket[j] = newMarket[j + 1];
        newMarket[j + 1] = temp;
        // console.log("updated relic order");
      }
    } else if (j >= 5 && newMarket.length > 6) {
      // console.log(
      //   "spellparseints",
      //   parseInt(newMarket[j]?.cost) > parseInt(newMarket[j + 1]?.cost),
      //   parseInt(newMarket[j]?.cost),
      //   parseInt(newMarket[j + 1]?.cost)
      // );
      if (parseInt(newMarket[j]?.cost) > parseInt(newMarket[j + 1]?.cost)) {
        const temp = newMarket[j];
        newMarket[j] = newMarket[j + 1];
        newMarket[j + 1] = temp;
        // console.log("updated spell order");
        j = 4;
      }
    }
    // console.log("j", j);
  }
  console.log("reordered market", newMarket)
}

function* redrawCardSaga() {
  yield takeLatest("DRAW_MARKET", redrawMarket);
  yield takeLatest("REDRAW_CARD", redraw);
}

export default redrawCardSaga;
