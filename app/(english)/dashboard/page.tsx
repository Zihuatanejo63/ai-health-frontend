import { HealthApp } from "@/components/health-app";
export const metadata = {
  title: "Your health workspace",
  robots: { index: false, follow: false },
};
export default function Dashboard() {
  return <HealthApp />;
}
