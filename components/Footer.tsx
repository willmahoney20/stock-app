export default () => {
    return (
        <footer className="h-8">
            <div className="container mx-auto flex justify-center items-center h-full">
                <p className="text-purple text-sm font-semibold m-0">
                    &copy; {new Date().getFullYear()} NextJS Stock Inc.
                </p>
            </div>
        </footer>
    )
}