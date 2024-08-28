import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav id="navBar">
    <div id="navBar-left">
      <NavLink to="/"><img src="https://res.cloudinary.com/drpidiczb/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1721610685/Vubj_LP9_400x400_rv368p.jpg" /></NavLink>
      <NavLink to="/" id="website-title">XIVNB</NavLink>
    </ div>
    <div id='navBar-right'>
    {sessionUser && (
      <div id="spot-create">
        <NavLink to="/spots/new">Create a New Spot</NavLink>
      </ div>
    )}
    {isLoaded && (
      <div>
        <ProfileButton user={sessionUser} />
      </ div>
    )}
    </div>
</nav>
);
}


export default Navigation;
