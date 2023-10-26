import dynamic from "next/dynamic";

// disable server-rendering for 'HelloWorld' component.
const DynamicHeader = dynamic(
  () => import("../components/HelloWorld/HelloWorld"),
  {
    ssr: false,
  }
);

export default function Home() {
  return <DynamicHeader />;
}
