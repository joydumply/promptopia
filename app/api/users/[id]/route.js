import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        const user = await User.findById(params.id);

        if(!user){
            return new Response('User not found', {status: 404});
        }
        return new Response(JSON.stringify(user), {status: 200});
    } catch (error) {
        return new Response('Error in user search',{status: 500})
    }
}