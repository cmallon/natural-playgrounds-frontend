import Head from "next/head";
import Hero from "../components/hero";
import WidgetChooser from "../components/widgetChooser";
import { useCartSlide } from "../hooks/use-cart-slide.js";
export default function Page({ page }) {
  const { updateTestimonial } = useCartSlide();
  updateTestimonial(page.testimonial);
  return (
    <main>
      <Hero title={page.title} sub_title={page.sub_title} />
      <div
        className="flex flex-col space-y-16 relative"
        style={{ minHeight: "600px" }}
      >
        {page.widgets &&
          page.widgets.map((object, i) => (
            <WidgetChooser obj={object} key={i} />
          ))}
      </div>
    </main>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages/${params.slug}/?format=json`
  );

  return {
    props: {
      page: await res.json(),
    },
  };
}
export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages/?format=json`
  );
  const pages = await res.json();
  const paths = pages.map((page) => {
    return {
      params: {
        slug: page.slug.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
