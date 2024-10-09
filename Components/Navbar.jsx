const Navbar = () => {
  return (
    <div className="flex justify-around py-3 flex-wrap">
      <h1 className="text-lg font-semibold">Todo App</h1>
      <ul className="flex gap-[40px] text-sm">
        <li>Home</li>
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
