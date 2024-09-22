import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Metas } from "@/utils/metas";
import HomePage from "@/components/home";
import { useState, useEffect } from "react";

import { gql } from "@apollo/client";
import client from "@/utils/appoloClient";
import _axios from "@/utils/axios";

const inter = Inter({ subsets: ["latin"] });

const getScores = async (addresses: [string]) => {
  const result = await _axios.post("/scores", {
    space: "apecoin.eth",
    network: "1",
    snapshot: "latest",
    strategies: [
      {
        name: "delegation",
        network: "1",
        params: {
          symbol: "APE (delegated)",
          strategies: [
            {
              name: "erc20-balance-of",
              params: {
                symbol: "APE",
                address: "0x4d224452801aced8b2f0aebe155379bb5d594381",
                decimals: 18,
              },
            },
            {
              name: "erc20-votes",
              params: {
                symbol: "APE (staked)",
                address: "0x0187Ae64E905b4FE7Dd1568a5642fbEf05E96e71",
              },
            },
          ],
        },
      },
    ],
    addresses,
  });

  return result;
};

export default function Home() {
  const [groupedDelegations, setGroupedDelegations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recursive function to fetch delegations starting from timestamp 0
    async function fetchDelegations(
      lastTimestamp = 0,
      collectedDelegations = []
    ) {
      const { data } = await client.query({
        query: gql`
          query GetDelegations($timestamp: Int) {
            delegations(
              where: {
                space_in: ["", "apecoin.eth", "apecoin"]
                timestamp_gte: $timestamp
              }
              first: 1000
              orderBy: "timestamp"
              orderDirection: "asc"
            ) {
              delegate
              delegator
              space
              timestamp
            }
          }
        `,
        variables: {
          timestamp: lastTimestamp,
        },
      });

      const newDelegations = data.delegations;
      const combinedDelegations = [...collectedDelegations, ...newDelegations];

      // If the response contains fewer than 1000 delegations, stop the recursion
      if (newDelegations.length < 1000) {
        // Group the delegations by delegate
        const grouped = combinedDelegations.reduce((acc, delegation) => {
          if (!acc[delegation.delegate]) {
            acc[delegation.delegate] = [];
          }
          acc[delegation.delegate].push(delegation);
          return acc;
        }, {});

        setGroupedDelegations(grouped); // Set the grouped delegations
        const scores = await getScores(grouped);
        console.log(scores);
        setLoading(false); // Data is fully loaded
        return;
      }

      // Recursively fetch the next set of delegations
      const lastFetchedTimestamp =
        newDelegations[newDelegations.length - 1].timestamp;
      fetchDelegations(lastFetchedTimestamp, combinedDelegations);
    }

    // Start fetching delegations from timestamp 0
    fetchDelegations(0);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Delegations for Apecoin.eth</h1>
      {Object.keys(groupedDelegations).map((delegate) => (
        <div key={delegate}>
          <h2>Delegate: {delegate}</h2>
          <ul>
            {groupedDelegations[delegate].map((delegation, index) => (
              <li key={index}>
                <p>
                  <strong>Delegator:</strong> {delegation.delegator}
                </p>
                <p>
                  <strong>Space:</strong> {delegation.space}
                </p>
                <p>
                  <strong>Timestamp:</strong>{" "}
                  {new Date(delegation.timestamp * 1000).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
