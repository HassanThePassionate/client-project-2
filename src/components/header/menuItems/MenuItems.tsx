import Item from "./Item";

const MenuItems = () => {
  return (
    <ul className='flex items-center'>
      <Item text='Dashboard' link='/' />
      <Item text='Invest' link='/invest' />
      <Item text='My Portfolio' link='#' />
    </ul>
  );
};

export default MenuItems;
