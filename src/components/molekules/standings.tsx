import React, { useEffect, useState } from 'react';
import { Team } from '../../types/types'; // Ensure this type matches your data
import { BASE_URL } from '../../config';
import styles from '../../styles/Standings.module.css'; // Import CSS module

const SortedListComponent = () => {
  const [data, setData] = useState<Team[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/teams`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const json = await response.json();
        const teams = json.$values;

        const sortedData = teams
          .slice()
          .sort((a: Team, b: Team) => {
            if (a.points === null) return 1;
            if (b.points === null) return -1;
            return b.points - a.points;
          });

        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Standings</h2>
      <ul className={styles.list}>
        {data.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <span className={styles.teamName}>{item.name}</span>
            <span className={styles.points}>{item.points !== null ? item.points : 'TBD'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortedListComponent;
