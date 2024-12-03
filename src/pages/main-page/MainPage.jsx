import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import React, { useEffect } from "react";
import { Grid } from "@consta/uikit/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setNews } from "../../store";

const MainPage = () => {
  const dispatch = useDispatch();
  const mainNews = useSelector((state) => state.mainNews);

  useEffect(() => {
    fetch("https://673423afa042ab85d1190055.mockapi.io/api/v1/main", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => dispatch(setNews(data)))
      .catch((error) => console.error("Error fetching news:", error));
  }, [dispatch]);

  return (
    <Grid cols={3} gap="2rem" style={styles.grid}>
      {mainNews.map((publication) => (
        <Card
          key={publication.id}
          verticalSpace="l"
          horizontalSpace="l"
          shadow
          style={styles.card}
        >
          <Text weight="bold" size="l" style={styles.title}>
            {publication.name}
          </Text>
          <Text size="m" style={styles.description}>
            {publication.description}
          </Text>
          <Text style={styles.date}>{publication.createdAt}</Text>
        </Card>
      ))}
    </Grid>
  );
};

const styles = {
  grid: {
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "1rem",
  },
  card: {
    paddingBottom: "1rem",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e0e0e0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  title: {
    marginBottom: "10px",
    color: "#333",
  },
  description: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 4,
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#555",
  },
  date: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#888",
  },
};

export default MainPage;
