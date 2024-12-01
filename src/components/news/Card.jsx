import { faker } from '@faker-js/faker';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';

export const createCard = (id) => {
    return (
        <Card verticalSpace="xs" horizontalSpace="xs" key={id}>
            <Text>{faker.lorem.sentence()}</Text>
            <Text>{faker.lorem.paragraph()}</Text>
        </Card>
    )
}