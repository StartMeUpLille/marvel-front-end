import React, { useState, useEffect } from "react";
import ItemGrid from "../components/ItemGrid";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Loader from "react-loader-spinner";
import axios from "axios";
//import charactersData from "../assets/data/characters.json";

const Characters = ({ userFavs, manageFavs }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://marvel-backend-smu.herokuapp.com/characters?&limit=100&offset=${offset}&nameStartsWith=${search}`
        );
        //console.log("response.data.result =>", response.data.results);
        setCharacters(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [offset, search]);

  return isLoading ? (
    <main className="flex-center">
      <div className="container">
        <Loader type="Puff" color="#E62429" height={100} width={100} />
      </div>
    </main>
  ) : (
    <main>
      <div className="container">
        <div className="title-search">
          <h1>Characters</h1>
          <Search
            type="character"
            setSearch={setSearch}
            setIsLoading={setIsLoading}
          />
        </div>

        <ItemGrid
          endpoint={characters.results}
          manageFavs={manageFavs}
          userFavs={userFavs}
        />

        <Pagination
          offset={offset}
          setOffset={setOffset}
          total={characters.total}
          setIsLoading={setIsLoading}
        />
      </div>
    </main>
  );
};

export default Characters;
