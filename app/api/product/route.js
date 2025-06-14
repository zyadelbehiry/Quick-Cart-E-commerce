import { NextResponse } from "next/server";
import Product from "@/app/models/product";
import connectDB from "@/app/utils/db";

export const dynamic = "force-static";

const POST = async (req) => {
  try {
    await connectDB();
    const productData = await req.json();
    console.log("Received product data:", productData);

    const product = await Product.create(productData);

    return NextResponse.json(
      { message: "Product created successfully", product, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
};

const GET = async () => {
  try {
    await connectDB();
    const products = await Product.find();

    // Convert to plain objects and remove image buffers
    const productsWithoutBuffers = products.map((product) => {
      const productObj = product.toObject();
      // Replace image buffers with image count
      productObj.imageCount = productObj.imgSrc.length;
      delete productObj.imgSrc;
      return productObj;
    });

    return NextResponse.json(
      { products: productsWithoutBuffers, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
};

export { POST, GET };
