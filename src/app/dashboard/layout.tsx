import Shell from "@/components/common/Shell";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
