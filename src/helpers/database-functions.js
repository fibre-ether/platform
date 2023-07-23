import { child, get, ref, set } from "firebase/database";
import { NEIGHBORS, database } from "../config/firebase";
import { defaultNeighbors } from "../config/defaults";

export const getFirstTimeNeighbors = ({setIsfirstTimeDataFetched, setNeighbors}) => {
  const dbRef = ref(database);
  get(child(dbRef, NEIGHBORS))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        console.log(data);
        setNeighbors(data)
        setIsfirstTimeDataFetched(true)
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteAllNeighbors = ({setControls}) => {
    set(ref(database, NEIGHBORS), defaultNeighbors);
    setControls({reset: false})
}
