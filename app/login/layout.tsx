import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - WebGen-AI',
  description: 'Sign in to your WebGen-AI account to start building amazing apps with AI.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
