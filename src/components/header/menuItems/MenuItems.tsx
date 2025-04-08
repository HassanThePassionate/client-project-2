import Item from "./Item";

const MenuItems = () => {
  return (
    <ul className='flex items-center'>
      <Item text='Dashboard' />
      <Item text='Invest' />
      <Item text='My Portfolio' />
    </ul>
  );
};

export default MenuItems;
