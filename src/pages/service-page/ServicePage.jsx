import React, { useEffect } from "react";
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Link, useNavigate } from "react-router-dom";
import { Grid, GridItem } from "@consta/uikit/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "../../store";
import { getToken } from "../../token";

const ServicePage = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    fetch("https://673423afa042ab85d1190055.mockapi.io/api/v1/services", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => dispatch(setServices(data)))
      .catch((error) => console.error("Error fetching services:", error));
  }, [dispatch, navigate]);

  return (
    <div style={styles.container}>
      <Grid cols={3} gap="2rem" style={styles.grid}>
        {services.map((service) => (
          <GridItem key={service.id}>
            <Card style={styles.card}>
              <img src={service.image} alt={service.name} style={styles.image} />
              <div style={styles.textContainer}>
                <Text weight="bold" size="l" style={styles.title}>
                  {service.name}
                </Text>
                <Text size="s" style={styles.description}>
                  {service.description}
                </Text>
                <Link to={`/service/${service.id}`} style={styles.link}>
                  <Text as="span" view="link">
                    Подробнее
                  </Text>
                </Link>
              </div>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  grid: {
    gap: "2rem", // Пространство между карточками
  },
  card: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "12px",
    objectFit: "cover",
  },
  textContainer: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  title: {
    color: "#333",
  },
  description: {
    color: "#666",
    lineHeight: "1.4",
    maxHeight: "4.2em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
  link: {
    marginTop: "0.5rem",
    color: "#646cff",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  },
};

export default ServicePage;
