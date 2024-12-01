import React from 'react';
import { faker } from "@faker-js/faker";
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';

const ServicePage = () => {
    return (
        <div>
            {Array(5).fill(0).map(id => (
                <Card verticalSpace="xs" horizontalSpace="xs" key={id + 1}>
                    <Text>{faker.lorem.sentence()}</Text>
                    <Text>{faker.lorem.paragraph()}</Text>
                </Card>
            ))}
        </div>
    )
}

export default ServicePage;