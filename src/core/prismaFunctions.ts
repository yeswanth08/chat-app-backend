export const findFirstUtil = async function (tableName: any, data: any) {
    try {
        const result = await tableName.findFirst({ where: data });
        return result || null;
    } catch (error) {
        throw error;
    }
};

export const createUserUtil = async function (tableName: any, data: any) {
    try {
        const isExists = await findFirstUtil(tableName, { email: data.email });
        if (isExists) return null;
        const user = await tableName.create({ data });
        return user;
    } catch (error) {
        throw error;
    }
};

export const updateUtil = async function (tableName: any, where: any, data: any) {
    try {
        const isExists = await findFirstUtil(tableName, where);
        if (!isExists) return null;
        const updatedUser = await tableName.update({ where, data });
        return updatedUser;
    } catch (error) {
        throw error;
    }
};