import { Button } from '@consta/uikit/Button';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text } from '@consta/uikit/Text';

const ServiceDetailPage = () => {
  const [service, setService] = useState(null);
  const { id } = useParams();
  const [serviceId, setServiceId] = useState(id);

  useEffect(() => {
    let isNeedUpdate = true;

    fetch(`https://673423afa042ab85d1190055.mockapi.io/api/v1/services/${serviceId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((service) => isNeedUpdate && setService(service));

    return () => {
      isNeedUpdate = false;
    };
  }, [serviceId]);

  const handleNextService = () => {
    setServiceId((prevId) => {
      const nextId = parseInt(prevId, 10) + 1;
      return nextId.toString();
    });
  };

  return (
    <div>
      ServiceDetailPage
      <Button onClick={handleNextService} label="Следующая услуга" />
      <Text>{service && service.name}</Text>
      <Text>{service && service.description}</Text>
    </div>
  );
};

export default ServiceDetailPage;
