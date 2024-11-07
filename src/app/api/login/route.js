import bcrypt from 'bcrypt';
import createConnection from "../../lib/db";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { getServerSession } from "next-auth/next"; 
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req) => {
    const session = await getServerSession(authOptions);

    try {
        const data = await req.json();
        console.log("Incoming request data:", data);

        // Check if the request is for social login
        if (session) {
            console.log("User logged in, handling social login...");
            return await handleSocialLogin(session.user);
        } else {
            console.log("No session found, handling login...");
            return await handleLogin(data);
        }
    } catch (error) {
        console.error("ERROR IS", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const handleLogin = async (data) => {
    console.log("handleLogin running");
    const { email, password } = data; 

    // Validate required fields
    if (!email || !password) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await createConnection();

    // Check if the user exists
    const users = await db.collection('user').findOne({ email });
    console.log("Retrieved user from database:", users);

    if (!users) {
        // No user found
        return NextResponse.json({ error: "User does not exist" }, { status: 404 });
    }

    if (users.password === null) {
        // User exists, but has no password set (e.g., social login only)
        return NextResponse.json({ error: "User registered through social login. Please use social login." }, { status: 400 });
    }

    const { password: hashedPassword } = users;
    console.log("this password received ", password);

    // Check if the password is provided and matches
    if (!password) {
        return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    // Compare the provided password with the stored hashed password
    console.log("Comparing passwords...");
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
        // Passwords match, generate JWT token
        const payload = { email }; // Simplified payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }); // Generate token

        // Add login time to the user's logins array
        const loginTime = new Date();

        // Update the user document with the new login time
        await db.collection('user').updateOne(
            { email },
            { $push: { logins: { loginTime } } }
        );

        // Return the token in the response
        return NextResponse.json({ message: "Login successful", token }, { status: 200 });
    } else {
        // Passwords do not match
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
};








// Social login handler
const handleSocialLogin = async (user) => {
    console.log("Handling social login...");
    const { email, name } = user;
    const [firstname, ...lastnameParts] = name.split(" ");
    const lastname = lastnameParts.join(" ");

    const db = await createConnection();

    // Check if the user already exists
    const existingUser = await db.collection('user').findOne({ email });
    
    if (existingUser) {
        console.log("User already exists. Logged in successfully.");

        const payload = {  email }; // Simplified payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }); // Generate token

        // Return the token in the response
        return NextResponse.json({ message: "User already exists. Logged in successfully.", token }, { status: 200 });
    } else {
        // Insert new user with social login
        await db.collection('user').updateOne(
            { email }, // Filter to find the specific user by email
            { $set: { firstname, lastname, email, auth: false, social: true } }, // Fields to update
            { upsert: true } // Creates a new document if no match is found
        );

        const payload = {  email }; // Simplified payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }); // Generate token

            console.log("User created successfully with social login.");
        return NextResponse.json({ message: "User created successfully with social login.", token }, { status: 201 });
     
        
    }
};

