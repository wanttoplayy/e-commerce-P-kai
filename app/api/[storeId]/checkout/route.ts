import { NextResponse } from "next/server";
import omise from "omise";
import prismadb from "@/lib/prismadb";

const omiseClient = omise({
  publicKey: "pkey_test_5wn3p0xonb45egmuhrx",
  secretKey: "skey_test_5wn3p0yui863l14zxhn",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  // Sum up the total order amount
  const amount =
    products.reduce((total, product) => total + product.price.toNumber(), 0) *
    100;

  // Create a charge
  omiseClient.charges.create(
    {
      amount: amount.toString(), // Omise requires the amount to be a string and in the smallest currency unit (satang for THB)
      currency: "THB",
      description: "Order: " + order.id,
      return_uri: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    },
    function (err, resp) {
      if (err) {
        // Handle error
        console.log(err);
        return new NextResponse("Failed to create charge", { status: 500 });
      }

      // Return the authorize URI to the frontend
      return NextResponse.json(
        { url: resp.authorize_uri },
        {
          headers: corsHeaders,
        }
      );
    }
  );
}
