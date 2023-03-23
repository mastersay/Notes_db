
const PagesPagination = ({totalPages, currentPage, setCurrentPage}: { totalPages: number, currentPage: number , setCurrentPage: any}) => {
    const prevPage = currentPage - 1 > 0
    const nextPage = currentPage + 1 <= totalPages
    return (
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <nav className="flex justify-between">
                {!prevPage && (
                    <button aria-label="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
                        Previous
                    </button>
                )}
                {prevPage && (

                        <button aria-label="previous" onClick={() => {
                            setCurrentPage(currentPage - 1)
                        }}>Previous
                        </button>

                )}
                <span>
          {currentPage} of {totalPages}
        </span>
                {!nextPage && (
                    <button aria-label="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
                        Next
                    </button>
                )}
                {nextPage && (
                        <button aria-label="next" onClick={() => {
                            setCurrentPage(currentPage + 1)
                        }}>Next
                        </button>
                )}
            </nav>
        </div>
    )
}
export default PagesPagination