import PanelLayoutComponent from '@/components/layout/PublicLayoutComponent';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PanelLayoutComponent>{children}</PanelLayoutComponent>;
}
