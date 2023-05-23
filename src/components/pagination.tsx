import { PaginatorInfo } from "@/lib/types/apollo";

interface PaginationProps {
  paginatorInfo: PaginatorInfo;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  paginatorInfo: { total, perPage, currentPage },
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  if (pages.length === 1) return (<></>);

  return (
    <div className="flex justify-center mt-4">
      {/* TODO: Add ellipsis pagination */}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-2 border rounded-md font-bold ${currentPage === page ? "bg-yellow-300" : "hover:bg-yellow-100"}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
