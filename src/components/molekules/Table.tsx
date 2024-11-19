import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';
import styles from '../../styles/table.module.css'; // Import CSS module

function MatchesTable() {
  const [matchTable, setMatchTable] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchTable = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/Teams/table`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        const table = data.$values.map((item: any) => item.$values);
        setMatchTable(table);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchTable();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Matches Table</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            {matchTable[0]?.map((header, index) => (
              <th key={index} className={styles.header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matchTable.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.row}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.cell}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MatchesTable;
