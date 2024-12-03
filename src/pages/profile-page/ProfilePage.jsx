import React, { useEffect } from "react";
import { Text } from "@consta/uikit/Text";
import { getToken } from "../../token";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getToken();

    if (!userToken) {
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const userInfo = await response.json();
        dispatch(setUser(userInfo));
      } catch (err) {
        console.error("Error fetching user info:", err.message || "An error occurred");
      }
    };

    fetchUserInfo();
  }, [navigate, dispatch]);

  return (
    <div style={styles.container}>
      <div style={styles.infoSection}>
        <Text size="2xl" weight="bold" style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text size="m" view="secondary" style={styles.secondaryText}>
          {user?.email}
        </Text>
        <Text size="m" view="secondary" style={styles.secondaryText}>
          Username: {user?.username}
        </Text>
        <Text size="m" view="secondary" style={styles.secondaryText}>
          Phone: {user?.phone}
        </Text>
        <Text size="m" view="secondary" style={styles.secondaryText}>
          Age: {user?.age}
        </Text>
      </div>
      <div style={styles.imageWrapper}>
        <img
          src={user?.image}
          alt="User Profile"
          style={styles.image}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60vw",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    gap: "2rem",
  },
  infoSection: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  name: {
    color: "#333",
    marginBottom: "0.5rem",
  },
  secondaryText: {
    color: "#666",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "2px solid #e0e0e0",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default ProfilePage;
