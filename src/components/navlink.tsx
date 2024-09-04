import { useRouter } from "next/router";
import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  exact?: boolean;
  className?: (props: { isActive: boolean }) => string;
  children: ReactNode;
}

export const NavLink = ({
  href,
  exact = false,
  className = () => "",
  children,
  ...props
}: NavLinkProps) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} className={className({ isActive })} {...props}>
      {children}
    </Link>
  );
};
