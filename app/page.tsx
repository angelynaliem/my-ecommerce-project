// import Image from "next/image";
// import getPosts from "@/server/actions/get-posts";
// import createPost from "@/server/actions/create-post";
// import PostButton from "@/components/post-button";

import { Button } from "@/components/ui/button";
import Products from "@/components/products/products";
import { db } from "@/server";
// import Algolia from "@/components/products/algolia";
import ProductTags from "@/components/products/product-tags";

export const revalidate = 60 * 60;

export default async function Home() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });
  // const { error, success } = await getPosts();
  // if (error) {
  //   throw new Error(error)
  // }
  // if (success)

  return (
    // <main className="text-4xl">
    <main className="">
      {/* <Algolia /> */}
      <ProductTags />
      {/* <h1>Homepage</h1> */}
      <Products variants={data} />
      {/* {success.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))}
      <form action={createPost}>
        <input type="text" name="title" placeholder="Title" /> */}
      {/* <button type="submit">Submit</button> */}
      {/* <PostButton />
      </form>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
    </main>
  );
}

//Server component as using async
