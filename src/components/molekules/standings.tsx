import React, { useEffect, useState } from 'react';
import types, { Team } from '../../types/types'
const SortedListComponent = () => {
  const [data, setData] = useState<Team[]>([]);

  // Example JSON data for testing purposes
  const exampleData = [
    { id: 1, name: 'Item 1', value: 20 },
    { id: 2, name: 'Item 2', value: null },
    { id: 3, name: 'Item 3', value: 35 },
    { id: 4, name: 'Item 4', value: 15 },
    { id: 5, name: 'Item 5', value: null },
    { id: 6, name: 'Item 6', value: 50 },
  ];

  // Fetching data (use the example data until your server is ready)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Uncomment the below code when your server is ready
        // const response = await fetch('https://api.yourserver.com/endpoint');
        // const json = await response.json();

        // For now, use exampleData directly
        const json = exampleData;

        // Sort the data based on value, with null values placed at the end
        const sortedData = json
          .slice() // make a shallow copy to avoid mutating the original array
          .sort((a, b) => {
            if (a.value === null) return 1;
            if (b.value === null) return -1;
            return b.value - a.value;
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
      <h2>Sorted List</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}: {item.value !== null ? item.value : 'TBD'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortedListComponent;
