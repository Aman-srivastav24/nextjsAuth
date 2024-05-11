import { getDataFromToken } from "@/helpers/getdataToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();
console.log("HIIIIIIIIIIIII");

export async function POST(request:NextRequest){

    try {
        console.log("I'm in me route")
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}