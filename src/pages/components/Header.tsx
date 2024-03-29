import React from 'react';
import { Link } from 'react-router-dom';

import { getCurrentSeason } from '../../utils/datetime';

const Header = () => {
    const currentSeason = getCurrentSeason();

    return (
        <nav className="navbar">
            <h1>
                <Link to="/mackolik/" style={{ textDecoration: 'none', color: '#0cc2bc' }}>MAÇKOLİK</Link>
            </h1>
            <div className="links">
                {/*https://a.espncdn.com/i/leaguelogos/soccer/500-dark/11.png*/}
                <Link to={`/mackolik/uefa.champions/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/2.png" alt="img" /></Link>
                <Link to={`/mackolik/uefa.europa/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/2310.png" alt="img" /></Link>
                <Link to={`/mackolik/uefa.europa.conf/${currentSeason}`}>
                    <img className="navbar-logo" src="https://a.espncdn.com/i/leaguelogos/soccer/500/20296.png" alt="img" /></Link>
                <hr style={{ marginRight: '32px', marginLeft: '16px', height: '64px' }}/>
                <Link to={'/mackolik/leagues'}>
                    <h3 style={{ color: '#333' }}>All Leagues</h3></Link>
            </div>
        </nav>
    );
};

export default Header;
