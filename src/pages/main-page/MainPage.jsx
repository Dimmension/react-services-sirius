import React, { useState, useEffect } from "react";
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Grid } from "@consta/uikit/Grid";
import { Pagination } from "@consta/uikit/Pagination";
import { Loader } from "@consta/uikit/Loader";

const NEWS_URL = "https://673423afa042ab85d1190055.mockapi.io/api/v1/main";

const MainPage = () => {
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const newsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(NEWS_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllNews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const startIndex = (currentPage - 1) * newsPerPage;
  const currentCards = allNews.slice(startIndex, startIndex + newsPerPage);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Loader size="m" />
      </div>
    );
  }

  if (error) {
    return <Text view="alert" size="l">Error: {error}</Text>;
  }

  return (
    <div>
      <Grid cols={3} gap="x10" style={{ marginBottom: "20px" }}>
        {currentCards.map((card) => (
          <Card
            key={card.id}
            verticalSpace="l"
            horizontalSpace="l"
            shadow
            style={{ backgroundColor: "#fff", borderRadius: "8px", width: "100%" }}
          >
            <Text weight="bold" size="l" style={{ marginBottom: "10px", color: "#333" }}>
              {card.name}
            </Text>
            <Text size="m" style={{ color: "#666", marginBottom: "10px" }}>
              {card.description}
            </Text>
            <Text view="secondary" size="s" style={{ textAlign: "right" }}>
              {new Date(card.createdAt).toLocaleString()}
            </Text>
          </Card>
        ))}
      </Grid>
      <Pagination
        totalPages={Math.ceil(allNews.length / newsPerPage)}
        currentPage={currentPage}
        onChange={({ value }) => setCurrentPage(value)}
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      />
    </div>
  );
};

export default MainPage;
