import { Button } from "@consta/uikit/Button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "@consta/uikit/Text";
import { getToken } from "../../token";

const ServiceDetailPage = () => {
  const [service, setService] = useState(null);
  const { id } = useParams();
  const [serviceId, setServiceId] = useState(id);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    let isNeedUpdate = true;

    fetch(
      `https://673423afa042ab85d1190055.mockapi.io/api/v1/services/${serviceId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((service) => isNeedUpdate && setService(service))
      .catch((err) => console.error("Error fetching service:", err));

    return () => {
      isNeedUpdate = false;
    };
  }, [serviceId, navigate]);

  const handleNextService = () => {
    setServiceId((prevId) => {
      const nextId = parseInt(prevId, 10) + 1;
      return nextId.toString();
    });
  };

  return (
    <div style={styles.container}>
      <Text style={styles.title}>{service?.name}</Text>
      <img src={service?.image} alt={service?.name} style={styles.image} />
      <Text style={styles.description}>{service?.description}</Text>
      <Button onClick={handleNextService} label="Следующая услуга" style={styles.button} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    padding: "2rem",
    margin: "0 auto",
    maxWidth: "800px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: "1rem",
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "15px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.6",
    textAlign: "center",
    maxWidth: "700px",
  },
  button: {
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#646cff",
    color: "#ffffff",
    padding: "10px 20px", // Увеличена ширина для лучшего отображения
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    display: "flex", // Добавлено flex для выравнивания
    justifyContent: "center", // Горизонтальное центрирование текста
    alignItems: "center", // Вертикальное центрирование текста
    textAlign: "center", // Центрирование текста внутри кнопки
  },
};

export default ServiceDetailPage;
