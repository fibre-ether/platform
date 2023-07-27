import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { NEIGHBORS, database } from '../config/firebase';
import { setFirebaseNeighbors } from '../helpers/database-functions';

const useFirebase = ({ getFirstTimeNeighbors, setNeighbors, neighbors }) => {
  const [isfirstTimeDataFetched, setIsfirstTimeDataFetched] = useState(false);

  useEffect(() => {
    getFirstTimeNeighbors({ setIsfirstTimeDataFetched, setNeighbors });
    const neighborsRef = ref(database, NEIGHBORS);
    return onValue(neighborsRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      setNeighbors(data);
    });
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    if (isfirstTimeDataFetched) {
      setFirebaseNeighbors(neighbors)
      console.log('setting neighbors');
    }
  }, [neighbors, isfirstTimeDataFetched]);
};

export default useFirebase;
