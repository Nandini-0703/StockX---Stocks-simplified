import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import useLoading from "../hooks/loading-hook";
import CircularWithValueLabel from "../SmallLoader";
import "../NewsCard/NewsCards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const NewsCards = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [entity, setEntity] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoad, unsetLoad] = useLoading(true);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [sentimentscore, setSentimentscore] = useState({});

  useEffect(() => {
    axios
      .get("https://stockx-simplified.onrender.com/all")
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleAnalyze = (news, index) => {
    setLoad();
    setClickedIndex(index);
    var newsData = {
      title: news.title,
      description: news.description,
      url: news.url,
      image: news.urlToImage,
      content: news.content,
    };
    axios
      .post("https://stockx-simplified.onrender.com/analyze", newsData)
      .then(function (res) {
        console.log(res.data);

        setEntity(res.data.companyArr);
        setSentimentscore(res.data.sentiment);
        setClicked(true);
        unsetLoad();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <form className="d-flex newssearch">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div className="outgrid">
        <div className="newsgrid">
          {news
            .filter(
              (item) =>
                (item.description &&
                  item.description
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase())) ||
                (item.title &&
                  item.title.toLowerCase().includes(search.toLocaleLowerCase()))
            )
            .map((news, index) => (
              <div key={index} className="newsinfocard">
                <Link to={news.url}>
                  <img
                    className="newsimage"
                    src={
                      news.urlToImage
                        ? news.urlToImage
                        : "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    }
                    alt="news"
                  />
                </Link>
                <div className="card-content">
                  <h5 className="title">{news.title}</h5>
                  <p className="description">{news.description}</p>
                </div>
                <div className="card-actions">
                  <button
                    className="analysenews"
                    onClick={() => handleAnalyze(news, index)}
                  >
                    Analyse
                  </button>
                  {clickedIndex === index && (
                    <>
                      {loading ? (
                        <>
                          <CircularWithValueLabel />
                          <p>This might take some while...</p>
                        </>
                      ) : entity.length === 0 && clicked ? (
                        <p>
                          This news does not affect any company's stock in NSE
                          or BSE.
                        </p>
                      ) : (
                        entity.map((entities) => (
                          <div
                            key={entities["Company Name"]}
                            className="displaycompany"
                          >
                            {entities["Company Name"]}{" "}
                            {sentimentscore.score >= 0 ? (
                              <FontAwesomeIcon
                                icon={faArrowUp}
                                style={{
                                  color: "green",
                                  paddingLeft: "15px",
                                }}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faArrowDown}
                                style={{
                                  color: "red",
                                  paddingLeft: "15px",
                                }}
                              />
                            )}
                          </div>
                        ))
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default NewsCards;
