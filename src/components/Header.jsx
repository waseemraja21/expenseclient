import Options from "./Options"

const Header = () => {
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="flex items-center justify-between">
                <a href="/" className="text-3xl font-bold">Expense Tracker</a>
                <Options />
            </div>

        </header>
    )
}

export default Header