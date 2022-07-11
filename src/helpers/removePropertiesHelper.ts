export const removePropertiesHelper = <
    Entity extends Record<string, any>,
    Property extends keyof Entity
>(
    object: Entity,
    ...keys: Array<Property>
): Omit<Entity, Property> => {
    for (const key of keys)
        delete object[key];

    return object;
};