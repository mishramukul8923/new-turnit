// /src/app/api/generatedContent/route.js

import { NextResponse } from 'next/server';
import createConnection from '@/app/lib/db';

// Named export for POST method
export const POST = async (req) => {
  try {
    // Parse incoming JSON data from the request body
    const { text, generatedContent } = await req.json();
    console.log("Incoming request data:", text, generatedContent);
    if(text && generatedContent){

    // Connect to database
    const  db  = await createConnection();
   

    // Insert the content into the database
    const result = await db.collection('generator').insertOne({
      text,
      generatedContent,
      createdAt: new Date(),
    });

    // Return a success response with the result
    return NextResponse.json(
      { message: 'Content saved successfully', data: result },
      { status: 200 }
    );}else{
      console.log("empty text and generated text")
    }
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
};
