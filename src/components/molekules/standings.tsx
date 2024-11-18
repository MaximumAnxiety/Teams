import React, { useEffect, useState } from 'react';
import { Team } from '../../types/types'; // Adjusted import as it appears `types` isn't used
import { BASE_URL } from '../../config';

const SortedListComponent = () => {
  const [data, setData] = useState<Team[]>([]);

  // Fetching data (use the example data until your server is ready)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/teams`); // Fixed string interpolation
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`); // Added error handling for HTTP response
        }

        const json: Team[] = await response.json();

        // Sort the data based on value, with null values placed at the end
        const sortedData = json
          .slice() // Make a shallow copy to avoid mutating the original array
          .sort((a, b) => {
            if (a.points === null) return 1; // Move `a` down if its value is null
            if (b.points === null) return -1; // Move `b` down if its value is null
            return b.points - a.points; // Sort in descending order
          });

        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {JSON.stringify(data)}
      <h2>Sorted List</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}: {item.points !== null ? item.points : 'TBD'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortedListComponent;
