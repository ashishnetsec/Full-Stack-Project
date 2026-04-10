import { client } from "@/utils/helper";

const getCategory = async () => {
    try {
        const response = await client.get("category");
        if (response.data.success) {
            return { res: response.data }
        } else {
            throw new Error("Failed to fetch API")
        }
    }
    catch (error) {
        throw new Error("Failed to fetch API")
    }
}

const getCategorybySlug = async (slug) => {
    try {
        const response = await client.get(`category/${slug}`);
        if (response.data.success) {
            return { res: response.data }
        } else {
            throw new Error("Failed to fetch API")
        }
    }
    catch (error) {
        throw new Error("Internal Server Error")
    }
}


export { getCategory, getCategorybySlug }