import dynamic from "next/dynamic";

// disable server-rendering for 'HelloWorld' component.
const DynamicHelloWorld = dynamic(
  () => import("../components/HelloWorld/HelloWorld"),
  {
    ssr: false,
  }
);

export default function Home() {
  return <DynamicHelloWorld />;
}
