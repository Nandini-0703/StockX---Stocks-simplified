import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import useLoading from "../hooks/loading-hook";
import CircularWithValueLabel from "../SmallLoader";
import "../NewsCard/NewsCards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
    margin: theme.spacing(2),
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
}));

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
      .get("http://localhost:5555/all")
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
      .post("http://localhost:5555/analyze", newsData)
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

  const classes = useStyles();

  return (
    <>
      <form class="d-flex" className="newssearch">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button class="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div className="outgrid">
        <Grid className="newsgrid" container spacing={2}>
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
              <Grid item key={Card.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  className="newsinfocard"
                  sx={{ maxWidth: 345 }}
                  key={news.id}
                >
                  <CardActionArea>
                    <Link to={news.url}>
                      {" "}
                      <CardMedia
                        className="newsimage"
                        component="img"
                        height="150px"
                        image={
                          news.urlToImage
                            ? news.urlToImage
                            : "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        }
                        alt="green iguana"
                        src={news.url}
                      ></CardMedia>
                    </Link>

                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {news.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {news.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      className="analysenews"
                      onClick={() => handleAnalyze(news, index)}
                    >
                      Analyse
                    </Button>
                    {clickedIndex === index ? (
                      loading ? (
                        <>
                          {" "}
                          <CircularWithValueLabel />{" "}
                          <p>This might take some while...</p>
                        </>
                      ) : entity.length === 0 && clicked ? (
                        <p>
                          This news does not effect any company's stock in NSE
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
                                style={{ color: "green", paddingLeft: "15px" }}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faArrowDown}
                                style={{ color: "red", paddingLeft: "15px" }}
                              />
                            )}
                          </div>
                        ))
                      )
                    ) : (
                      " "
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
};

export default NewsCards;
