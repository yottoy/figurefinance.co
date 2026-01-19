import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            href="/"
            className="text-[--color-slate-600] hover:text-[--color-primary-600] transition-colors"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-[--color-slate-400]">/</span>
            {item.href ? (
              <Link
                href={item.href}
                className="text-[--color-slate-600] hover:text-[--color-primary-600] transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-[--color-slate-900] font-medium">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
