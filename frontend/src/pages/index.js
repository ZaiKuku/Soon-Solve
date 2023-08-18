// "use client";
// import { SWRConfig } from "swr";
// import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import styles from "../styles/searchPage.module.scss";
import Header from "@/components/Header";
import SearchBar from "@/components/searchBar";
import { useState } from "react";
import { useSelector } from "react-redux";

const locations = {
  NTU: [
    "管一",
    "管二",
    "舟山基隆路口",
    "活大",
    "二活",
    "新體",
    "舊體",
    "博雅",
    "總圖",
  ],
  NCCU: ["大仁樓", "大智樓", "大勇樓"],
};

function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const searchLocations = useSelector(
    (state) => state.selectedLocations.selectedLocations
  );
  const [showSearchResult, setShowSearchResult] = useState(false);
  const handleChange = (e) => {
    const keyword = e.target.value.toLowerCase();
    setKeyword(keyword);
    if (keyword === "") {
      setShowSearchResult(false);
      setFilteredLocations([]);
      return;
    }
    setShowSearchResult(true);
    const allLocations = Object.values(locations).flat();
    const matches = allLocations.filter((location) =>
      location.toLowerCase().includes(keyword)
    );
    setFilteredLocations(matches);
  };
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Destination"
            onChange={handleChange}
          />
          <i className="fa fa-search "></i>
        </div>
        {showSearchResult && (
          <div className={styles.searchResultBox}>
            <ul>
              {filteredLocations.map((location) => (
                <li key={location} className={styles.searchResults}>
                  {location}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
}

export default SearchPage;

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permenant: false,
      },
    };
  }
  return {
    props: {},
  };
}
